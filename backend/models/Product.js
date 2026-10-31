const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		nombre: { type: String, required: true, trim: true },
		descripcion: { type: String, trim: true },
		precio: { type: Number, required: true, min: 0 },
		stock: { type: Number, default: 0, min: 0 },
		imageUrl: { type: String, trim: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);