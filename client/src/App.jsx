import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cart from './components/Cart.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import ProductList from './components/ProductList.jsx'
import AdminCrearProducto from './pages/AdminCrearProducto.jsx'
import AdminEditarProducto from './pages/AdminEditarProducto.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

const CART_KEY = 'hermanos-jota-carrito-v2'

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function App() {
  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  // Al cambiar de ruta, volver arriba de la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item._id === product._id)
      if (existingItem) {
        return currentCart.map((item) => (
          item._id === product._id ? { ...item, cantidad: item.cantidad + 1 } : item
        ))
      }
      return [...currentCart, { ...product, cantidad: 1 }]
    })
    setCartOpen(true)
  }

  const changeQuantity = (productId, delta) => {
    setCart((currentCart) => currentCart
      .map((item) => (item._id === productId ? { ...item, cantidad: item.cantidad + delta } : item))
      .filter((item) => item.cantidad > 0))
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item._id !== productId))
  }

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0)
  const cartTotal = cart.reduce((total, item) => total + item.precio * item.cantidad, 0)

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen((isOpen) => !isOpen)}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/productos" element={<ProductList onAddToCart={addToCart} />} />
          <Route path="/productos/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          <Route path="/contacto" element={<ContactForm />} />
          <Route path="/admin/crear-producto" element={<AdminCrearProducto />} />
          <Route path="/admin/editar-producto/:id" element={<AdminEditarProducto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        carrito={cart}
        onCambiarCantidad={changeQuantity}
        onEliminar={removeFromCart}
        total={cartTotal}
      />
    </div>
  )
}

export default App