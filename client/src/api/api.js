import { API_URL } from '../config.js'

const request = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, options)

  if (!response.ok) {
    let message = 'No se pudo completar la solicitud.'
    try {
      const data = await response.json()
      if (data.error) message = data.error
    } catch {
      // la respuesta no era JSON, dejamos el mensaje por defecto
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return response.json()
}

const jsonHeaders = { 'Content-Type': 'application/json' }

export const getProductos = () => request('/api/productos')
export const getProducto = (id) => request(`/api/productos/${id}`)

export const crearProducto = (producto) => request('/api/productos', {
  method: 'POST',
  headers: jsonHeaders,
  body: JSON.stringify(producto)
})

export const actualizarProducto = (id, producto) => request(`/api/productos/${id}`, {
  method: 'PUT',
  headers: jsonHeaders,
  body: JSON.stringify(producto)
})

export const eliminarProducto = (id) => request(`/api/productos/${id}`, {
  method: 'DELETE'
})
