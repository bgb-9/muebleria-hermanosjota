import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../api/api.js'
import ProductCard from '../components/ProductCard.jsx'

function Home({ onAddToCart }) {
  const [destacados, setDestacados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getProductos()
        setDestacados(data.slice(0, 3))
      } catch (fetchError) {
        setError(fetchError.message || 'No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }

    loadFeatured()
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">Muebles con oficio, alma de los sesenta y mirada de mañana</h1>
          <p className="hero__subtitle">
            En Hermanos Jota cada pieza cuenta la historia de manos expertas y materiales nobles.
            Diseñamos con el optimismo cálido de los 60 y la sustentabilidad de 2026.
          </p>
          <Link to="/productos" className="btn btn--primary">Ver productos</Link>
        </div>
      </section>

      <section className="featured" aria-labelledby="destacados-titulo">
        <div className="featured__inner">
          <h2 id="destacados-titulo" className="featured__title">Piezas destacadas</h2>
          {loading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading-state__spinner" aria-hidden="true" />
              <span>Cargando productos...</span>
            </div>
          ) : error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <div className="featured__grid">
              {destacados.map((producto) => (
                <ProductCard
                  key={producto._id}
                  producto={producto}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="heritage" aria-labelledby="herencia-viva-titulo">
        <div className="heritage__inner">
          <h2 id="herencia-viva-titulo" className="heritage__title">Programa Herencia Viva</h2>
          <p className="heritage__desc">
            Un mueble nuestro no se despide en la entrega: lo acompañamos para que envejezca con
            dignidad y pueda pasar de una generación a otra.
          </p>
          <ul className="heritage__list">
            <li>Garantía de 10 años sobre cada pieza.</li>
            <li>Servicio de restauración en nuestra Casa Taller.</li>
            <li>Taller de cuidados para que aprendas a mimar la madera en casa.</li>
            <li>Recompra garantizada cuando la historia de esa pieza pida un nuevo capítulo.</li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Home