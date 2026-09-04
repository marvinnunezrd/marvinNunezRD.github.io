#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lee letras-para-completar.txt y publica cada letra en su pagina.
Solo toca las canciones que tengan texto; las vacias se quedan "Proximamente".
"""
import os, re, html, unicodedata

ROOT = "/sessions/funny-jolly-fermat/mnt/MarvinNunezRD/sitio-nuevo"
SRC = os.path.join(ROOT, "letras-para-completar.txt")


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^\w\s-]", "", s).strip().lower()
    return re.sub(r"[\s_]+", "-", s)


# Plataformas admitidas en las líneas "@plataforma: url"
PLATAFORMAS = [
    ("spotify",       "spotify",       "Spotify"),
    ("apple",         "apple-music",   "Apple Music"),
    ("applemusic",    "apple-music",   "Apple Music"),
    ("youtube",       "youtube",       "YouTube"),
    ("youtubemusic",  "youtube-music", "YouTube Music"),
    ("amazon",        "amazon-music",  "Amazon Music"),
    ("tidal",         "tidal",         "TIDAL"),
    ("deezer",        "deezer",        "Deezer"),
]
ALIAS = {k: (i, n) for k, i, n in PLATAFORMAS}
ORDEN = ["spotify", "apple-music", "youtube", "youtube-music", "amazon-music", "tidal", "deezer"]


AUTOR_POR_DEFECTO = "Marvin Núñez Tavárez"


def parse(path):
    """Devuelve {titulo: (texto, [(icono, nombre, url), ...], autores)}."""
    songs, cur, buf, links, autores = {}, None, [], [], None

    arreglos = None
    nota = None
    tipo = None
    feat = None
    texto_cred = None
    musica_cred = None
    videos = []

    def guardar():
        if cur and ("".join(buf).strip() or links):
            songs[cur] = ("\n".join(buf).strip("\n"), list(links), (autores, arreglos, nota, tipo, feat, texto_cred, musica_cred, videos))

    for raw in open(path, encoding="utf-8"):
        line = raw.rstrip("\n")
        m = re.match(r"^===\s*(.+?)\s*===\s*$", line)
        if m:
            guardar()
            cur, buf, links, autores, arreglos, nota, tipo, feat = m.group(1), [], [], None, None, None, None, None
            texto_cred = musica_cred = None
            videos = []
            continue
        if line.lstrip().startswith("#"):
            continue
        ma = re.match(r"^\s*@autores?\s*:\s*(.+?)\s*$", line, re.I)
        if ma:
            autores = ma.group(1)
            continue
        mr = re.match(r"^\s*@arreglos?\s*:\s*(.+?)\s*$", line, re.I)
        if mr:
            arreglos = mr.group(1)
            continue
        mv = re.match(r"^\s*@video\s*:\s*(.+?)\s*$", line, re.I)
        if mv:
            partes = [x.strip() for x in mv.group(1).split("|")]
            url = partes[-1]
            etiq = partes[0] if len(partes) > 1 else "Video"
            vid = re.search(r"(?:youtu\.be/|v=|embed/)([\w-]{11})", url)
            if vid:
                videos.append((etiq, vid.group(1)))
            continue
        mx = re.match(r"^\s*@texto\s*:\s*(.+?)\s*$", line, re.I)
        if mx:
            texto_cred = mx.group(1)
            continue
        mm = re.match(r"^\s*@m[uú]sica\s*:\s*(.+?)\s*$", line, re.I)
        if mm:
            musica_cred = mm.group(1)
            continue
        mf = re.match(r"^\s*@(?:feat|featuring|invitados?)\s*:\s*(.+?)\s*$", line, re.I)
        if mf:
            feat = mf.group(1)
            continue
        mt = re.match(r"^\s*@tipo\s*:\s*(.+?)\s*$", line, re.I)
        if mt:
            tipo = mt.group(1).strip().lower()
            continue
        mn = re.match(r"^\s*@nota\s*:\s*(.+?)\s*$", line, re.I)
        if mn:
            nota = mn.group(1)
            continue
        ml = re.match(r"^\s*@([\w-]+)\s*:\s*(https?://\S+)\s*$", line)
        if ml:
            clave = ml.group(1).lower().replace("-", "")
            if clave in ALIAS:
                ico, nom = ALIAS[clave]
                links.append((ico, nom, ml.group(2)))
            continue
        if cur is not None:
            buf.append(line)
    guardar()
    return songs


def listen_html(links):
    """Fila de plataformas con enlace directo a la canción."""
    links = sorted(links, key=lambda x: ORDEN.index(x[0]) if x[0] in ORDEN else 99)
    return "".join(
        '\n      <a class="listen listen--exact" href="%s" target="_blank" rel="noopener">'
        '<i class="ico ico-%s" aria-hidden="true"></i> %s</a>' % (html.escape(url, quote=True), ico, nom)
        for ico, nom, url in links
    )


SPOKEN_RE = re.compile(r"hablad|recitad|spoken|declamad", re.I)


def to_html(texto):
    """Convierte [Seccion] en etiquetas doradas y escapa el resto.

    Si el nombre de la sección contiene 'hablada'/'recitado'/'spoken', las
    líneas siguientes se envuelven en un bloque .lyrics-spoken (itálica,
    atenuado) hasta la siguiente sección. Útil para grabaciones en vivo con
    exhortación antes del canto.
    """
    out, prev_blank, spoken = [], True, False

    def cerrar():
        if spoken:
            out.append("</span>")

    for line in texto.split("\n"):
        s = line.strip()
        # [Coro] · [Coro] x4 · [Coro] (x4) · [Coro] ×4
        # [Coro] · [Coro] x4 · [Coro] (x4) · [Coro] (varias veces)
        m = re.match(r"^\[(.+?)\]\s*(?:\(\s*([^)]+?)\s*\)|([x×]\s*\d+))?$", s, re.I)
        if m:
            nombre = m.group(1)
            calif = (m.group(2) or m.group(3) or "").strip()
            cerrar()
            etiqueta = html.escape(nombre)
            if calif:
                mv = re.match(r"^[x×]\s*(\d+)$", calif, re.I)
                if mv:
                    if int(mv.group(1)) > 1:
                        etiqueta += ' <em class="lyrics-rep">×%s</em>' % mv.group(1)
                else:
                    etiqueta += ' <em class="lyrics-rep">%s</em>' % html.escape(calif)
            out.append('<span class="lyrics-part">%s</span>' % etiqueta)
            spoken = bool(SPOKEN_RE.search(nombre))
            if spoken:
                out.append('<span class="lyrics-spoken">')
            prev_blank = True
            continue
        if not s:
            if not prev_blank:
                out.append("")
            prev_blank = True
            continue
        out.append(html.escape(s))
        prev_blank = False

    cerrar()
    txt = "\n".join(out).strip("\n")
    # Las etiquetas de sección son bloque; el salto que las sigue se veria
    # como una linea vacia dentro del pre-wrap. Se elimina.
    txt = re.sub(r'(</span>)\n(?!\n)', r'\1', txt)
    txt = re.sub(r'(<span class="lyrics-spoken">)\n', r'\1', txt)
    return txt


DOMINIO_RE = re.compile(r"dominio\s*p[uú]blico|public\s*domain|tradicional", re.I)


def credito_html(creditos):
    """Crédito al pie de la letra. Distingue obra propia de dominio público."""
    autores, arreglos = (creditos[0], creditos[1]) if creditos else (None, None)
    autores = autores or AUTOR_POR_DEFECTO

    if DOMINIO_RE.search(autores):
        partes = ["Letra y música: dominio público",
                  "Interpretación: Marvin Núñez"]
        if arreglos:
            partes.append("Arreglos: %s" % html.escape(arreglos))
        return " · ".join(partes)

    tx = creditos[5] if creditos and len(creditos) > 5 else None
    mus = creditos[6] if creditos and len(creditos) > 6 else None
    if tx or mus:
        partes = []
        if tx:
            partes.append("Texto: %s" % html.escape(tx))
        partes.append("Música: %s" % html.escape(mus or AUTOR_POR_DEFECTO))
    else:
        partes = ["Letra y música: %s" % html.escape(autores)]
    feat = creditos[4] if creditos and len(creditos) > 4 and creditos[4] else None
    if feat:
        partes.append("Voces invitadas: %s" % html.escape(feat))
    if arreglos:
        partes.append("Arreglos: %s" % html.escape(arreglos))
    partes.append("© Todos los derechos reservados")
    return " · ".join(partes)


TERCEROS_BLOQUE = """<div class="wip wip--terceros">
          <span class="badge">Letra no publicada</span>
          <p>Esta canción forma parte del repertorio de Marvin, pero <strong>la letra y la música
          pertenecen a sus autores</strong>. Por respeto a sus derechos no se reproduce aquí.
          Puedes escuchar la grabación en las plataformas de streaming.</p>
          <p class="mt-2">%s</p>%s
        </div>"""

AYUDA_AUTORIA = """
          <p class="mt-3" style="text-transform:none;letter-spacing:0;font-size:var(--fs-small)">
            ¿Conoces a quien compuso esta canción?
            <a href="../../invitacion/" style="color:var(--gold)">Escríbeme</a> y actualizo el crédito.
          </p>"""


def videos_html(videos):
    """Reproductores de YouTube incrustados, uno por version."""
    if not videos:
        return ""
    items = ""
    for etiq, vid in videos:
        items += ('\n            <figure class="song-video">'
                  '\n              <div class="video-frame">'
                  '\n                <iframe src="https://www.youtube-nocookie.com/embed/%s" title="%s"'
                  ' loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"'
                  ' allowfullscreen></iframe>'
                  '\n              </div>'
                  '\n              <figcaption>%s</figcaption>'
                  '\n            </figure>' % (vid, html.escape(etiq, quote=True), html.escape(etiq)))
    return ('<div data-videos>'
            '\n          <h2 style="font-size:var(--fs-h3);margin-bottom:1rem">Videos</h2>'
            '\n          <div class="song-videos">%s\n          </div>'
            '\n        </div>' % items)


def publicar(titulo, texto, links, creditos=None):
    sl = slug(titulo)
    page = os.path.join(ROOT, "recursos/letras/%s.html" % sl)
    if not os.path.exists(page):
        print("  ⚠ no existe la página:", sl)
        return False

    h = open(page, encoding="utf-8").read()
    ok_letra = True

    tipo = creditos[3] if creditos and len(creditos) > 3 else None

    # --- Videos (columna derecha, encima de Acordes) ---
    vids = creditos[7] if creditos and len(creditos) > 7 else []
    if vids:
        h = re.sub(r'<div data-videos>.*?</div>',
                   lambda m: videos_html(vids), h, count=1, flags=re.S)


    # --- Obra de terceros: no se publica la letra ---
    if tipo == "terceros":
        autores = (creditos[0] if creditos else None) or "autoría por confirmar"
        sin_confirmar = "confirmar" in autores.lower() or "desconoc" in autores.lower()
        cred = "Letra y música: %s · Interpretación: Marvin Núñez" % html.escape(autores)
        extra = creditos[2] if creditos and len(creditos) > 2 and creditos[2] else None
        if extra:
            cred += '</p>\n          <p class="mt-2" style="text-transform:none;letter-spacing:0">%s' % html.escape(extra)
        bloque = TERCEROS_BLOQUE % (cred, AYUDA_AUTORIA if sin_confirmar else "")
        patron = (r'(<h2 style="font-size:var\(--fs-h3\);margin-bottom:1\.5rem">Letra</h2>\s*)'
                  r'(<div class="wip[^"]*">.*?</div>|<div class="lyrics">.*?</div>)')
        h, n = re.subn(patron, lambda m: m.group(1) + bloque, h, count=1, flags=re.S)
        if not n:
            print("  ⚠ no se pudo marcar como terceros:", sl)
        if links:
            h = re.sub(r'(<div class="listen-row" data-listen>).*?(</div>)',
                       lambda m: m.group(1) + listen_html(links) + "\n    " + m.group(2),
                       h, count=1, flags=re.S)
            h = re.sub(r'(<p class="listen-note" data-listen-note>).*?(</p>)',
                       lambda m: m.group(1) + "Escucha la grabación de Marvin." + m.group(2),
                       h, count=1, flags=re.S)
        open(page, "w", encoding="utf-8").write(h)
        return "terceros"

    # --- Letra ---
    if texto.strip():
        nota_txt = creditos[2] if creditos and len(creditos) > 2 else None
        nota_html = ('\n        <p class="lyrics-note">%s</p>' % html.escape(nota_txt)) if nota_txt else ''
        bloque = ('<div class="lyrics">%s</div>%s\n'
                  '        <p class="lyrics-credit">%s</p>'
                  % (to_html(texto), nota_html, credito_html(creditos)))
        patron = (r'(<h2 style="font-size:var\(--fs-h3\);margin-bottom:1\.5rem">Letra</h2>\s*)'
                  r'(<div class="wip">.*?</div>|<div class="lyrics">.*?</div>)')
        h, n = re.subn(patron, lambda m: m.group(1) + bloque, h, count=1, flags=re.S)
        if not n:
            print("  ⚠ no se pudo insertar la letra en:", sl)
            ok_letra = False

    # --- Fila de plataformas ---
    if links:
        h = re.sub(r'(<div class="listen-row" data-listen>).*?(</div>)',
                   lambda m: m.group(1) + listen_html(links) + "\n    " + m.group(2),
                   h, count=1, flags=re.S)
        h = re.sub(r'(<p class="listen-note" data-listen-note>).*?(</p>)',
                   lambda m: m.group(1) + "Escúchala en tu plataforma favorita." + m.group(2),
                   h, count=1, flags=re.S)

    open(page, "w", encoding="utf-8").write(h)
    return ok_letra


def actualizar_indice(publicadas, terceros=()):
    """Marca como «Ver letra» solo las filas de las canciones publicadas.

    Importante: la sustitución se hace DENTRO de cada bloque <a class="song-row">…</a>.
    Si se busca el estado con un .*? que cruza el cierre del enlace, se acaba
    marcando la canción siguiente (bug corregido).
    """
    idx = os.path.join(ROOT, "recursos/letras/index.html")
    h = open(idx, encoding="utf-8").read()
    pub, ter = set(publicadas), set(terceros)

    def fila(m):
        bloque, href = m.group(0), m.group(1)
        if href in ter:
            return bloque.replace(
                '<span class="song-row__state song-row__state--wip">Próximamente</span>',
                '<span class="song-row__state song-row__state--audio">Escuchar →</span>')
        if href in pub:
            bloque = bloque.replace(
                '<span class="song-row__state song-row__state--wip">Próximamente</span>',
                '<span class="song-row__state">Ver letra →</span>')
        return bloque

    h = re.sub(r'<a class="song-row" href="([^"]+?)\.html">.*?</a>', fila, h, flags=re.S)
    open(idx, "w", encoding="utf-8").write(h)


if __name__ == "__main__":
    if not os.path.exists(SRC):
        raise SystemExit("No encuentro %s" % SRC)

    songs = parse(SRC)
    if not songs:
        print("El archivo aún no tiene ninguna letra. Nada que publicar.")
        raise SystemExit(0)

    ok, ter = [], []
    for titulo, (texto, links, creditos) in songs.items():
        r = publicar(titulo, texto, links, creditos)
        if r == "terceros":
            ter.append(slug(titulo))
            print("  ◦ %s (obra de terceros — solo audio)" % titulo)
            continue
        if r:
            if texto.strip():
                ok.append(slug(titulo))
            detalle = []
            if texto.strip():
                detalle.append("%d líneas" % len(texto.split("\n")))
            if links:
                detalle.append("%d enlaces" % len(links))
            print("  ✓ %s (%s)" % (titulo, ", ".join(detalle) or "sin cambios"))

    if ok or ter:
        actualizar_indice(ok, ter)
    print("\nProcesadas: %d | con letra: %d | obra de terceros: %d" % (len(songs), len(ok), len(ter)))
