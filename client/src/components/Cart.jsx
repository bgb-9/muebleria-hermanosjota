import { currency } from '../utils/format.js'

function Cart({ open, onClose, carrito, onCambiarCantidad, onEliminar, total }) {
  return (
    <aside className={`cart-sidebar ${open ? 'cart-sidebar--open' : ''}`} aria-label="Carrito de compras">
      <div className="cart-sidebar__header">
        <h2>Tu carrito</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar carrito">×</button>
      </div>

      <ul className="cart-items">
        {carrito.length === 0 ? (
          <li className="cart-empty">Tu carrito está vacío.</li>
        ) : (
          carrito.map((item) => (
            <li key={item._id} className="cart-item">
              <div>
                <strong>{item.nombre}</strong>
                <span>{currency.format(item.precio)} c/u</span>
              </div>
              <div className="cart-item__controls">
                <button
                  type="button"
                  onClick={() => onCambiarCantidad(item._id, -1)}
                  aria-label={`Restar ${item.nombre}`}
                >
                  -
                </button>
                <span>{item.cantidad}</span>
                <button
                  type="button"
                  onClick={() => onCambiarCantidad(item._id, 1)}
                  aria-label={`Sumar ${item.nombre}`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onEliminar(item._id)}
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="cart-sidebar__total">
        <span>Total</span>
        <strong>{currency.format(total)}</strong>
      </div>
    </aside>
  )
}

export default Cart