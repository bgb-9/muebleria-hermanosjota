import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { currency, getImageSource } from '../utils/format.js'

// Convierte un producto de la API en valores aptos para inputs controlados
const toFormValues = (producto = {}) => ({
  nombre: producto.nombre ?? '',
  descripcion: producto.descripcion ?? '',
  precio: producto.precio ?? '',
  stock: producto.stock ?? '',
  imageUrl: producto.imageUrl ?? ''
})

const validarFormulario = (form) => {
  const errores = {}

  if (!form.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
  }

  if (form.precio === '') {
    errores.precio = 'El precio es obligatorio.'
  } else if (!Number.isFinite(Number(form.precio)) || Number(form.precio) < 0) {
    errores.precio = 'El precio debe ser un número mayor o igual a 0.'
  }

  if (form.stock !== '' && (!Number.isFinite(Number(form.stock)) || Number(form.stock) < 0)) {
    errores.stock = 'El stock debe ser un número mayor o igual a 0.'
  }

  return errores
}

/**
 * Formulario controlado, compartido por el alta y la edición de productos.
 * El envío a la API lo resuelve la página que lo usa mediante `onSubmit`.
 */
function ProductForm({
  initialValues,
  onSubmit,
  submitLabel = 'Guardar producto',
  saving = false,
  error = '',
  cancelTo = '/admin'
}) {
  const [form, setForm] = useState(() => toFormValues(initialValues))
  const [errores, setErrores] = useState({})
  const [previewFallida, setPreviewFallida] = useState(false)

  // Al cambiar la URL de la imagen, volvemos a intentar mostrarla
  useEffect(() => {
    setPreviewFallida(false)
  }, [form.imageUrl])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previo) => ({ ...previo, [name]: value }))

    // Si el campo tenía un error, lo limpiamos al escribir
    setErrores((previos) => {
      if (!previos[name]) return previos
      const { [name]: _descartado, ...resto } = previos
      return resto
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const erroresEncontrados = validarFormulario(form)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    onSubmit({
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: form.stock === '' ? 0 : Number(form.stock),
      imageUrl: form.imageUrl.trim()
    })
  }

  const precioValido = form.precio !== '' && Number.isFinite(Number(form.precio))
  const mostrarPreview = form.imageUrl.trim() !== '' && !previewFallida

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate aria-busy={saving}>
      {error && (
        <p className="alert alert--error" role="alert">{error}</p>
      )}

      <div className={`form-field${errores.nombre ? ' form-field--error' : ''}`}>
        <label htmlFor="nombre">Nombre *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="off"
          placeholder="Ej.: Aparador Uspallata"
          value={form.nombre}
          onChange={handleChange}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'nombre-error' : undefined}
        />
        {errores.nombre && (
          <p className="form-field__error" id="nombre-error">{errores.nombre}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="4"
          placeholder="Materiales, medidas y detalles de la pieza"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="product-form__grid">
        <div className={`form-field${errores.precio ? ' form-field--error' : ''}`}>
          <label htmlFor="precio">Precio (ARS) *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            placeholder="450000"
            value={form.precio}
            onChange={handleChange}
            aria-invalid={Boolean(errores.precio)}
            aria-describedby={errores.precio ? 'precio-error' : undefined}
          />
          {errores.precio ? (
            <p className="form-field__error" id="precio-error">{errores.precio}</p>
          ) : precioValido && (
            <p className="form-field__hint">{currency.format(Number(form.precio))}</p>
          )}
        </div>

        <div className={`form-field${errores.stock ? ' form-field--error' : ''}`}>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            placeholder="0"
            value={form.stock}
            onChange={handleChange}
            aria-invalid={Boolean(errores.stock)}
            aria-describedby={errores.stock ? 'stock-error' : 'stock-hint'}
          />
          {errores.stock ? (
            <p className="form-field__error" id="stock-error">{errores.stock}</p>
          ) : (
            <p className="form-field__hint" id="stock-hint">Si se deja vacío se guarda como 0.</p>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="imageUrl">Imagen (URL o ruta)</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          autoComplete="off"
          placeholder="/img/aparador-uspallata.png o https://..."
          value={form.imageUrl}
          onChange={handleChange}
          aria-describedby="imageUrl-hint"
        />
        <p className="form-field__hint" id="imageUrl-hint">
          Se aceptan rutas del proyecto que empiecen con /img/ o direcciones completas.
        </p>
        {mostrarPreview && (
          <img
            className="product-form__preview"
            src={getImageSource(form.imageUrl)}
            alt="Vista previa de la imagen del producto"
            onError={() => setPreviewFallida(true)}
          />
        )}
      </div>

      <div className="product-form__actions">
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Guardando...' : submitLabel}
        </button>
        <Link to={cancelTo} className="btn btn--secondary">Cancelar</Link>
        <span className="product-form__required-note">* Campos obligatorios</span>
      </div>
    </form>
  )
}

export default ProductForm
