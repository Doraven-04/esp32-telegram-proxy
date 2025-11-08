const express = require('express');
const app = express();
app.use(express.json()); // para leer JSON en POST

// 🔹 Aquí guardamos los mensajes que llegan
let messages = [];

// 🔹 Endpoint que recibe mensajes de Make/Telegram
app.post('/webhook', (req, res) => {
  const msg = req.body.text || '';
  if(msg) {
    messages.push(msg);          // Guardamos el mensaje
    console.log('Mensaje recibido:', msg); // Lo vemos en los logs de Render
  }
  res.sendStatus(200);          // Confirmamos recepción
});

// 🔹 Endpoint que el ESP32 consultará vía HTTP
app.get('/esp32', (req, res) => {
  if(messages.length === 0) {
    return res.send('No hay mensajes'); // Si no hay mensajes
  }
  const msg = messages.shift();  // Sacamos el primer mensaje
  res.send(msg);                 // Lo enviamos al ESP32
});

// 🔹 Puerto que usa Render automáticamente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
