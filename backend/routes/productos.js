const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// Middleware de la ruta: rechaza ids que no tengan formato válido de Mongo
const validarId = (req, res, next) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).json({ error: "ID inválido" });
	}
	next();
};

// GET /api/productos → todos los productos
router.get("/", async (req, res, next) => {
	try {
		const productos = await Product.find().sort({ _id: 1 });
		res.json(productos);
	} catch (error) {
		next(error);
	}
});

// GET /api/productos/:id → un producto por _id
router.get("/:id", validarId, async (req, res, next) => {
	try {
		const producto = await Product.findById(req.params.id);
		if (!producto) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		res.json(producto);
	} catch (error) {
		next(error);
	}
});

// POST /api/productos → crea un producto (201)
router.post("/", async (req, res, next) => {
	try {
		const producto = await Product.create(req.body);
		res.status(201).json(producto);
	} catch (error) {
		next(error);
	}
});

// PUT /api/productos/:id → actualiza un producto existente
router.put("/:id", validarId, async (req, res, next) => {
	try {
		const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		if (!producto) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		res.json(producto);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/productos/:id → elimina un producto
router.delete("/:id", validarId, async (req, res, next) => {
	try {
		const producto = await Product.findByIdAndDelete(req.params.id);
		if (!producto) {
			return res.status(404).json({ error: "Producto no encontrado" });
		}
		res.json({ mensaje: "Producto eliminado", producto });
	} catch (error) {
		next(error);
	}
});

module.exports = router;