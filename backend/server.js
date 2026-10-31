require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const productosRouter = require("./routes/productos");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas
app.use("/api/productos", productosRouter);

// Manejador de 404 (ninguna ruta anterior coincidió)
app.use((req, res) => {
	res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
	if (err.name === "ValidationError") {
		return res.status(400).json({ error: err.message });
	}
	if (err.type === "entity.parse.failed") {
		return res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido" });
	}
	console.error(err.stack);
	res.status(500).json({ error: "Error interno del servidor" });
});
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en http://localhost:${PORT}`);
	});
});