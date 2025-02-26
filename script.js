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
function openTab(event, platform) {
    // Ocultar todo el contenido de las pestañas
    var tabContent = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Remover la clase 'active' de todos los botones de pestañas
    var tabLinks = document.getElementsByClassName('tab-link');
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
    }

    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(platform).style.display = 'block';
    // Añadir la clase 'active' al botón de la pestaña seleccionada
    event.currentTarget.classList.add('active');
}

// ================== INICIALIZAR FUNCIONES AL CARGAR LA PÁGINA ==================
document.addEventListener("DOMContentLoaded", () => {
    cargarEventos();  // Cargar eventos de Google Calendar
});
