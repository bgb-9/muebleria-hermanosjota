import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProducto } from '../api/api.js'
import { currency, getImageSource } from '../utils/format.js'

function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getProducto(id)
        if (!cancelled) setProducto(data)
      } catch (fetchError) {
        if (!cancelled) setError(fetchError.message || 'No se pudo cargar el producto.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProduct()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <section className="product-detail">
        <div className="loading-state" role="status" aria-live="polite">
          <span className="loading-state__spinner" aria-hidden="true" />
          <span>Cargando producto...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="product-detail">
        <div className="product-detail__inner">
          <div>
            <p className="error-message">Error: {error}</p>
            <Link to="/productos" className="btn btn--secondary">Volver al catálogo</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <article className="product-detail">
      <div className="product-detail__inner">
        <img
          src={getImageSource(producto.imageUrl)}
          alt={producto.nombre}
          className="product-detail__img"
        />
        <div className="product-detail__info">
          <h1 className="product-detail__title">{producto.nombre}</h1>
          <p className="product-detail__price">{currency.format(producto.precio)}</p>
          {producto.descripcion && (
            <p className="product-detail__desc">{producto.descripcion}</p>
          )}
          <p className="product-detail__desc">
            {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock por el momento'}
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onAddToCart(producto)}
          >
            Agregar al carrito
          </button>
          <Link to="/productos" className="btn btn--secondary">
            Volver al listado
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductDetail