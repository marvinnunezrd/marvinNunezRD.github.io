// ================== CONFIGURACIÓN GOOGLE CALENDAR ==================
const calendarId = "je8uubih156f9ut71p2jjrle74@group.calendar.google.com";  // ID de tu calendario
const apiKey = "AIzaSyD-JuRMcup1KuqCHJIH2aDhQFqt-k9iCDQ";  // Tu clave de API

async function cargarEventos() {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&maxResults=5&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`;

    try {
        console.log("✅ Conectando con la API de Google Calendar...");
        const response = await fetch(url);
        const data = await response.json();

        console.log("📌 Eventos obtenidos:", data.items);  // Ver si obtenemos eventos

        const listaEventos = document.getElementById("lista-eventos");

        // Verificar si la lista de eventos existe en el HTML
        if (!listaEventos) {
            console.error("❌ ERROR: No se encontró el elemento 'lista-eventos' en el HTML.");
            return;
        }

        // Limpiar la lista antes de agregar eventos
        listaEventos.innerHTML = "";

        if (!data.items || data.items.length === 0) {
            console.log("⚠️ No se encontraron eventos en la API.");
            listaEventos.innerHTML = "<p>No hay eventos próximos.</p>";
            return;
        }

        // Insertar eventos en la página
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
        document.getElementById("lista-eventos").innerHTML = "<p>Error al cargar eventos.</p>";
    }
}

// ================== FUNCIONALIDAD PARA LAS PESTAÑAS DE LA SECCIÓN MÚSICA ==================

function openTab(event, tabId) {
    // Ocultar todas las pestañas
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";  // Ahora todas las pestañas estarán ocultas
    });

    // Quitar la clase activa de todos los botones
    document.querySelectorAll(".tab-link").forEach(button => {
        button.classList.remove("active");
    });

    // Mostrar la pestaña seleccionada
    document.getElementById(tabId).style.display = "block";

    // Agregar la clase activa al botón seleccionado
    event.currentTarget.classList.add("active");
}

// ================== INICIALIZAR FUNCIONES AL CARGAR LA PÁGINA ==================
document.addEventListener("DOMContentLoaded", () => {
    cargarEventos();  // Cargar eventos de Google Calendar

    // Asegurar que solo el reproductor de Spotify esté visible al inicio
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.style.display = "none";  // Ocultar todos los reproductores
    });

    document.getElementById("spotify").style.display = "block";  // Mostrar solo Spotify
    document.querySelector(".tab-link").classList.add("active"); // Marcar la pestaña de Spotify como activa
});

// Función para abrir y cerrar el menú hamburguesa en móviles
function toggleMenu() {
    document.querySelector("nav").classList.toggle("active");
}

// ================== CARGAR EL EVANGELIO DEL DÍA DESDE VATICAN NEWS ==================
async function obtenerEvangelioDesdeVaticanNews() {
    try {
        console.log("📖 Cargando Evangelio del Día desde Vatican News...");

        // URL de la página de Vatican News donde está el evangelio
        const url = "https://www.vaticannews.va/es/evangelio-de-hoy.html";

        // Hacemos una petición para obtener la página HTML
        const response = await fetch(url);
        const html = await response.text();

        // Creamos un DOMParser para extraer el contenido
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Buscamos el texto del evangelio dentro de la página
        const evangelioElement = doc.querySelector(".evangelio p"); // Ajustar si cambia la estructura de la web

        // Extraemos el texto y la fuente
        if (evangelioElement) {
            document.getElementById("texto-evangelio").textContent = evangelioElement.textContent;
            document.getElementById("fuente-evangelio").href = url;
        } else {
            throw new Error("⚠️ No se pudo encontrar el evangelio en la página.");
        }

        console.log("✅ Evangelio cargado correctamente.");
    } catch (error) {
        console.error("❌ Error al obtener el evangelio:", error);
        document.getElementById("texto-evangelio").textContent = "No se pudo cargar el evangelio.";
        document.getElementById("fuente-evangelio").href = "#";
    }
}

// ================== INICIALIZAR AL CARGAR LA PÁGINA ==================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("texto-evangelio")) {
        obtenerEvangelioDesdeVaticanNews();
    }
});

// ================== SUSCRIPCIÓN AL EVANGELIO ==================
document.getElementById("form-suscripcion").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;

    // Simulación de suscripción (debería conectarse con Mailchimp o una base de datos)
    console.log(`📩 Nuevo suscriptor: ${email}`);

    // Mostrar mensaje de éxito
    document.getElementById("mensaje").textContent = "¡Gracias por suscribirte! Pronto recibirás el evangelio diario.";
    document.getElementById("form-suscripcion").reset();

    // Redirigir a página de confirmación (opcional)
    // window.location.href = "/gracias/";
});

// ================== INICIALIZAR AL CARGAR LA PÁGINA ==================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("texto-evangelio")) {
        obtenerEvangelio();
    }
});
