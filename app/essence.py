import requests  # Client HTTP pour télécharger les données
import zipfile  # Lecture d'archives ZIP en mémoire
import io  # Flux en mémoire (bytes)
import xml.etree.ElementTree as ET  # Parseur XML standard
import unicodedata  # Normalisation des accents
import webbrowser  # Ouvrir un lien dans le navigateur
import urllib.parse  # Encoder les paramètres d'URL

# Télécharger le fichier ZIP depuis l'URL
URL = "https://donnees.roulez-eco.fr/opendata/instantane"  # Adresse des données publiques


def _normalize(text: str) -> str:  # Fonction utilitaire pour comparer des chaînes
    text = text.strip().lower()  # Enlève les espaces et passe en minuscules
    return "".join(  # Reconstruit la chaîne sans les accents
        ch  # Caractère courant
        for ch in unicodedata.normalize("NFD", text)  # Décompose les accents
        if unicodedata.category(ch) != "Mn"  # Ignore les marques d'accent
    )


def _load_root():  # Télécharge et retourne la racine XML
    response = requests.get(URL)  # Requête HTTP pour récupérer le ZIP
    response.raise_for_status()  # Erreur si la requête a échoué
    with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:  # Ouvre le ZIP en mémoire
        for file_name in zip_ref.namelist():  # Parcourt les fichiers du ZIP
            if file_name.endswith('.xml'):  # Prend le fichier XML
                with zip_ref.open(file_name) as xml_file:  # Ouvre le XML
                    tree = ET.parse(xml_file)  # Parse le XML
                    return tree.getroot()  # Retourne la racine du document
    raise RuntimeError("Aucun fichier XML trouvé dans l'archive.")  # Si aucun XML

def get_price(id_pump, id_carb, root):  # Récupère le prix d'une station précise
    for pdv in root.iter('pdv'):  # Parcourt toutes les stations
        if pdv.attrib.get('id') == id_pump:  # Compare l'ID de station
            for prix in pdv.findall('prix'):  # Parcourt les prix disponibles
                if prix.attrib.get('id') in [id_carb]:  # Vérifie le carburant
                    return prix.attrib['nom'], prix.attrib['valeur']  # Retourne nom/prix
    return None  # Rien trouvé


def get_prices_by_city(city_or_cp, id_carb, root):  # Récupère les prix par ville ou CP
    query = (city_or_cp or "").strip()  # Valeur saisie par l'utilisateur
    target_city = _normalize(query)  # Normalise la ville demandée
    target_cp = query if query.isdigit() else ""  # CP si l'entrée est numérique
    results = []  # Liste des résultats
    for pdv in root.iter('pdv'):  # Parcourt toutes les stations
        ville = pdv.findtext('ville') or ""  # Lit la ville dans le XML
        pdv_cp = pdv.attrib.get('cp', '')  # Récupère le code postal
        if (target_cp and pdv_cp == target_cp) or (not target_cp and _normalize(ville) == target_city):  # Filtre ville/CP
            for prix in pdv.findall('prix'):  # Parcourt les carburants
                if prix.attrib.get('id') == id_carb:  # Filtre sur carburant voulu
                    results.append(  # Ajoute un résultat
                        {  # Dictionnaire des infos utiles
                            "id": pdv.attrib.get('id'),  # ID station
                            "ville": ville,  # Nom de la ville
                            "cp": pdv.attrib.get('cp'),  # Code postal
                            "adresse": pdv.findtext('adresse') or "",  # Adresse
                            "carburant": prix.attrib.get('nom'),  # Nom carburant
                            "prix": prix.attrib.get('valeur'),  # Prix du carburant
                            "lat": pdv.attrib.get('latitude', ''),  # Latitude brute
                            "lon": pdv.attrib.get('longitude', ''),  # Longitude brute
                        }
                    )
    return results  # Retourne la liste trouvée


def _open_maps(address: str, city: str, cp: str):  # Ouvre Google Maps sur l'adresse
    full_address = f"{address}, {cp} {city}".strip()  # Adresse complète
    query = urllib.parse.quote(full_address)  # Encode pour URL
    url = f"https://www.google.com/maps/search/?api=1&query={query}"  # Lien Maps
    webbrowser.open(url)  # Ouvre le navigateur


def _to_degrees(value: str) -> float:  # Convertit latitude/longitude en degrés
    try:  # Gestion des conversions
        num = float(value)  # Convertit en nombre
    except (TypeError, ValueError):  # Si conversion impossible
        return 0.0  # Valeur par défaut
    return num / 100000 if abs(num) > 1000 else num  # Format données ouvertes


def _open_maps_gps(lat: str, lon: str):  # Ouvre Google Maps sur les coordonnées
    latitude = _to_degrees(lat)  # Latitude en degrés
    longitude = _to_degrees(lon)  # Longitude en degrés
    url = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"  # Lien GPS
    webbrowser.open(url)  # Ouvre le navigateur

root = _load_root()  # Charge les données une seule fois

while True:  # Boucle principale
    city = input("Ville ou code postal (ou 'q' pour quitter) : ").strip()  # Demande ville ou CP
    if city.lower() == 'q':  # Quitte si l'utilisateur tape q
        break  # Sort de la boucle
    id_c = input("ID Carburant : ").strip()  # Demande l'ID carburant
    prices = get_prices_by_city(city, id_c, root)  # Recherche des prix
    if not prices:  # Si aucun résultat
        print("Aucun résultat.")  # Message utilisateur
        continue  # Recommence la boucle
    for i, item in enumerate(prices, start=1):  # Parcourt les résultats
        print(  # Affiche les infos formatées
            f"{i}. {item['ville']} ({item['cp']}) - {item['adresse']} | "  # Ville, CP, adresse
            f"{item['carburant']} : {item['prix']}"  # Carburant et prix
        )
    choice = input("Ouvrir une station dans Maps (numéro ou Entrée pour ignorer) : ").strip()  # Choix
    if choice.isdigit():  # Vérifie un numéro
        idx = int(choice) - 1  # Index dans la liste
        if 0 <= idx < len(prices):  # Vérifie la plage
            item = prices[idx]  # Station choisie
            _open_maps_gps(item["lat"], item["lon"])  # Ouvre Maps via GPS
