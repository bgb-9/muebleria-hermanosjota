import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { crearProducto } from '../api/api.js'
import ProductForm from '../components/ProductForm.jsx'

function AdminCrearProducto() {
  const navigate = useNavigate()
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (datos) => {
    try {
      setGuardando(true)
      setError('')
      await crearProducto(datos)
      navigate('/admin', {
        state: { mensaje: `Producto "${datos.nombre}" creado correctamente.` }
      })
    } catch (submitError) {
      setError(submitError.message || 'No se pudo crear el producto. Intentá nuevamente.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="page-header__inner">
          <h1 className="page-header__title">Nuevo producto</h1>
          <p className="page-header__subtitle">Sumá una pieza nueva al catálogo de la mueblería.</p>
        </div>
      </section>

      <section className="admin">
        <div className="admin__inner">
          <Link to="/admin" className="admin__breadcrumb">← Volver al panel</Link>
          <div className="admin-card">
            <ProductForm
              onSubmit={handleSubmit}
              submitLabel="Crear producto"
              saving={guardando}
              error={error}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminCrearProducto
