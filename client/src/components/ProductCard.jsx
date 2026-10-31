import { Link } from 'react-router-dom'
import { currency, getImageSource } from '../utils/format.js'

function ProductCard({ producto, onAddToCart }) {
  return (
    <article className="product-card">
      <img
        src={getImageSource(producto.imageUrl)}
        alt={producto.nombre}
        className="product-card__img"
      />
      <div className="product-card__body">
        <h3 className="product-card__title">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="product-card__desc">{producto.descripcion}</p>
        )}
        <div className="product-card__footer">
          <p className="product-card__price">{currency.format(producto.precio)}</p>
          <div className="product-card__actions">
            <Link to={`/productos/${producto._id}`} className="btn btn--secondary">
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