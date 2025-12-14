import pygame
import random
from math import cos, sin, radians, sqrt, atan2, degrees
import os

pygame.font.init()

def hex_to_rgb(hex_color):
    # Enlève le caractère "#" s'il est présent
    hex_color = hex_color.lstrip('#')

    # Convertit les composants hexadécimaux en entiers
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)

    # Compose l'entier RGB en utilisant un décalage de bits
    rgb_int = (r << 16) + (g << 8) + b

    return (r,g,b)

color_true = hex_to_rgb("#239b56")
color_false = hex_to_rgb("#c0392b")
color_help = hex_to_rgb("#abb2b9")
size_font = 20


def clear():
    if os.name == 'nt':
        os.system('cls')
    # Pour les systèmes Unix-like (Linux, macOS)
    else:
        os.system('clear')
    
def dat_show(f_size):
    police = pygame.font.SysFont("Courier New", size_font)  # "None" utilise la police par défaut, 50 est la taille
    # Créer un rendu de texte

    if colision:
        colision_text = police.render(f"Colision : Activé", True, color_true)
    else :
        colision_text = police.render(f"Colision : Désactivé", True, color_false)
    rect_colision = colision_text.get_rect(topleft=(0,f_size*0))
    if trail:
        trail_text = police.render(f"Tracée : Activé", True, color_true)
    else :
        trail_text = police.render(f"Tracée : Désactivé", True, color_false)
    rect_trail = trail_text.get_rect(topleft=(0,f_size*1))
    if focus_mode:
        focus_text = police.render(f"Focus : Activé", True, color_true)
    else :
        focus_text = police.render(f"Focus : Désactivé", True, color_false)
    rect_focus = focus_text.get_rect(topleft=(0,f_size*2))
    zoom_factor_text = police.render(f"Zoom : {round(zoom_factor,2)}", True, hex_to_rgb("#ffffff"))
    rect_zoom_factor_text = zoom_factor_text.get_rect(topleft=(0,f_size*3))
    len_part_text = police.render(f"Nombre de particules : {len(particles)}", True, hex_to_rgb("#ffffff"))
    rect_len_part_text = len_part_text.get_rect(topleft=(0,f_size*4))
    speed_text = police.render(f"Vitesse simulation : {round(time_scale,2)}x", True, hex_to_rgb("#ffffff"))
    rect_speed = speed_text.get_rect(topleft=(0,f_size*5))
    pause_text = police.render(f"Pause : {'Activé' if paused else 'Désactivé'}", True, color_true if paused else color_false)
    rect_pause = pause_text.get_rect(topleft=(0,f_size*6))

    screen.blit(colision_text, rect_colision)
    screen.blit(trail_text, rect_trail)
    screen.blit(focus_text, rect_focus)
    screen.blit(zoom_factor_text, rect_zoom_factor_text)
    screen.blit(zoom_factor_text, rect_zoom_factor_text)
    screen.blit(len_part_text, rect_len_part_text)
    screen.blit(speed_text, rect_speed)
    screen.blit(pause_text, rect_pause)
    # Infos de sélection/satellite
    try:
        if selected_particle:
            sel_text = police.render(f"Sélection masse: {int(selected_particle.masse)}", True, hex_to_rgb("#ffffff"))
            rect_sel = sel_text.get_rect(topleft=(0, f_size*7))
            screen.blit(sel_text, rect_sel)
            coef_text = police.render(f"Coef satellite masse: x{satellite_coeff}", True, hex_to_rgb("#ffffff"))
            rect_coef = coef_text.get_rect(topleft=(0, f_size*8))
            screen.blit(coef_text, rect_coef)
        if focus_mode and len(particles)>0:
            v_abs = sqrt(particles[i].vx**2 + particles[i].vy**2)
            v_text = police.render(f"Vitesse focus: {round(v_abs,2)}", True, hex_to_rgb("#ffffff"))
            rect_v = v_text.get_rect(topleft=(0, f_size*9))
            screen.blit(v_text, rect_v)
    except NameError:
        pass

def help_show(f_size):
    police = pygame.font.SysFont("Courier New", size_font)

    header = police.render("Aide — Commandes (H pour masquer)", True, hex_to_rgb("#ffffff"))
    rect_header = header.get_rect(topleft=(0, f_size*6))
    screen.blit(header, rect_header)

    lines = [
        "Souris: clic gauche = grosse particule, clic droit = particule (vitesse aléatoire)",
        "Z / Q / S / D: déplacer la vue (haut / gauche / bas / droite)",
        "E / R: ralentir / accélérer le temps",
        "Pavé num 8 / 2: zoom + / zoom -",
        "Pavé num + / -: taille de la traînée +/-",
        "Flèche droite / gauche: changer de particule suivie",
    "Espace: pause ON/OFF",
    "Maj + Espace: recadrer sur la particule sélectionnée",
        "F: mode focus auto ON/OFF",
        "C: collisions ON/OFF",
        "T: traînée ON/OFF",
        "P: affichage des particules ON/OFF",
        "O: bords toroïdaux ON/OFF",
        "F3: afficher/masquer les infos (Zoom, Collisions, etc.)",
        "Suppr: supprimer toutes les particules",
        "Échap: revenir au menu",
        "H: afficher/masquer cette aide",
        "Sandbox: clic = planète orbite auto (gauche moyenne / droite petite)",
        "Sandbox: Maj + clic = orbite rétrograde",
        "En mode focus: clic gauche = créer un satellite autour de l'objet focus",
        "Maj + clic gauche (focus): orbite rétrograde autour du focus",
        "(Optionnel) Sélection: clic droit cible une planète pour la création classique",
    ]

    base_y = f_size*7
    for idx, txt in enumerate(lines):
        surf = police.render(txt, True, color_help)
        rect = surf.get_rect(topleft=(0, base_y + idx*f_size))
        screen.blit(surf, rect)

size_y = 1080
size_x = 1920
G = 6.67 * pow(10, -11)  # Constante gravitationnelle
i = 0
zoom_factor = 1
time_scale = 1.0
smooth = 1
colision = False
trail = False
show = True
tor = False
help_show_flag = False
dat_show_flag = False
focus_mode = False
dat_update = True
trail_size = 100
screen_offset_y=0
screen_offset_x=0
paused = False

# Etat du programme: menu ou simulation
in_menu = True
menu_index = 0
menu_options = [
    ("Mode Sandbox", "sandbox"),
    ("Système de base", "base"),
    ("Système binaire", "binary"),
    ("Anneau de particules", "ring"),
    ("Distribution aléatoire", "random"),
    ("Système solaire (approx.)", "solarsystem"),
]
current_preset = None
central_star_mass = None
selected_particle = None
selected_chain_count = 0
satellite_coeff = 0.5
satellite_base_mass = 5e13
focus_ref = None  # (x,y) du corps focus pour dessiner les traînées en repère relatif

def hex_to_rgb(hex_color):
    # Enlève le caractère "#" s'il est présent
    hex_color = hex_color.lstrip('#')

    # Convertit les composants hexadécimaux en entiers
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)

    # Compose l'entier RGB en utilisant un décalage de bits
    rgb_int = (r << 16) + (g << 8) + b

    return (r,g,b)

def load_preset(preset_code):
    """Prépare les particules selon un préréglage et réinitialise la vue."""
    global particles, i, screen_offset_x, screen_offset_y, zoom_factor, focus_mode, help_show_flag, dat_show_flag, current_preset, central_star_mass, selected_particle, selected_chain_count
    particles.clear()
    i = 0
    zoom_factor = 1
    screen_offset_x = 0
    screen_offset_y = 0
    focus_mode = False
    help_show_flag = False
    dat_show_flag = False
    current_preset = preset_code
    central_star_mass = None
    selected_particle = None
    selected_chain_count = 0

    cx, cy = size_x/2, size_y/2

    if preset_code == "sandbox":
        # Etoile centrale fixe, clics ajoutent des planètes avec vitesse orbitale adaptée
        central_star_mass = 2e16
        particles.append(Particle(cx, cy, 0, 0, central_star_mass, 1e9))
        return

    if preset_code == "base":
        # Une étoile et deux planètes
        particles.append(Particle(cx, cy, 0, 90, 2e15, 1e9))
        particles.append(Particle(cx-200, cy, 20, 90, 6e12, 1e8))
        particles.append(Particle(cx-140, cy, 22, 90, 4e11, 1e8))

    elif preset_code == "binary":
        # Deux corps massifs en orbite l'un autour de l'autre
        particles.append(Particle(cx-150, cy, 15, 90, 1e15, 1e9))
        particles.append(Particle(cx+150, cy, 15, 270, 1e15, 1e9))

    elif preset_code == "ring":
        # Un soleil central et un anneau de petites particules
        particles.append(Particle(cx, cy, 0, 0, 2e15, 1e9))
        for k in range(60):
            theta = (k / 60) * 360
            R = 280 + (k % 5) * 10
            x = cx + R * cos(radians(theta))
            y = cy + R * sin(radians(theta))
            v = 18 + (k % 7)
            angle_move = theta - 90  # tangent
            particles.append(Particle(x, y, v, angle_move, 5e11, 1e8))

    elif preset_code == "random":
        # Plusieurs petites particules aléatoires
        for _ in range(35):
            x = random.uniform(100, size_x-100)
            y = random.uniform(100, size_y-100)
            v = random.uniform(0, 25)
            ang = random.choice([0, 45, 90, 135, 180, 225, 270, 315])
            m = random.uniform(5e10, 1e12)
            rho = random.uniform(1e7, 1e9)
            particles.append(Particle(x, y, v, ang, m, rho))

    elif preset_code == "solarsystem":
        # Approximations très simplifiées et à échelle arbitraire
        M_sun = 2e16
        rho_sun = 1e9
        particles.append(Particle(cx, cy, 0, 0, M_sun, rho_sun))

        # Distances (pixels), masses (unités arbitraires), densités
        planets = [
            ( 70, 3.3e12, 5.4e8),   # Mercure (prograde)
            (110, 4.8e12, 5.2e8),   # Vénus (rétrograde pour démonstration)
            (150, 6.0e12, 5.5e8),   # Terre
            (230, 6.4e12, 3.9e8),   # Mars
            (360, 1.9e14, 1.3e8),   # Jupiter
            (470, 5.7e13, 0.7e8),   # Saturne
            (600, 8.7e12, 1.3e8),   # Uranus
            (720, 1.0e13, 1.6e8),   # Neptune
        ]

        for idx, (R, m_planet, rho_p) in enumerate(planets):
            # vitesse tangentielle pour orbite quasi-circulaire: v = sqrt(G*M/R)
            v_tan = sqrt(G * M_sun / R)
            x = cx + R
            y = cy
            # Pour l'exemple: Vénus (idx==1) rétrograde => angle 270 (sens horaire)
            angle = 270 if idx == 1 else 90
            particles.append(Particle(x, y, v_tan, angle, m_planet, rho_p))

    else:
        # Repli: base
        particles.append(Particle(cx, cy, 0, 90, 2e15, 1e9))
        particles.append(Particle(cx-200, cy, 20, 90, 6e12, 1e8))
        particles.append(Particle(cx-140, cy, 22, 90, 4e11, 1e8))

def draw_menu():
    police = pygame.font.SysFont("Courier New", 28)
    title = police.render("Solar System — Choisir une simulation", True, hex_to_rgb("#ffffff"))
    rect_title = title.get_rect(center=(size_x//2, int(size_y*0.2)))
    screen.blit(title, rect_title)

    hint = police.render("↑/↓ pour sélectionner  •  Entrée pour lancer  •  Échap pour quitter", True, color_help)
    rect_hint = hint.get_rect(center=(size_x//2, int(size_y*0.28)))
    screen.blit(hint, rect_hint)

    list_font = pygame.font.SysFont("Courier New", 24)
    start_y = int(size_y*0.4)
    spacing = 36
    for idx, (label, _) in enumerate(menu_options):
        selected = (idx == menu_index)
        color = hex_to_rgb("#ffffff") if selected else color_help
        prefix = "> " if selected else "  "
        surf = list_font.render(prefix + label, True, color)
        rect = surf.get_rect(center=(size_x//2, start_y + idx*spacing))
        screen.blit(surf, rect)

class Particle:
    def __init__(self, x, y, velocity, angle, masse, rho):
        self.x = x
        self.y = y
        self.vx = velocity * cos(radians(angle))
        self.vy = -velocity * sin(radians(angle))
        self.masse = masse
        self.rho = rho
        self.radius = max(5, int((self.masse / self.rho) ** (1/3))) / 1e1
        self.color = hex_to_rgb("#1f618d")
        self.alive = True
        self.trail = []  # Stocke les anciennes positions
    
    def update(self, particles, dt):
        if self.alive:
            ax, ay = 0, 0
            for other in particles:
                if other is not self and other.alive:
                    dx = other.x - self.x 
                    dy = other.y - self.y 
                    distance = sqrt(dx**2 + dy**2)

                    if colision:
                        if distance <= self.radius + other.radius:  
                            if self.masse >= other.masse:  
                                self.masse += other.masse
                                self.radius = max(5, int((self.masse / self.rho) ** (1/3))) / 1e1
                                other.alive = False
                                continue

                    if distance > self.radius + other.radius:
                        force = G * self.masse * other.masse / ((distance**2) + smooth)
                        ax += force * dx / ((distance)* self.masse)
                        ay += force * dy / ((distance)* self.masse)

            self.vx += ax * dt
            self.vy += ay * dt
            
            old_x, old_y = self.x, self.y # Sauvegarde ancienne position
            
            if tor:
                self.x = (self.x + self.vx * dt) % size_x
                self.y = (self.y + self.vy * dt) % size_y
            else :
                self.x = (self.x + self.vx * dt) 
                self.y = (self.y + self.vy * dt)  
            
            # Vérification du saut pour éviter la ligne traversant l'écran
            if abs(old_x - self.x) < size_x / 2 and abs(old_y - self.y) < size_y / 2:
                self.trail.append((int(self.x), int(self.y)))  # Stockage en absolu
            else:
                self.trail = []  # Réinitialisation de la trace si trop grand saut

            if len(self.trail) > abs(trail_size): # Limite la taille de la trace
                self.trail.pop(0)
    zoom_factor = 1.0
    def draw(self, screen):
        if show:
            if self.alive:
                self.draw_trail(screen)
                # Appliquer le zoom à la position et au rayon de la particule
                zoomed_radius = self.radius * zoom_factor
                if zoomed_radius <1:
                    zoomed_radius = 1
                if focus_mode and focus_ref is not None:
                    fx, fy = focus_ref
                    zoomed_x = int((self.x - fx) * zoom_factor + size_x/2)
                    zoomed_y = int((self.y - fy) * zoom_factor + size_y/2)
                else:
                    zoomed_x = int(self.x * zoom_factor) + screen_offset_x
                    zoomed_y = int(self.y * zoom_factor) + screen_offset_y
                pygame.draw.circle(screen, self.color, (zoomed_x, zoomed_y), int(zoomed_radius))

    def draw_trail(self, screen):
        if trail and len(self.trail) > 1:
            if focus_mode and focus_ref is not None:
                fx, fy = focus_ref
                adjusted_trail = [((x - fx)*zoom_factor + size_x/2, (y - fy)*zoom_factor + size_y/2) for x, y in self.trail]
            else:
                adjusted_trail = [(x*zoom_factor + screen_offset_x, y*zoom_factor + screen_offset_y) for x, y in self.trail]
            pygame.draw.lines(screen, self.color, False, adjusted_trail, 1)
    

       





pygame.init()
clock = pygame.time.Clock()
screen = pygame.display.set_mode((size_x, size_y))
pygame.display.set_caption("Simulateur de planète")
particles = []
running = True

pygame.font.init()
police = pygame.font.Font(None, 50)

# Les particules seront générées via le menu (Entrée pour lancer)


while running:
    dt = (clock.tick(60) / 1000.0) * time_scale
    screen.fill( hex_to_rgb("#1c2833"))

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif in_menu:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                elif event.key in (pygame.K_UP, pygame.K_z):
                    menu_index = (menu_index - 1) % len(menu_options)
                elif event.key in (pygame.K_DOWN, pygame.K_s):
                    menu_index = (menu_index + 1) % len(menu_options)
                elif event.key in (pygame.K_RETURN, pygame.K_KP_ENTER):
                    # Lancer la simulation choisie
                    _, code = menu_options[menu_index]
                    load_preset(code)
                    in_menu = False
        else:
            if event.type == pygame.MOUSEBUTTONDOWN:
                sx, sy = pygame.mouse.get_pos()
                # Conversion écran -> monde: dépend du mode focus
                if focus_mode and len(particles) > 0 and particles[i].alive and focus_ref is not None:
                    fx, fy = focus_ref
                    mx = fx + (sx - size_x/2) / zoom_factor
                    my = fy + (sy - size_y/2) / zoom_factor
                else:
                    mx = (sx - screen_offset_x) / zoom_factor
                    my = (sy - screen_offset_y) / zoom_factor

                # Mode focus: clic gauche crée un satellite autour de l'objet focus
                if event.button == 1 and focus_mode and len(particles) > 0 and particles[i].alive:
                    parent = particles[i]
                    dx = mx - parent.x
                    dy = my - parent.y
                    R = sqrt(dx*dx + dy*dy)
                    if R >= 5:
                        v_orbit = sqrt(G * parent.masse / R)
                        ang_radial = degrees(atan2(-dy, dx))
                        angle_tangent = ang_radial + 90
                        mods = pygame.key.get_mods()
                        if mods & pygame.KMOD_SHIFT:
                            angle_tangent = ang_radial - 90
                        # Vitesse finale = vitesse parent + vitesse orbitale
                        vx_orb = v_orbit * cos(radians(angle_tangent))
                        vy_orb = -v_orbit * sin(radians(angle_tangent))
                        vx_total = parent.vx + vx_orb
                        vy_total = parent.vy + vy_orb
                        v_total = sqrt(vx_total*vx_total + vy_total*vy_total)
                        ang_total = degrees(atan2(-vy_total, vx_total))
                        sat_mass = max(parent.masse * satellite_coeff, 5e11)
                        particles.append(Particle(mx, my, v_total, ang_total, sat_mass, 5e8))
                    continue

                # Sélection par clic droit : choisir planète la plus proche dans un rayon
                if event.button == 3:
                    nearest = None
                    min_d = 1e9
                    for p in particles:
                        if p.alive:
                            d = sqrt((p.x-mx)**2 + (p.y-my)**2)
                            if d < min_d and d < 50:  # seuil de sélection
                                min_d = d
                                nearest = p
                    if nearest:
                        selected_particle = nearest
                    else:
                        # Pas de sélection valide: création d'une planète (si aucune sélection encore)
                        base_mass = satellite_base_mass if selected_chain_count == 0 else satellite_base_mass * pow(satellite_coeff, selected_chain_count)
                        particles.append(Particle(mx, my, 0, 0, base_mass, 5e8))
                        if selected_chain_count == 0:
                            selected_particle = particles[-1]
                        selected_chain_count += 1
                    continue

                # Création satellite via clic gauche si sélection (si pas en mode focus)
                if event.button == 1 and selected_particle:
                    dx = mx - selected_particle.x
                    dy = my - selected_particle.y
                    R = sqrt(dx*dx + dy*dy)
                    if R < 5:
                        continue
                    v_orbit = sqrt(G * selected_particle.masse / R)
                    ang_radial = degrees(atan2(-dy, dx))
                    angle_tangent = ang_radial + 90
                    mods = pygame.key.get_mods()
                    if mods & pygame.KMOD_SHIFT:
                        angle_tangent = ang_radial - 90
                    # Masse du satellite réduite
                    sat_mass = max(selected_particle.masse * satellite_coeff, 5e11)
                    # Ajouter la vitesse du parent à la vitesse orbitale
                    vx_orb = v_orbit * cos(radians(angle_tangent))
                    vy_orb = -v_orbit * sin(radians(angle_tangent))
                    vx_total = selected_particle.vx + vx_orb
                    vy_total = selected_particle.vy + vy_orb
                    v_total = sqrt(vx_total*vx_total + vy_total*vy_total)
                    ang_total = degrees(atan2(-vy_total, vx_total))
                    particles.append(Particle(mx, my, v_total, ang_total, sat_mass, 5e8))
                    selected_chain_count += 1
                elif event.button == 1 and not selected_particle:
                    # Pas de sélection: comportement ancien (planète massive fixe)
                    particles.append(Particle(mx, my, 0, 0, 1e14, 1000000000))
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    in_menu = True
                if event.key == pygame.K_SPACE:
                    mods = pygame.key.get_mods()
                    if mods & pygame.KMOD_SHIFT:
                        if len(particles)!=0 and particles[i].alive:
                            screen_offset_x = -(particles[i].x*zoom_factor - size_x/2)
                            screen_offset_y = -(particles[i].y*zoom_factor - size_y/2)
                    else:
                        paused = not paused
                if event.key == pygame.K_DELETE:
                    particles.clear()
                if event.key == pygame.K_c:  # Collisions ON/OFF
                    if colision == False:
                        colision = True
                    elif colision == True:
                        colision = False
                if event.key == pygame.K_t:  # Traînée ON/OFF
                    if trail == False:
                        trail = True
                    elif trail == True:
                        trail = False
                if event.key == pygame.K_p:  # Affichage particules ON/OFF
                    if show == False:
                        show = True
                    elif show == True:
                        show = False
                if event.key == pygame.K_o:  # Bords toroïdaux ON/OFF
                    if tor == False:
                        tor = True
                    elif tor == True:
                        tor = False
                if event.key == pygame.K_f:  # Mode focus
                    if focus_mode==False:
                        focus_mode = True
                    elif focus_mode:
                        focus_mode = False
                if event.key == pygame.K_e:  # Ralentir temps (x / 2)
                    time_scale = max(0.0625, time_scale / 2)
                elif event.key == pygame.K_r:  # Accélérer temps (x * 2)
                    time_scale = min(64.0, time_scale * 2)

                if event.key == pygame.K_RIGHT:  # Next particule (vivante)
                    if len(particles)>0:
                        tries = 0
                        while tries < len(particles):
                            i = (i + 1) % len(particles)
                            if particles[i].alive:
                                break
                            tries += 1
                    
                if event.key == pygame.K_LEFT:  # Prev particule (vivante)
                    if len(particles)>0:
                        tries = 0
                        while tries < len(particles):
                            i = (i - 1) % len(particles)
                            if particles[i].alive:
                                break
                            tries += 1
                
                if event.key == pygame.K_h:  # Aide
                    if help_show_flag==False:
                        help_show_flag = True
                    elif help_show_flag:
                        help_show_flag = False
                if event.key == pygame.K_F3:  # Données
                    if dat_show_flag==False:
                        dat_show_flag = True
                    elif dat_show_flag:
                        dat_show_flag = False
                      

        if not in_menu:
            keys = pygame.key.get_pressed()
            if keys[pygame.K_z]: # Si la touche z est pressée
                screen_offset_y -= 50
            if keys[pygame.K_s]: # Si la touche s est pressée
                screen_offset_y += 50
            if keys[pygame.K_q]: # Si la touche q est pressée
                screen_offset_x -= 50
            if keys[pygame.K_d]: # Si la touche d est pressée
                screen_offset_x += 50
            if keys[pygame.K_KP_MINUS]:
                trail_size -= 50
            if keys[pygame.K_KP_PLUS]:
                trail_size += 50
            if keys[pygame.K_KP_8]:  # Touche 8 pour zoomer
                zoom_factor *= 1.1  # Augmenter le facteur de zoom de 10%
                
            if keys[pygame.K_KP_2]:  # Touche 2 pour dézoomer
                zoom_factor /= 1.1  # Diminuer le facteur de zoom de 10%
                
            # Espace géré en KEYDOWN pour pause / recadrage (Maj+Espace)

    if focus_mode and not in_menu:
        if len(particles)!=0:
            focus_ref = (particles[i].x, particles[i].y)
        else:
            focus_ref = None
    else:
        focus_ref = None

    if help_show_flag and not in_menu:
        help_show(25)
    if dat_show_flag and not in_menu:
        dat_show(25)


    

    if in_menu:
        draw_menu()
    else:
        # Mise à jour physique
        if not paused:
            for particle in particles:
                particle.update(particles, dt)
        # Nettoyage des particules mortes (fusionnées)
        particles = [p for p in particles if p.alive]
        # Corriger l'index de focus pour viser un élément vivant si possible
        if len(particles) == 0:
            i = 0
            focus_mode = False
            focus_ref = None
            selected_particle = None
        else:
            if i >= len(particles):
                i = 0
            # Si l'index ne pointe pas vers un vivant (par sécurité), basculer sur le premier vivant
            if not particles[i].alive:
                for idx, p in enumerate(particles):
                    if p.alive:
                        i = idx
                        break
        # Si la sélection actuelle est morte, on l'annule
        try:
            if selected_particle and (not selected_particle.alive):
                selected_particle = None
        except NameError:
            pass

        # Dessin
        for particle in particles:
            particle.draw(screen)

    pygame.display.flip()
    
pygame.quit()
