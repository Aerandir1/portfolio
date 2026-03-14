import io
import time
import zipfile
import unicodedata
import xml.etree.ElementTree as ET
import urllib.parse

import requests
from flask import Flask, render_template, request

URL = "https://donnees.roulez-eco.fr/opendata/instantane"

app = Flask(__name__)

_cache = {
    "root": None,
    "loaded_at": None,
}


def _normalize(text: str) -> str:
    text = (text or "").strip().lower()
    return "".join(
        ch for ch in unicodedata.normalize("NFD", text) if unicodedata.category(ch) != "Mn"
    )


def _to_degrees(value: str) -> float:
    try:
        num = float(value)
    except (TypeError, ValueError):
        return 0.0
    return num / 100000 if abs(num) > 1000 else num


def _load_root():
    response = requests.get(URL)
    response.raise_for_status()
    with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:
        for file_name in zip_ref.namelist():
            if file_name.endswith(".xml"):
                with zip_ref.open(file_name) as xml_file:
                    tree = ET.parse(xml_file)
                    return tree.getroot()
    raise RuntimeError("Aucun fichier XML trouvé dans l'archive.")


def _get_root(force: bool = False):
    if force or _cache["root"] is None:
        _cache["root"] = _load_root()
        _cache["loaded_at"] = time.time()
    return _cache["root"], _cache["loaded_at"]


def _maps_url_from_gps(lat: str, lon: str) -> str:
    latitude = _to_degrees(lat)
    longitude = _to_degrees(lon)
    if latitude and longitude:
        return f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"
    return ""


def _maps_url_from_address(address: str, city: str, cp: str) -> str:
    full_address = f"{address}, {cp} {city}".strip()
    query = urllib.parse.quote(full_address)
    return f"https://www.google.com/maps/search/?api=1&query={query}"


def _price_value(value: str) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float("inf")


def get_prices_by_city_or_cp(query: str, id_carb: str, root):
    query = (query or "").strip()
    target_city = _normalize(query)
    target_cp = query if query.isdigit() else ""
    results = []

    for pdv in root.iter("pdv"):
        ville = pdv.findtext("ville") or ""
        pdv_cp = pdv.attrib.get("cp", "")
        if (target_cp and pdv_cp == target_cp) or (
            not target_cp and _normalize(ville) == target_city
        ):
            for prix in pdv.findall("prix"):
                if prix.attrib.get("id") == id_carb:
                    lat = pdv.attrib.get("latitude", "")
                    lon = pdv.attrib.get("longitude", "")
                    maps_url = _maps_url_from_gps(lat, lon)
                    if not maps_url:
                        maps_url = _maps_url_from_address(
                            pdv.findtext("adresse") or "", ville, pdv_cp
                        )
                    results.append(
                        {
                            "id": pdv.attrib.get("id"),
                            "ville": ville,
                            "cp": pdv_cp,
                            "adresse": pdv.findtext("adresse") or "",
                            "carburant": prix.attrib.get("nom"),
                            "prix": prix.attrib.get("valeur"),
                            "lat": lat,
                            "lon": lon,
                            "maps_url": maps_url,
                        }
                    )
    return sorted(results, key=lambda item: _price_value(item.get("prix")))


@app.get("/")
def index():
    return render_template(
        "index.html",
        results=None,
        query="",
        id_carb="",
        loaded_at=_cache["loaded_at"],
    )


@app.post("/")
def search():
    query = request.form.get("query", "")
    id_carb = request.form.get("id_carb", "")
    refresh = request.form.get("refresh") == "1"

    root, loaded_at = _get_root(force=refresh)
    results = get_prices_by_city_or_cp(query, id_carb, root) if query and id_carb else []

    return render_template(
        "index.html",
        results=results,
        query=query,
        id_carb=id_carb,
        loaded_at=loaded_at,
    )


if __name__ == "__main__":
    _get_root(force=True)
    app.run(host="0.0.0.0", port=5000, debug=True)
