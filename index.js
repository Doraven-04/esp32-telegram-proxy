const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let lastMessage = null;

// Endpoint que recibe los mensajes de Telegram
app.post("/telegram", (req, res) => {
  lastMessage = req.body;
  console.log("Mensaje recibido:", lastMessage);
  res.sendStatus(200);
});

// Endpoint para que el ESP32 consulte el último mensaje
app.get("/esp32", (req, res) => {
  res.json(lastMessage || {});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
