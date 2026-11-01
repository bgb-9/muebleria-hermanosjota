import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { actualizarProducto, getProducto } from '../api/api.js'
import ProductForm from '../components/ProductForm.jsx'

function AdminEditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const cargarProducto = async () => {
      try {
        setLoading(true)
        setErrorCarga('')
        const data = await getProducto(id)
        if (!cancelled) setProducto(data)
      } catch (fetchError) {
        if (!cancelled) setErrorCarga(fetchError.message || 'No se pudo cargar el producto.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    cargarProducto()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleSubmit = async (datos) => {
    try {
      setGuardando(true)
      setError('')
      await actualizarProducto(id, datos)
      navigate('/admin', {
        state: { mensaje: `Producto "${datos.nombre}" actualizado correctamente.` }
      })
    } catch (submitError) {
      setError(submitError.message || 'No se pudo actualizar el producto. Intentá nuevamente.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="page-header__inner">
          <h1 className="page-header__title">Editar producto</h1>
          <p className="page-header__subtitle">
            Los datos ya están precargados: modificá lo que necesites y guardá los cambios.
          </p>
        </div>
      </section>

      <section className="admin">
        <div className="admin__inner">
          <Link to="/admin" className="admin__breadcrumb">← Volver al panel</Link>

          {loading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading-state__spinner" aria-hidden="true" />
              <span>Cargando producto...</span>
            </div>
          ) : errorCarga ? (
            <div className="alert alert--error" role="alert">
              <span>{errorCarga}</span>
              <Link to="/admin" className="alert__link">Volver al panel</Link>
            </div>
          ) : (
            <div className="admin-card">
              <ProductForm
                key={producto._id}
                initialValues={producto}
                onSubmit={handleSubmit}
                submitLabel="Guardar cambios"
                saving={guardando}
                error={error}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default AdminEditarProducto
