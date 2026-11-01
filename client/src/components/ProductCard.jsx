import { Link } from 'react-router-dom'
import { currency, getImageSource } from '../utils/format.js'

function ProductCard({ producto, onAddToCart }) {
  const detalle = `/productos/${producto._id}`

  return (
    <article className="product-card">
      <Link to={detalle} className="product-card__img-link" tabIndex={-1} aria-hidden="true">
        <img
          src={getImageSource(producto.imageUrl)}
          alt={producto.nombre}
          className="product-card__img"
        />
      </Link>
      <div className="product-card__body">
        <h3 className="product-card__title">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="product-card__desc">{producto.descripcion}</p>
        )}
        <div className="product-card__footer">
          <p className="product-card__price">{currency.format(producto.precio)}</p>
          <div className="product-card__actions">
            <Link to={detalle} className="btn btn--secondary">
              Ver más
            </Link>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onAddToCart(producto)}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard