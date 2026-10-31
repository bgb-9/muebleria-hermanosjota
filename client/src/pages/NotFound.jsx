import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="catalog">
      <div className="catalog__inner">
        <h1>Página no encontrada</h1>
        <p>La dirección que buscás no existe.</p>
        <Link to="/" className="btn btn--primary">Volver al inicio</Link>
      </div>
    </section>
  )
}

export default NotFound