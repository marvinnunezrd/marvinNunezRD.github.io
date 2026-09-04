# Sitio web — Marvin Núñez (rediseño)

Diseño: **oscuro cinematográfico + dorado**. Sitio estático (HTML/CSS/JS), sin build ni dependencias.
Listo para GitHub Pages igual que el actual.

## Cómo verlo

Abre `index.html` con doble clic. Funciona directo desde el disco, sin servidor.

> Nota: los eventos de Google Calendar y los reproductores de Spotify/YouTube requieren internet.

## Estructura

```
index.html              Portada
bio/                    Biografía
musica/                 Discografía + reproductores
agenda/                 Calendario completo (Google Calendar)
recursos/               Letras y acordes para ministerios   ← NUEVO
  letras/               Página por canción
kit-de-prensa/          EPK descargable                     ← NUEVO
invitacion/             Formulario de invitación + contacto ← NUEVO (reemplaza redesycontacto)
evangelio-de-hoy/       Evangelio diario
blog/                   Testimonios (3 entradas)
libreria/               Tienda
rider/                  Riders técnicos (4 formatos, sin cambios)
milmotivos/             Landing del sencillo (sin cambios)
redesycontacto/         Redirección → invitacion/
assets/
  css/main.css          Sistema de diseño completo
  js/i18n.js            Traducciones ES/EN
  js/main.js            Menú, idioma, calendario, formularios
  icons/ui/             Iconos monocromáticos (20 SVG, 12 KB total)
  img/                  Imágenes optimizadas para web
```

## Qué cambió respecto al sitio anterior

- **Diseño nuevo completo**: tipografía editorial (Cormorant Garamond + Inter), hero a pantalla
  completa, animaciones de entrada al hacer scroll, menú móvil a pantalla completa.
- **Bilingüe ES/EN**: selector en el header. Traduce navegación, botones y textos de interfaz.
  Recuerda la preferencia del visitante.
- **3 secciones nuevas** (basadas en el análisis de Elevation Worship, Miel San Marcos y Kairy Marquez):
  formulario de invitación dedicado, kit de prensa descargable y recursos para ministerios.
- **Peso muy reducido**: los iconos pasaron de 560 KB a 12 KB; el logo de 553 KB a 43 KB;
  una imagen del blog de 3.5 MB a 19 KB.
- **SEO**: sitemap regenerado, datos estructurados Schema.org, canonical y Open Graph en cada página.
- La URL antigua `/redesycontacto/` redirige a `/invitacion/` para no perder enlaces.

## Cancionero (`recursos/letras/`)

Índice con las 21 canciones agrupadas por producción, y una página por canción.
Cada página tiene tres bloques: **Letra**, **Acordes** y **Secuencias y pistas**.
Acordes y secuencias están marcados «En construcción»; la letra espera tu texto.

La forma más rápida de publicar todas: abre **`letras-para-completar.txt`**, pega cada
letra debajo de su título, guarda, y dime *«ya llené el archivo de letras»*.
Yo ejecuto `publicar-letras.py` y quedan las 21 páginas publicadas y el índice actualizado.

En ese archivo puedes marcar secciones escribiendo `[Verso 1]`, `[Coro]`, `[Puente]`
al inicio de una línea; se convierten en las etiquetas doradas de la página.

**Repeticiones:** si un coro se canta varias veces seguidas, escríbelo una sola vez y
marca la sección como `[Coro] x4`. En la página aparece «Coro ×4» y el bloque no se
duplica — es la convención de cancionero, más legible para directores de coro.
Las canciones que dejes vacías se quedan en «Próximamente».

Si prefieres editar el HTML a mano, sustituye el bloque `<div class="wip">…</div>`
de la sección Letra por:

```html
<div class="lyrics"><span class="lyrics-part">Verso 1</span>
tu texto aquí, un verso por línea

<span class="lyrics-part">Coro</span>
más texto
</div>
```

Los saltos de línea se respetan tal cual (`white-space: pre-wrap`).

> Más rápido: envíame las letras por chat y las coloco yo con el formato correcto.

## Pendiente de completar (contenido, no código)

1. **Letras de las canciones** — ver sección anterior.
2. **Confirmar el catálogo**: el listado de *Jesús: The Álbum* es parcial (5 de 11 temas)
   y puede faltar algún sencillo. Revísalo en `recursos/letras/index.html`.
3. **Tonos y tempos en `recursos/index.html`** — los puse como estimación; ajústalos.
3. **Estadísticas de la portada** (25+ años, 3 producciones, 6+ países) — confirma los números.
4. **Fotos del kit de prensa** — ahora enlazan a las de `fotosvarias`. Si tienes fotos
   de prensa dedicadas en alta, sustitúyelas.
5. **Textos largos en inglés** — la bio y el blog están solo en español. Si los quieres
   bilingües, se puede añadir con bloques `data-lang="en"`.

## Cómo editar cosas comunes

**Añadir un enlace al menú**: aparece en cada `index.html` dentro de `<nav class="nav">` y
también en `<div class="mobile-menu">`. Hay que añadirlo en las dos partes de cada página.

**Cambiar colores**: todo está al inicio de `assets/css/main.css`, en `:root`.
Por ejemplo `--gold: #C9A227;`.

**Cambiar textos de interfaz o traducciones**: `assets/js/i18n.js`.

**Cambiar la foto del hero**: en `index.html`, busca `hero-congreso-3.webp`.
