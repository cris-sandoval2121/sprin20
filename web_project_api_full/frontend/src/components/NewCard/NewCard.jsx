import { useState } from 'react'

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'avif']

function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [nameError, setNameError] = useState('')
  const [linkError, setLinkError] = useState('')

  const validateTitle = (value) => value.trim().length > 3

  const validateImageUrl = (value) => {
    if (!value.trim()) return false

    try {
      const url = new URL(value)
      const pathname = url.pathname.toLowerCase()
      return (
        ['http:', 'https:'].includes(url.protocol) &&
        IMAGE_EXTENSIONS.some((extension) => pathname.endsWith(`.${extension}`))
      )
    } catch {
      return false
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedLink = link.trim()

    const nextNameError = validateTitle(trimmedName)
      ? ''
      : 'El título debe tener más de 3 caracteres.'
    const nextLinkError = validateImageUrl(trimmedLink)
      ? ''
      : 'Debe introducir una URL válida de una imagen.'

    setNameError(nextNameError)
    setLinkError(nextLinkError)

    if (nextNameError || nextLinkError) {
      return
    }

    onAddPlaceSubmit({ name: trimmedName, link: trimmedLink })
  }

  return (
    <form className="popup__form" id="new-card-form" noValidate onSubmit={handleSubmit}>
      <input
        id="card-title"
        className={`popup__input popup__input_type_card-name ${nameError ? 'popup__input_type_error' : ''}`}
        name="name"
        placeholder="Titulo"
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          setNameError('')
        }}
      />
      <span className={`popup__error ${nameError ? 'popup__error_visible' : ''}`} id="card-title-error" aria-live="polite">
        {nameError}
      </span>

      <input
        id="card-url"
        className={`popup__input popup__input_type_url ${linkError ? 'popup__input_type_error' : ''}`}
        name="link"
        placeholder="Enlace a la imagen"
        type="text"
        value={link}
        onChange={(event) => {
          setLink(event.target.value)
          setLinkError('')
        }}
      />
      <span className={`popup__error ${linkError ? 'popup__error_visible' : ''}`} id="card-url-error" aria-live="polite">
        {linkError}
      </span>

      <button className="popup__button" type="submit">
        Crear
      </button>
    </form>
  )
}

export default NewCard
