const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let messages = []; // Cola de mensajes pendientes

// Endpoint para recibir mensajes de Telegram
app.post("/telegram", (req, res) => {
  const msg = req.body.text || "";
  if (msg) {
    messages.push(msg); // Guardar mensaje en la cola
    console.log("Mensaje recibido:", msg);
  }
  res.sendStatus(200);
});

// Endpoint HTTP para que ESP32 consulte mensajes
app.get("/esp32", (req, res) => {
  if (messages.length === 0) return res.send("No hay mensajes");
  const msg = messages.shift(); // Saca el primer mensaje de la cola
  res.send(msg);                // Devuelve solo el texto
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy HTTP activo en puerto ${PORT}`));
