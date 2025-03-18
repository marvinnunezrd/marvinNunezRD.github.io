document.addEventListener("DOMContentLoaded", async function () {
    const storeContainer = document.getElementById("product-list");

    if (!storeContainer) {
        console.error("❌ No se encontró el contenedor de productos.");
        return;
    }

    try {
        // Hacemos la petición al backend en lugar de Printful directamente
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
                    <img src="${product.sync_product.thumbnail_url}" alt="${product.sync_product.name}">
                    <h3>${product.sync_product.name}</h3>
                    <p>Precio: $${product.sync_variants[0].retail_price}</p>
                    <a href="https://www.printful.com/dashboard/store/products/${product.id}" target="_blank" class="buy-button">Comprar</a>
                </div>
            `;
        });

        storeContainer.innerHTML = productsHTML;
    } catch (error) {
        console.error("❌ Error al cargar los productos:", error);
        storeContainer.innerHTML = "<p>⚠️ Hubo un problema al cargar los productos. Inténtalo más tarde.</p>";
    }
});
