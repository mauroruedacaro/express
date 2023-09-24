const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Endpoint 1: Respond with a simple message
app.get("/api/", (req, res) => {
    res.status(200).json({ mensaje: "Hola mundo" });
});

// Endpoint 2: Sum two numbers from query parameters
app.get("/api/suma", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
    res
        .status(400)
        .json({ error: "Los parámetros num1 y num2 deben ser números válidos." });
    } else {
    const resultado = num1 + num2;
    res.status(200).json({ resultado });
    }
});

// Endpoint 3: Get user name from URL parameters
app.get("/api/usuario/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    res.status(200).json({ usuario: nombre });
});

// Endpoint 4: Fetch a character from the Star Wars API
const axios = require("axios");
app.get("/api/swapi/:id", async (req, res) => {
    const id = req.params.id;

    try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    const personaje = response.data;
    res.status(200).json({ personaje });
    } catch (error) {
    res.status(404).json({ error: "Personaje no encontrado" });
    }
});

// Endpoint 5: Echo the request body for a PUT request
app.put("/api/body", (req, res) => {
    const requestBody = req.body;
    res.status(200).json(requestBody);
});

// Endpoint 6: Sum two numbers from the request body for a POST request
app.post("/api/suma", (req, res) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
    res
        .status(400)
        .json({
        error: "Los campos num1 y num2 en el cuerpo deben ser números válidos.",
        });
    } else {
    const resultado = num1 + num2;
    res.status(200).json({ resultado });
    }
});

// Endpoint 7: Delete an object based on ID
app.delete("/api/eliminar/:id", (req, res) => {
    const id = req.params.id;
    if (id === "3") {
        res.status(200).json({ mensaje: `Se ha eliminado el objeto con ID ${id}` });
    } else {
    res
        .status(404)
        .json({ error: "No se encontró el objeto con el ID especificado" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
