/* ============================================================
   Sistema bilingüe ES / EN
   Uso en HTML:  <span data-i18n="nav.home">Inicio</span>
                 <input data-i18n-attr="placeholder:form.name">
   ============================================================ */
window.I18N = {
  es: {
    /* Navegación */
    "nav.home": "Inicio",
    "nav.bio": "Bio",
    "nav.music": "Música",
    "nav.agenda": "Agenda",
    "nav.resources": "Recursos",
    "nav.gospel": "Evangelio",
    "nav.blog": "Blog",
    "nav.press": "Kit de Prensa",
    "nav.invite": "Invitación",
    "nav.contact": "Contacto",
    "nav.rider": "Rider Técnico",
    "nav.store": "Librería",
    "nav.menu": "Menú",

    /* Hero */
    "hero.eyebrow": "Cantautor Católico Dominicano",
    "hero.sub": "Música que lleva el Evangelio a donde el corazón lo necesita.",
    "hero.listen": "Escuchar ahora",
    "hero.invite": "Invítame a tu parroquia",
    "hero.scroll": "Desliza",

    /* Lanzamiento */
    "release.eyebrow": "Último lanzamiento",
    "release.desc": "Una canción de fe, esperanza y gratitud. Escúchala en tu plataforma favorita y compártela con alguien que la necesite.",
    "release.all": "Toda la música",

    /* Eventos */
    "events.eyebrow": "Agenda",
    "events.title": "Próximos encuentros",
    "events.all": "Ver agenda completa",
    "events.loading": "Cargando eventos…",
    "events.empty": "No hay eventos publicados por el momento. Escríbeme para coordinar una fecha.",
    "events.error": "No se pudieron cargar los eventos. Intenta más tarde.",
    "events.details": "Detalles",

    /* Música */
    "music.eyebrow": "Discografía y streaming",
    "music.title": "Escucha",
    "music.desc": "Álbumes, sencillos y videos oficiales.",

    /* Video */
    "video.eyebrow": "Video oficial",
    "video.title": "Míralo en YouTube",
    "video.sub": "Suscríbete al canal para no perderte los estrenos.",
    "video.channel": "Ir al canal",

    /* Bio */
    "about.eyebrow": "Quién soy",
    "about.title": "Una vida puesta al servicio de la canción",
    "about.p1": "Nacido en Santiago de los Caballeros, República Dominicana, descubrí mi vocación musical en la Parroquia Cristo Rey del Universo. Desde entonces la guitarra y la Palabra han caminado juntas.",
    "about.p2": "Hoy formo parte de los Ministerios de Música de la Arquidiócesis de Nueva York y la Diócesis de Paterson, New Jersey, llevando la alabanza a congresos, parroquias y comunidades.",
    "about.more": "Leer la biografía completa",
    "about.stat1": "Años de ministerio",
    "about.stat2": "Canciones publicadas",
    "about.stat3": "Países visitados",

    /* Galería */
    "gallery.eyebrow": "En vivo",
    "gallery.title": "Momentos",
    "gallery.desc": "Conciertos, congresos y noches de adoración.",

    /* Invitación */
    "invite.eyebrow": "Para parroquias y organizadores",
    "invite.title": "¿Quieres llevar esta música a tu comunidad?",
    "invite.desc": "Completa el formulario de invitación y coordinamos fecha, formato y logística. También puedes descargar el kit de prensa con biografía, fotos en alta resolución y requerimientos técnicos.",
    "invite.form": "Formulario de invitación",
    "invite.press": "Descargar kit de prensa",
    "invite.rider": "Ver rider técnico",

    /* Newsletter */
    "news.eyebrow": "Mantente cerca",
    "news.title": "Recibe la Palabra y las novedades",
    "news.desc": "Nuevas canciones, fechas de conciertos y una reflexión para tu semana. Sin spam.",
    "news.placeholder": "Tu correo electrónico",
    "news.button": "Suscribirme",

    /* Formulario */
    "form.name": "Nombre completo",
    "form.email": "Correo electrónico",
    "form.phone": "Teléfono / WhatsApp",
    "form.org": "Parroquia u organización",
    "form.city": "Ciudad y país",
    "form.date": "Fecha tentativa",
    "form.type": "Tipo de evento",
    "form.details": "Cuéntame sobre el evento",
    "form.send": "Enviar invitación",
    "form.sending": "Enviando…",
    "form.okTitle": "¡Gracias!",
    "form.okBody": "He recibido tu invitación. Te contactaré muy pronto para coordinar los detalles.",
    "form.error": "Hubo un problema al enviar. Escríbeme por WhatsApp o correo, por favor.",
    "form.required": "Campos obligatorios",

    /* Contacto */
    "contact.eyebrow": "Hablemos",
    "contact.title": "Contacto",
    "contact.desc": "Para invitaciones, prensa o colaboraciones.",
    "contact.direct": "Contacto directo",
    "contact.save": "Guardar contacto",
    "contact.web": "Sitio web",
    "contact.phone": "Teléfono",
    "contact.whatsapp": "WhatsApp",
    "contact.mail": "Correo",
    "contact.based": "Basado en",

    /* Recursos */
    "res.eyebrow": "Para ministerios de música",
    "res.title": "Recursos",
    "res.desc": "Letras, acordes y materiales para que tu coro o ministerio pueda cantar estas canciones en la Misa y en momentos de adoración. Uso libre para fines litúrgicos y pastorales.",
    "res.chords": "Letra y acordes",
    "res.lyricvideo": "Video lyric",
    "res.listen": "Escuchar",
    "res.key": "Tono",
    "res.tempo": "Tempo",

    /* Kit de prensa */
    "press.eyebrow": "Electronic Press Kit",
    "press.title": "Kit de Prensa",
    "press.desc": "Todo lo que necesitas para promover el evento: biografía, fotografías oficiales, logotipos y requerimientos técnicos.",
    "press.bioShort": "Biografía corta",
    "press.bioLong": "Biografía extensa",
    "press.photos": "Fotografías oficiales",
    "press.logos": "Logotipos",
    "press.tech": "Rider técnico",
    "press.download": "Descargar",
    "press.copy": "Copiar texto",
    "press.copied": "¡Copiado!",
    "press.usage": "Uso permitido para promoción de eventos y notas de prensa. Por favor no modifiques los logotipos ni recortes las fotografías oficiales.",

    /* Genérico */
    "common.back": "Volver",
    "common.rights": "Todos los derechos reservados",
    "common.follow": "Sígueme",
    "common.explore": "Explorar",
    "common.ministry": "Ministerio",
    "common.readMore": "Leer más",
    "common.listenOn": "Escuchar en"
  },

  en: {
    /* Navigation */
    "nav.home": "Home",
    "nav.bio": "Bio",
    "nav.music": "Music",
    "nav.agenda": "Tour",
    "nav.resources": "Resources",
    "nav.gospel": "Gospel",
    "nav.blog": "Blog",
    "nav.press": "Press Kit",
    "nav.invite": "Booking",
    "nav.contact": "Contact",
    "nav.rider": "Tech Rider",
    "nav.store": "Store",
    "nav.menu": "Menu",

    /* Hero */
    "hero.eyebrow": "Dominican Catholic Singer-Songwriter",
    "hero.sub": "Music that carries the Gospel where the heart needs it most.",
    "hero.listen": "Listen now",
    "hero.invite": "Book me for your parish",
    "hero.scroll": "Scroll",

    /* Release */
    "release.eyebrow": "Latest release",
    "release.desc": "A song of faith, hope and gratitude. Listen on your favorite platform and share it with someone who needs it.",
    "release.all": "All music",

    /* Events */
    "events.eyebrow": "Tour",
    "events.title": "Upcoming dates",
    "events.all": "See full calendar",
    "events.loading": "Loading events…",
    "events.empty": "No events published right now. Reach out to schedule a date.",
    "events.error": "Events could not be loaded. Please try again later.",
    "events.details": "Details",

    /* Music */
    "music.eyebrow": "Discography & streaming",
    "music.title": "Listen",
    "music.desc": "Albums, singles and official videos.",

    /* Video */
    "video.eyebrow": "Official video",
    "video.title": "Watch on YouTube",
    "video.sub": "Subscribe to the channel so you don't miss a release.",
    "video.channel": "Go to channel",

    /* Bio */
    "about.eyebrow": "About",
    "about.title": "A life placed at the service of song",
    "about.p1": "Born in Santiago de los Caballeros, Dominican Republic, I discovered my musical calling at Cristo Rey del Universo Parish. Since then, the guitar and the Word have walked together.",
    "about.p2": "Today I serve with the Music Ministries of the Archdiocese of New York and the Diocese of Paterson, New Jersey, bringing worship to congresses, parishes and communities.",
    "about.more": "Read the full biography",
    "about.stat1": "Years in ministry",
    "about.stat2": "Songs released",
    "about.stat3": "Countries visited",

    /* Gallery */
    "gallery.eyebrow": "Live",
    "gallery.title": "Moments",
    "gallery.desc": "Concerts, congresses and nights of worship.",

    /* Booking */
    "invite.eyebrow": "For parishes & organizers",
    "invite.title": "Want to bring this music to your community?",
    "invite.desc": "Fill out the booking form and we'll coordinate date, format and logistics. You can also download the press kit with biography, high-resolution photos and technical requirements.",
    "invite.form": "Booking form",
    "invite.press": "Download press kit",
    "invite.rider": "View tech rider",

    /* Newsletter */
    "news.eyebrow": "Stay close",
    "news.title": "Get the Word and the news",
    "news.desc": "New songs, concert dates and a reflection for your week. No spam.",
    "news.placeholder": "Your email address",
    "news.button": "Subscribe",

    /* Form */
    "form.name": "Full name",
    "form.email": "Email address",
    "form.phone": "Phone / WhatsApp",
    "form.org": "Parish or organization",
    "form.city": "City and country",
    "form.date": "Tentative date",
    "form.type": "Type of event",
    "form.details": "Tell me about the event",
    "form.send": "Send request",
    "form.sending": "Sending…",
    "form.okTitle": "Thank you!",
    "form.okBody": "I've received your request. I'll contact you very soon to coordinate the details.",
    "form.error": "Something went wrong. Please reach out via WhatsApp or email.",
    "form.required": "Required fields",

    /* Contact */
    "contact.eyebrow": "Let's talk",
    "contact.title": "Contact",
    "contact.desc": "For bookings, press or collaborations.",
    "contact.direct": "Direct contact",
    "contact.save": "Save contact",
    "contact.web": "Website",
    "contact.phone": "Phone",
    "contact.whatsapp": "WhatsApp",
    "contact.mail": "Email",
    "contact.based": "Based in",

    /* Resources */
    "res.eyebrow": "For music ministries",
    "res.title": "Resources",
    "res.desc": "Lyrics, chords and materials so your choir or ministry can sing these songs at Mass and in times of worship. Free to use for liturgical and pastoral purposes.",
    "res.chords": "Lyrics & chords",
    "res.lyricvideo": "Lyric video",
    "res.listen": "Listen",
    "res.key": "Key",
    "res.tempo": "Tempo",

    /* Press kit */
    "press.eyebrow": "Electronic Press Kit",
    "press.title": "Press Kit",
    "press.desc": "Everything you need to promote the event: biography, official photography, logos and technical requirements.",
    "press.bioShort": "Short biography",
    "press.bioLong": "Long biography",
    "press.photos": "Official photography",
    "press.logos": "Logos",
    "press.tech": "Tech rider",
    "press.download": "Download",
    "press.copy": "Copy text",
    "press.copied": "Copied!",
    "press.usage": "Approved for event promotion and press coverage. Please do not modify the logos or crop the official photographs.",

    /* Generic */
    "common.back": "Back",
    "common.rights": "All rights reserved",
    "common.follow": "Follow",
    "common.explore": "Explore",
    "common.ministry": "Ministry",
    "common.readMore": "Read more",
    "common.listenOn": "Listen on"
  }
};
