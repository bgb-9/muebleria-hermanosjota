import { useState } from 'react'

function ContactForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
  e.preventDefault()
  console.log('Datos del formulario de contacto:', { nombre, email, mensaje })
  setEnviado(true)
}

  if (enviado) {
    return (
      <section className="contact" aria-labelledby="contacto-titulo">
        <div className="contact__inner">
          <h1 id="contacto-titulo" className="contact__title">Hablemos como en el taller</h1>
          <p className="contact__success" role="status">
            ¡Gracias por escribirnos! Recibimos tu consulta y te responderemos pronto.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="contact" aria-labelledby="contacto-titulo">
      <div className="contact__inner">
        <h1 id="contacto-titulo" className="contact__title">Hablemos como en el taller</h1>
        <p className="contact__intro">
          Somos asesores de confianza: te escuchamos, te contamos de maderas y oficios,
          y te ayudamos a elegir la pieza que va a vivir con vos. Si podés, visitanos
          en la Casa Taller: el café está listo y las puertas abiertas en San Cristóbal.
        </p>
        <p className="contact__intro">
          Escribinos con calma. No hay consulta chica cuando se trata de un mueble
          que va a durar décadas.
        </p>

        <form className="contact-form contact__form" onSubmit={handleSubmit}>
          <div className="contact-form__field">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              autoComplete="name"
              required
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="6"
              required
              value={mensaje}
              onChange={(event) => setMensaje(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn--primary btn--large">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
