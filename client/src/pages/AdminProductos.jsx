import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { eliminarProducto, getProductos } from '../api/api.js'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { currency, getImageSource } from '../utils/format.js'

const stockBadge = (stock = 0) => {
  if (stock <= 0) return { clase: 'badge badge--out', texto: 'Sin stock' }
  if (stock <= 3) return { clase: 'badge badge--low', texto: `Últimas ${stock}` }
  return { clase: 'badge badge--ok', texto: `${stock} en stock` }
}

function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [aEliminar, setAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const cargarProductos = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getProductos()
      setProductos(data)
    } catch (fetchError) {
      setError(fetchError.message || 'No se pudo cargar el listado de productos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarProductos()
  }, [cargarProductos])

  // Mensaje de éxito que llega desde el alta o la edición
  useEffect(() => {
    if (location.state?.mensaje) {
      setAviso(location.state.mensaje)
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location, navigate])

  const confirmarEliminar = async () => {
    if (!aEliminar) return

    try {
      setEliminando(true)
      setError('')
      await eliminarProducto(aEliminar._id)
      setAviso(`Se eliminó "${aEliminar.nombre}" del catálogo.`)
      setAEliminar(null)
      // Refrescamos el listado para que refleje la baja
      await cargarProductos()
    } catch (deleteError) {
      setError(deleteError.message || 'No se pudo eliminar el producto. Intentá nuevamente.')
      setAEliminar(null)
    } finally {
      setEliminando(false)
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="page-header__inner">
          <h1 className="page-header__title">Panel de administración</h1>
          <p className="page-header__subtitle">
            Alta, edición y baja de las piezas del catálogo.
          </p>
        </div>
      </section>

      <section className="admin">
        <div className="admin__inner">
          <div className="admin__toolbar">
            <div>
              <h2 className="admin__title">Productos</h2>
              <p className="admin__subtitle">
                {loading ? 'Cargando catálogo...' : `${productos.length} producto${productos.length === 1 ? '' : 's'} en el catálogo.`}
              </p>
            </div>
            <Link to="/admin/crear-producto" className="btn btn--primary">Nuevo producto</Link>
          </div>

          {aviso && (
            <p className="alert alert--success" role="status">{aviso}</p>
          )}

          {error && (
            <p className="alert alert--error" role="alert">
              <span>{error}</span>
              <button type="button" className="alert__link" onClick={cargarProductos}>
                Reintentar
              </button>
            </p>
          )}

          {loading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading-state__spinner" aria-hidden="true" />
              <span>Cargando productos...</span>
            </div>
          ) : productos.length === 0 ? (
            <div className="admin-empty">
              <p>Todavía no hay productos cargados.</p>
              <Link to="/admin/crear-producto" className="btn btn--secondary">
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <caption className="sr-only">
                  Listado de productos con acciones de edición y eliminación
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col" className="admin-table__actions-header">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => {
                    const badge = stockBadge(producto.stock)
                    return (
                      <tr key={producto._id}>
                        <td>
                          <div className="admin-table__product">
                            <img
                              className="admin-table__thumb"
                              src={getImageSource(producto.imageUrl)}
                              alt=""
                              loading="lazy"
                            />
                            <div>
                              <span className="admin-table__name">{producto.nombre}</span>
                              <span className="admin-table__meta">
                                {producto.descripcion || 'Sin descripción'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="admin-table__price">{currency.format(producto.precio)}</td>
                        <td>
                          <span className={badge.clase}>{badge.texto}</span>
                        </td>
                        <td>
                          <div className="admin-table__actions">
                            <Link
                              to={`/admin/editar-producto/${producto._id}`}
                              className="btn btn--secondary btn--sm"
                              aria-label={`Editar ${producto.nombre}`}
                            >
                              Editar
                            </Link>
                            <button
                              type="button"
                              className="btn btn--danger btn--sm"
                              onClick={() => setAEliminar(producto)}
                              aria-label={`Eliminar ${producto.nombre}`}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(aEliminar)}
        title="Eliminar producto"
        message={aEliminar
          ? `¿Querés eliminar "${aEliminar.nombre}"? Esta acción no se puede deshacer.`
          : ''}
        busy={eliminando}
        onConfirm={confirmarEliminar}
        onCancel={() => setAEliminar(null)}
      />
    </>
  )
}

export default AdminProductos
