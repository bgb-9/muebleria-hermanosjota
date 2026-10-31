require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const productos = require("./data/productos");

const seed = async () => {
	await connectDB();

	const docs = productos.map(({ nombre, descripcion, precio, imagen }) => ({
		nombre,
		descripcion,
		precio,
		stock: 10,
		imageUrl: `/${imagen}`
	}));

	await Product.deleteMany({});
	await Product.insertMany(docs);

	console.log(`${docs.length} productos cargados`);
	await mongoose.connection.close();
};

seed().catch((error) => {
	console.error("Error al cargar productos:", error.message);
	process.exit(1);
});