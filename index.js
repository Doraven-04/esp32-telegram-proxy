const express = require("express");
const axios = require("axios"); // Para hacer la petición HTTPS
const app = express();

const RENDER_URL = "https://esp32-telegram-proxy.onrender.com/esp32"; // Tu Render original

// Endpoint que consulta el ESP32
app.get("/esp32", async (req, res) => {
  try {
    // Hacemos GET a Render HTTPS
    const response = await axios.get(RENDER_URL);
    res.send(response.data); // Devolvemos el contenido al ESP32
  } catch (error) {
    console.error("Error consultando Render:", error.message);
    res.status(500).send("Error al consultar Render");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy HTTP activo en puerto ${PORT}`));
