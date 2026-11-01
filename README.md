# 🪑 Mueblería Hermanos Jota - E-commerce

## 📖 Descripción

Mueblería Hermanos Jota es una plataforma e-commerce full stack: frontend en React, backend propio con Node.js y Express, y persistencia de datos en MongoDB Atlas. El frontend consume una API REST para obtener y gestionar el catálogo de productos, con carrito de compras, formulario de contacto y ruteo entre páginas.

## 🌐 Despliegues

| Parte | Plataforma | Enlace |
|-------|------------|--------|
| Frontend | Vercel | https://muebleria-hermanosjota-olive.vercel.app/ |
| Backend (API) | Render | https://muebleria-hermanosjota-api.onrender.com/api/productos |

> **Nota:** el backend usa el plan gratuito de Render, que se "duerme" tras 15 minutos sin uso. La primera petición después de un rato puede tardar alrededor de un minuto en responder. Si el catálogo no carga al instante, abrir el enlace de la API y esperar a que responda.

## 🛠️ Tecnologías Utilizadas

**Frontend**

- React (creado con Vite)
- React Router DOM: rutas, rutas dinámicas con `useParams` y navegación con `NavLink`/`Link`
- Hooks (`useState`, `useEffect`) para estado, formularios controlados y carga de datos
- Consumo de la API con `fetch`, con manejo de estados de carga y error

**Backend**

- Node.js + Express
- MongoDB Atlas con Mongoose (esquema `Product` con validaciones)
- API REST con CRUD completo y rutas modulares con `express.Router()`
- Variables de entorno con `dotenv`
- Middleware de logging personalizado y middleware `cors`
- Manejo de errores centralizado (400, 404 y errores generales)

## 🏗️ Arquitectura del Proyecto

```
/backend   → API REST con Node.js, Express y MongoDB (Mongoose)
/client    → Aplicación de React (frontend)
```

```
React (client)  ⇄  Express API (backend)  ⇄  MongoDB Atlas
```

## 🚀 Instalación y ejecución en local

Para trabajar en local hay que correr el backend y el frontend a la vez, en dos terminales separadas.

### Backend (Express + MongoDB)

1. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```

2. Crear un archivo `.env` dentro de `backend/`, copiando `.env.example`:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@TU_CLUSTER.mongodb.net/muebleria?retryWrites=true&w=majority
   ```
   Reemplazar `USUARIO`, `PASSWORD` y `TU_CLUSTER` por los datos propios de MongoDB Atlas. El archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio.

3. (Opcional) Cargar los 11 productos iniciales en la base:
   ```bash
   npm run seed
   ```
   Este comando vacía la colección antes de cargar, así que debe usarse solo para resetear los datos.

4. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   Queda disponible en `http://localhost:3001`.

**Variables de entorno del backend**

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas (obligatoria) |
| `PORT` | Puerto del servidor (opcional, por defecto 3001; Render lo define solo) |

### Frontend (React + Vite)

1. Instalar dependencias:
   ```bash
   cd client
   npm install
   ```

2. Crear un archivo `.env` dentro de `client/`, copiando `.env.example`:
   ```
   VITE_API_URL=http://localhost:3001
   ```

3. Iniciar la aplicación:
   ```bash
   npm run dev
   ```
   Queda disponible en `http://localhost:3000`.

**Variables de entorno del frontend**

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | Dirección base del backend, sin barra final ni `/api/productos`. En local: `http://localhost:3001`. En producción: la URL de Render. |

> Las variables de Vite se incorporan al construir el sitio: si se cambian en Vercel, hay que volver a desplegar para que tomen efecto. En local, hay que reiniciar `npm run dev` después de editar el `.env`.

## ☁️ Despliegue

- **Backend en Render:** servicio web con *Root Directory* `backend`, comando de build `npm install` y de inicio `npm start`. Se carga la variable `MONGODB_URI` en el panel de Render. En MongoDB Atlas, el acceso de red permite conexiones desde cualquier IP (`0.0.0.0/0`) para que Render pueda conectarse.
- **Frontend en Vercel:** proyecto con *Root Directory* `client` y preset Vite. Se carga la variable `VITE_API_URL` con la URL del backend. El archivo `client/vercel.json` redirige todas las rutas a `index.html`, para que recargar en una ruta como `/productos/:id` no devuelva 404.

## 🔌 API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Lista todos los productos |
| GET | `/api/productos/:id` | Devuelve un producto por `_id` (400 si el id es inválido, 404 si no existe) |
| POST | `/api/productos` | Crea un producto (responde 201; `nombre` y `precio` son obligatorios) |
| PUT | `/api/productos/:id` | Actualiza un producto existente |
| DELETE | `/api/productos/:id` | Elimina un producto |

**Modelo `Product`:** `nombre` (String, requerido), `descripcion` (String), `precio` (Number, requerido), `stock` (Number), `imageUrl` (String).

## 🧭 Rutas del Frontend

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio, con productos destacados |
| `/productos` | Catálogo con buscador |
| `/productos/:id` | Detalle de un producto (usa `useParams`) |
| `/contacto` | Formulario de contacto |
| `/admin` | Panel de administración: listado con acciones de edición y baja |
| `/admin/crear-producto` | Alta de producto (formulario controlado con POST) |
| `/admin/editar-producto/:id` | Edición de producto (mismo formulario, con datos precargados y PUT) |

## 🧑‍💼 Panel de administración

Disponible en `http://localhost:3000/admin` (en producción, sobre la URL de Vercel). Reutiliza el mismo formulario controlado para el alta y la edición:

| Acción | Ruta | Llamada a la API |
|--------|------|------------------|
| Listar productos | `/admin` | `GET /api/productos` |
| Crear producto | `/admin/crear-producto` | `POST /api/productos` |
| Editar producto | `/admin/editar-producto/:id` | `PUT /api/productos/:id` |
| Eliminar producto | `/admin` (botón de la tabla) | `DELETE /api/productos/:id` |

- **Formulario compartido:** un único componente (`ProductForm`) maneja los campos `nombre`, `descripcion`, `precio`, `stock` e `imageUrl`, con validación previa al envío (nombre y precio obligatorios, números no negativos).
- **Alta:** al confirmar, hace `POST`, muestra el estado de guardado, informa errores de la API y navega al panel con `useNavigate` y un mensaje de éxito.
- **Edición:** carga el producto con `GET /api/productos/:id`, precarga los campos y guarda con `PUT`. Si el id no existe o es inválido, muestra el error de la API y un enlace para volver.
- **Baja:** el botón *Eliminar* abre un diálogo de confirmación; al aceptar hace `DELETE` y vuelve a pedir el listado, de modo que la tabla se refresca sin recargar la página.
- **Estados:** el panel contempla carga, error (con opción de reintentar), listado vacío y avisos de éxito. Los estilos de formularios, tabla, etiquetas de stock, botones y diálogo siguen la paleta y tipografías del manual de marca.

## 🧩 Decisiones técnicas

**Backend**

- Persistencia: los datos se guardan en MongoDB Atlas y se accede a ellos con Mongoose, con un esquema con validaciones (`nombre` y `precio` obligatorios, `precio` y `stock` no negativos).
- Configuración segura: la cadena de conexión vive en variables de entorno y no se sube al repositorio; se incluye un `.env.example` como guía.
- Middlewares:
  - `cors`: permite que el frontend consuma la API desde otro origen.
  - `logger.js`: registra en consola el método HTTP y la URL de cada request.
  - `express.json()`: permite recibir datos JSON en las peticiones POST y PUT.
  - `validarId`: rechaza con 400 los ids que no tienen formato válido de MongoDB.
- Errores: 400 para validaciones y JSON inválido, 404 para recursos y rutas inexistentes, y un manejador centralizado para errores inesperados.

**Frontend**

- Ruteo con React Router: cada pantalla es una ruta, y el detalle de producto lee el `id` de la URL con `useParams` y lo pide a la API.
- Todas las llamadas a la API pasan por un único módulo (`src/api/`), que toma la dirección de `VITE_API_URL`, de modo que el mismo código funciona en local y en producción.
- Estado del carrito centralizado en `App.jsx` y persistido en `localStorage`, para que sobreviva a recargas; el contador del Navbar se calcula a partir del carrito.
- Las pantallas manejan los estados de carga y de error, y el detalle contempla el caso de producto inexistente.
- El alta y la edición comparten un mismo formulario controlado, con validación en el cliente y mensajes de error por campo; la página que lo usa resuelve el `POST` o el `PUT` y navega al panel con `useNavigate`.
- La baja se confirma en un diálogo accesible antes del `DELETE`, y al terminar se vuelve a pedir el listado para reflejar el cambio sin recargar la página.
- El panel de administración usa las variables de color y las tipografías del manual de marca (siena tostado, verde salvia, alabastro cálido, vara de oro y rosa polvoriento; Inter y Playfair Display).

## 👥 Integrantes del Equipo

- Antonella Caminotti
- Bianca Gomez Baez
- Yasmin Rodriguez
- Ariadna Yael Fernandez