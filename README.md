# 🪑 Mueblería Hermanos Jota - E-commerce

## 📖 Descripción

Mueblería Hermanos Jota es una plataforma e-commerce full stack: frontend en React, backend propio con Node.js y Express, y persistencia de datos en MongoDB Atlas. El frontend consume una API REST para obtener y gestionar el catálogo de productos, simulando una experiencia de compra real con carrito y formulario de contacto.

## 🛠️ Tecnologías Utilizadas

**Frontend**

- React (creado con Vite)
- Componentes: Navbar, Footer, ProductCard, ProductList, ProductDetail, Cart, ContactForm
- Hooks (`useState`, `useEffect`) para manejo de estado, formularios controlados y carga de datos
- Consumo de API mediante `fetch`, con manejo de estados de carga y error

**Backend**

- Node.js + Express
- MongoDB Atlas con Mongoose (esquema `Product` con validaciones)
- API REST con CRUD completo, rutas modulares con `express.Router()`
- Variables de entorno con `dotenv`
- Middleware de logging personalizado y middleware `cors`
- Manejo de errores centralizado (400, 404 y errores generales)

## 🌐 Despliegues

| Parte | Plataforma | Enlace |
|-------|------------|--------|
| Backend (API) | Render | https://muebleria-hermanosjota-api.onrender.com/api/productos |
| Frontend | Vercel / Netlify | *(completar cuando esté desplegado)* |

> **Nota:** el backend usa el plan gratuito de Render, que se "duerme" tras 15 minutos sin uso. La primera petición después de un rato puede tardar alrededor de un minuto en responder.

## 🏗️ Arquitectura del Proyecto

```
/backend   → API REST con Node.js, Express y MongoDB (Mongoose)
/client    → Aplicación de React (frontend)
```

```
React (client)  ⇄  Express API (backend)  ⇄  MongoDB Atlas
```

Ambas partes son independientes, pero deben ejecutarse simultáneamente (en dos terminales separadas) para trabajar en local, ya que el frontend obtiene los datos mediante peticiones a la API.

## 🚀 Instalación y ejecución

### Backend (Express + MongoDB)

1. Entrá a la carpeta e instalá las dependencias:
   ```bash
   cd backend
   npm install
   ```

2. Creá un archivo `.env` dentro de `backend/`, copiando `.env.example`:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@TU_CLUSTER.mongodb.net/muebleria?retryWrites=true&w=majority
   ```
   Reemplazá `USUARIO`, `PASSWORD` y `TU_CLUSTER` por los datos de tu base en MongoDB Atlas. El archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio.

3. (Opcional) Cargá los 11 productos iniciales en la base:
   ```bash
   npm run seed
   ```
   Este comando vacía la colección antes de cargar, así que usalo solo para resetear los datos.

4. Iniciá el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   Queda disponible en `http://localhost:3001`.

**Variables de entorno del backend**

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas (obligatoria) |
| `PORT` | Puerto del servidor (opcional, por defecto 3001; Render lo define solo) |

**Endpoints disponibles**

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Lista todos los productos |
| GET | `/api/productos/:id` | Devuelve un producto por `_id` (400 si el id es inválido, 404 si no existe) |
| POST | `/api/productos` | Crea un producto (responde 201; `nombre` y `precio` son obligatorios) |
| PUT | `/api/productos/:id` | Actualiza un producto existente |
| DELETE | `/api/productos/:id` | Elimina un producto |

**Modelo `Product`:** `nombre` (String, requerido), `descripcion` (String), `precio` (Number, requerido), `stock` (Number), `imageUrl` (String).

### Frontend (React)

```bash
cd client
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## 🧩 Decisiones técnicas

**Backend**

- Persistencia: los datos se guardan en MongoDB Atlas y se accede a ellos con Mongoose, usando un esquema con validaciones (`nombre` y `precio` obligatorios, `precio` y `stock` no negativos).
- Seguridad de la configuración: la cadena de conexión vive en variables de entorno (`.env`) y no se sube al repositorio; se incluye un `.env.example` como guía.
- Middlewares:
  - `cors`: habilita que el frontend consuma la API desde otro origen.
  - `logger.js`: registra en consola el método HTTP y la URL de cada request.
  - `express.json()`: permite recibir datos JSON en el body de las peticiones POST y PUT.
  - `validarId`: rechaza con 400 los ids que no tienen formato válido de MongoDB.
- Manejo de errores: respuestas 400 para validaciones y JSON inválido, 404 para recursos y rutas inexistentes, y un manejador centralizado para errores inesperados.

**Frontend**

- Estado global (carrito, vista actual, producto seleccionado) centralizado en `App.jsx` y distribuido a los componentes hijos mediante props.
- El catálogo obtiene los datos con `fetch` desde la API, manejando estados de carga y error.

## 🛒 Funcionalidades Principales

- Catálogo de productos obtenido dinámicamente desde la API propia, con persistencia en MongoDB.
- API con CRUD completo de productos.
- Carrito de compras con contador visible en el Navbar.
- Formulario de contacto controlado con validación.
- Buscador de productos conectado al listado.

## 👥 Integrantes del Equipo

- Antonella Caminotti
- Bianca Gomez Baez
- Yasmin Rodriguez
- Ariadna Yael Fernandez