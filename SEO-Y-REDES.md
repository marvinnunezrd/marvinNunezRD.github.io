# Auditoría antes de subir — Favicon, Open Graph y SEO

Fecha: 3 de agosto de 2026 · 50 páginas revisadas

---

## 1. Favicon e iconos

**Antes:** existía un `favicon.ico`, pero era una foto tuya reducida a un círculo. A 16 px
(el tamaño real en la pestaña del navegador) no se distinguía nada: era una mancha.

**Ahora:** monograma «M» en dorado sobre fondo oscuro, en serif, con el mismo dorado del sitio.

| Archivo | Uso |
|---|---|
| `favicon.ico` | Pestaña del navegador y favoritos. 6 tamaños: 16, 32, 48, 64, 128, 256 px |
| `assets/icons/app/apple-touch-icon.png` | Icono en la pantalla de inicio del iPhone/iPad (180 px) |
| `assets/icons/app/icon-192.png` / `icon-512.png` | Android y app instalable |
| `assets/icons/app/icon-maskable-512.png` | Android adaptativo (recorte circular o cuadrado) |
| `site.webmanifest` | Nombre, colores y tema al instalar el sitio como app |

Los tres están enlazados en **las 50 páginas**, con la ruta correcta según su profundidad.

---

## 2. Open Graph — cómo se ve el enlace al compartirlo

Cada plataforma lee etiquetas distintas. Estado tras la revisión:

| Dónde se comparte | Qué lee | Estado |
|---|---|---|
| **WhatsApp** | `og:title`, `og:description`, `og:image` (+ tamaño declarado) | ✅ |
| **Telegram** | `og:title`, `og:description`, `og:image` | ✅ |
| **Facebook** | Open Graph completo + `og:site_name`, `og:locale`, `og:type` | ✅ |
| **Instagram (stickers de enlace)** | Open Graph | ✅ |
| **X / Twitter** | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | ✅ |
| **LinkedIn** | Open Graph + `og:image:width/height` | ✅ |
| **iMessage / Mensajes de Apple** | Open Graph + `apple-touch-icon` | ✅ |
| **Slack, Discord, Signal** | Open Graph | ✅ |
| **Pinterest** | `og:image` + `og:image:alt` | ✅ |

Añadido en esta pasada, en las páginas donde faltaba:
`og:image:width`, `og:image:height`, `og:image:alt`, `og:image:type`, `og:site_name`,
`og:locale`, `twitter:card`, `theme-color`, `apple-touch-icon`, `manifest`.

> **Importante sobre WhatsApp:** declarar el ancho y el alto de la imagen es lo que hace que
> muestre la vista previa grande en vez de la miniatura pequeña. Antes faltaba en 50 páginas.

### Corregí tres errores que había introducido yo

1. En 49 páginas la etiqueta `og:image` quedó sin cerrar (`content="…"` sin el `>`), lo que
   rompía el `<head>`. Corregido.
2. En 45 páginas quedó un `>>` doble. Corregido.
3. En la portada las rutas del favicon apuntaban a `../favicon.ico` (un nivel de más).
   Recalculadas por profundidad real en todas las páginas.

Verificación final: **50 páginas, 0 metaetiquetas duplicadas, 0 malformadas, 0 rutas rotas.**

---

## 3. Datos estructurados (Schema.org)

Es lo que Google usa para entender *quién eres*, no solo *qué dice la página*. Es la base
del panel de conocimiento a la derecha del buscador y de lo que citan los asistentes de IA.

- **Portada:** grafo `Person` + `MusicGroup` con nombre, variantes del nombre («Marvin Nuñez»
  sin tilde incluida), lugar de nacimiento, géneros, álbumes, punto de contacto para
  invitaciones y `sameAs` con los 8 perfiles oficiales (Spotify, Apple Music, YouTube,
  Instagram, Facebook, TikTok, Bandsintown, Musixmatch).
- **29 páginas de canción:** `MusicComposition`, con el compositor apuntando a tu entidad
  y la grabación de YouTube cuando existe.
- **4 entradas de blog:** `BlogPosting` con autor, fecha e imagen.
- **Bio:** `ProfilePage`. **Invitación:** `ContactPage`. **Música, Recursos, Letras, Librería:**
  `CollectionPage`. **Blog:** `Blog`.
- Las 49 páginas internas apuntan por `@id` a la **misma entidad** de la portada. Eso le dice
  a Google que todo el sitio habla de una sola persona, en lugar de 50 páginas sueltas.

---

## 4. Buscadores con IA (ChatGPT, Gemini, Perplexity, Claude)

Aquí estaba el hueco más grande, porque no es SEO clásico.

- **`robots.txt` reescrito** permitiendo explícitamente a los rastreadores de IA:
  `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`,
  `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `Amazonbot`, `DuckAssistBot`,
  `cohere-ai`, `CCBot`. Sin esto, varios asistentes simplemente no leen el sitio.
- **`llms.txt` nuevo** — un resumen en texto plano, pensado para que un modelo lo lea entero:
  quién eres en un párrafo, el mapa del sitio, las 25 letras publicadas, el blog, los perfiles
  y una nota aclarando que el nombre lleva tilde. Es el formato que están adoptando estas
  herramientas para saber qué es fiable en un dominio.
- **`sitemap.xml` regenerado**: 50 URLs (antes 42 — faltaban 8 letras), con prioridades reales.

---

## 5. Palabras clave del sector

Los títulos y descripciones ahora apuntan a lo que la gente escribe de verdad:

| Búsqueda típica | Página que la responde |
|---|---|
| `marvin núñez` / `marvin nuñez cantante católico` | Portada + Bio |
| `letra de [canción] marvin núñez` | Las 29 páginas de letra |
| `música católica dominicana` | Portada, Música |
| `canciones para misa` / `cantos católicos de alabanza` | Recursos, Cancionero |
| `letras y acordes música católica` | Recursos |
| `invitar cantante católico a mi parroquia` | Invitación |
| `rider técnico artista católico` | Rider (4 formatos) |

**Las 29 páginas de letra** se reescribieron con el patrón exacto de búsqueda:
título `Letra de «Mil Motivos» — Marvin Núñez`, y la descripción arranca con el primer verso
real de la canción. Así aparece también cuando alguien busca un pedazo de letra que recuerda
a medias — que es como busca la mayoría de la gente.

Además: 147 imágenes, ahora **todas** con texto alternativo descriptivo (había 10 vacías).

---

## 6. Lo que tienes que saber con honestidad

### No puedo garantizarte el primer lugar, y desconfía de quien te lo prometa

Lo técnico está resuelto. Pero el posicionamiento depende de tres cosas, y solo controlo una:

1. **Lo técnico** (esto): ✅ hecho, y bien hecho.
2. **La autoridad del dominio**: cuántos sitios de confianza te enlazan. Aquí estás casi en
   cero, y no se arregla con código. Se arregla con notas de prensa en medios católicos,
   perfiles en portales de música católica, y que las parroquias donde cantas te enlacen.
3. **El tiempo**: un dominio nuevo tarda de 3 a 6 meses en asentarse, aunque esté perfecto.

Para «marvin núñez» a secas competirás con otras personas del mismo nombre. Para
**«marvin núñez cantautor católico»** o **«letra de [tu canción]»** deberías quedar primero
en pocas semanas, porque eres la fuente original y nadie más disputa esos términos.

### La versión en inglés no existe para Google

Esto es real y quiero que lo sepas antes de subir: el cambio ES/EN funciona con JavaScript en
el navegador. No hay URLs en inglés (`/en/bio/`, por ejemplo). Google indexa lo que ve en el
HTML, que es el español. **Todo tu contenido en inglés es invisible para los buscadores.**

Si el público de Nueva York y Paterson te importa para búsquedas en inglés, hay que generar
páginas en inglés de verdad con sus propias direcciones y etiquetas `hreflang`. Es un trabajo
aparte, no complicado, pero no está hecho. Si el inglés es solo una cortesía para quien ya
llegó al sitio, déjalo como está — funciona bien para eso.

### Después de subir, tres cosas que solo puedes hacer tú

1. **Google Search Console** — dar de alta el sitio y enviar el `sitemap.xml`. La etiqueta de
   verificación ya está puesta en la portada.
2. **Bing Webmaster Tools** — importa la configuración de Google en un clic. Y Bing es el que
   alimenta a ChatGPT, así que aquí sí importa.
3. **Google Business / panel de artista** — reclamar tu perfil de artista en YouTube Music y
   Spotify for Artists, y que ambos enlacen a `marvinnunezrd.com`. Es la señal más fuerte que
   existe para que Google te reconozca como la persona correcta.
