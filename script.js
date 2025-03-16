// ================== CONFIGURACIÓN GOOGLE CALENDAR ==================
const calendarId = "je8uubih156f9ut71p2jjrle74@group.calendar.google.com";  // ID de tu calendario
const apiKey = "AIzaSyD-JuRMcup1KuqCHJIH2aDhQFqt-k9iCDQ";  // Tu clave de API

/**
 * Función para cargar eventos desde Google Calendar
 * @param {string} elementoId - ID del contenedor de eventos en el HTML
 * @param {number} maxEventos - Número máximo de eventos a mostrar
 */
async function cargarEventos(elementoId, maxEventos) {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&maxResults=${maxEventos}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`;

    try {
        console.log(`✅ Cargando ${maxEventos} eventos para ${elementoId}...`);
        const response = await fetch(url);
        const data = await response.json();
        const listaEventos = document.getElementById(elementoId);

        if (!listaEventos) return;

        listaEventos.innerHTML = "";

        if (!data.items || data.items.length === 0) {
            listaEventos.innerHTML = "<p>No hay eventos programados.</p>";
            return;
        }

        data.items.forEach(evento => {
            const item = document.createElement("a");
            item.href = evento.htmlLink;
            item.target = "_blank";
            item.classList.add("evento");

            const fechaObj = new Date(evento.start.dateTime || evento.start.date);
            const mes = fechaObj.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
            const dia = fechaObj.toLocaleDateString("es-ES", { day: "2-digit" });

            item.innerHTML = `
                <div class="evento-contenedor">
                    <div class="evento-fecha">
                        <span class="mes">${mes}</span>
                        <span class="dia">${dia}</span>
                    </div>
                    <div class="evento-titulo">${evento.summary}</div>
                </div>
            `;

            listaEventos.appendChild(item);
        });

    } catch (error) {
        console.error("❌ Error al obtener eventos:", error);
        document.getElementById(elementoId).innerHTML = "<p>Error al cargar eventos.</p>";
    }
}

// ================== INICIALIZAR FUNCIONES AL CARGAR LA PÁGINA ==================
document.addEventListener("DOMContentLoaded", () => {
    // Si existe el contenedor de eventos en la página principal, cargar 5 eventos
    if (document.getElementById("lista-eventos")) {
        cargarEventos("lista-eventos", 5);
    }

    // Si existe el contenedor de agenda, cargar 20 eventos
    if (document.getElementById("lista-agenda")) {
        cargarEventos("lista-agenda", 20);
    }

    // Configuración de pestañas en la sección de música
    document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
    if (document.getElementById("spotify")) {
        document.getElementById("spotify").style.display = "block";
    }
    const primerTab = document.querySelector(".tab-link");
    if (primerTab) primerTab.classList.add("active");
});

// ================== FUNCIONALIDAD PARA LAS PESTAÑAS DE LA SECCIÓN MÚSICA ==================
function openTab(event, tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
    document.querySelectorAll(".tab-link").forEach(button => button.classList.remove("active"));

    document.getElementById(tabId).style.display = "block";
    event.currentTarget.classList.add("active");
}

// ================== FUNCIÓN PARA ABRIR/CERRAR EL MENÚ EN MÓVILES ==================
function toggleMenu() {
    document.querySelector("nav").classList.toggle("active");
}

// ================== SUSCRIPCIÓN AL EVANGELIO ==================
const formSuscripcion = document.getElementById("form-suscripcion");
if (formSuscripcion) {
    formSuscripcion.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;

        console.log(`📩 Nuevo suscriptor: ${email}`);

        document.getElementById("mensaje").textContent = "¡Gracias por suscribirte! Pronto recibirás el evangelio diario.";
        formSuscripcion.reset();
    });
}

// ================== FUNCIÓN DE RESPUES PARA EL FORMULARIO DE INVITACION ==================
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    let form = this;

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { "Accept": "application/json" }
    }).then(response => {
        if (response.ok) {
            form.innerHTML = "<h3>✅ ¡Gracias!</h3><p>Hemos recibido tu invitación y pronto te contactaremos.</p>";
        } else {
            alert("⚠️ Hubo un problema al enviar el formulario. Inténtalo de nuevo.");
        }
    }).catch(error => alert("❌ Error al enviar el formulario. Verifica tu conexión."));
});