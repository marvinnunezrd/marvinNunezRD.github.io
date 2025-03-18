console.log("🔑 API Token:", process.env.API_TOKEN);
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Habilitar CORS
app.use(cors({
    origin: "*", // Permitir solicitudes desde cualquier origen
    methods: ["GET"], // Solo permitimos GET
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/api/products", async (req, res) => {
    try {
        const response = await fetch("https://api.printful.com/sync/products", {
            headers: {
                "Authorization": `Bearer ${process.env.API_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API de Printful: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
