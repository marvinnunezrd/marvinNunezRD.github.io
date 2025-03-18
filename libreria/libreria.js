document.addEventListener("DOMContentLoaded", async function () {
    const storeContainer = document.getElementById("productos-container"); // ID corregido

    if (!storeContainer) {
        console.error("❌ No se encontró el contenedor de productos.");
        return;
    }

    try {
        // Llamamos al backend en Render
        const response = await fetch("https://printful-api-proxy.onrender.com/api/products");

        if (!response.ok) {
            throw new Error(`❌ Error en la API: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.result || data.result.length === 0) {
            storeContainer.innerHTML = "<p>⚠️ No hay productos disponibles en este momento.</p>";
            return;
        }

        // Construcción dinámica de productos
        let productsHTML = "";
        data.result.forEach(product => {
            productsHTML += `
                <div class="product">
                    <img src="${product.thumbnail_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <a href="https://www.printful.com/dashboard/store/products/${product.id}" target="_blank" class="buy-button">Ver Producto</a>
                </div>
            `;
        });

        storeContainer.innerHTML = productsHTML;
    } catch (error) {
        console.error("❌ Error al cargar los productos:", error);
        storeContainer.innerHTML = "<p>⚠️ Hubo un problema al cargar los productos. Inténtalo más tarde.</p>";
    }
});
