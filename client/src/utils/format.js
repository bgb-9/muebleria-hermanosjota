export const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

// Acepta rutas locales (/img/...), URLs completas (http...) o sin barra inicial.
// Si el producto no tiene imagen, usa el logo como reemplazo.
export const getImageSource = (imageUrl) => {
  if (!imageUrl) return '/img/logo.svg'
  if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) return imageUrl
  return `/${imageUrl}`
}