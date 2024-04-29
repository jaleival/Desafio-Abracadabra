// Crear una instancia de Express.
const express = require("express");
const app = express();

// Definir el puerto en el que escucha el servidor.
const port = 3000;

// Middleware para servir archivos estáticos desde la carpeta "assets".
app.use(express.static("assets"));

// Crear una ruta para la página principal.
app.get("/", (req, res) => {
  res.send("Bienvenido a la pagina principal");
});

// Ruta para obtener los JSON.
app.get("/abracadabra/usuarios", (req, res) => {
  res.json({ usuarios });
});

// Arreglos de usuarios para mostrarlos en la página principal.
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "María",
  "Ignacia",
  "Javier",
  "Bryan",
];

// Middleware para verificar si el usuario existe.
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const user = req.params.usuario;
  const isUser = usuarios
    .map((u) => u.toLowerCase())
    .includes(user.toLowerCase());
  isUser ? next() : res.sendFile(__dirname + "/assets/img/who.jpeg");
});

// Ruta para el juego del abracadabra con el usuario ingresado.
app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Ruta para el juego del abracadabra con el usuario ingresado y el número aleatorio.
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = parseInt(req.params.n);
  const numero = Math.floor(Math.random() * (5 - 1)) + 1;
  if (n === numero) {
    res.sendFile(__dirname + "/assets/img/conejito.jpg");
  } else {
    res.sendFile(__dirname + "/assets/img/voldemort.jpg");
  }
});

// Ruta para manejar cualquiero otra solicitud que no exista
app.get("*", (req, res) => {
  res.send("<center><h1>Esta página no existe</h1></center>");
});

// Iniciar el servidor HTTP en el puerto especificado.
app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);