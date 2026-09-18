import { useContext, useEffect, useRef, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'avif']

function EditAvatar({ isOpen }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext)
  const avatarRef = useRef(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen && avatarRef.current) {
      avatarRef.current.value = ''
      setError('')
    }
  }, [isOpen])

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

    const input = avatarRef.current
    if (!input) return

    const value = input.value.trim()
    const nextError = validateImageUrl(value)
      ? ''
      : 'Debe introducir una URL válida de una imagen.'

    setError(nextError)

    if (nextError) {
      return
    }

    handleUpdateAvatar({ avatar: value })
  }

  return (
    <form className="popup__form" id="avatar-form" noValidate onSubmit={handleSubmit}>
      <input
        id="avatar-url"
        className={`popup__input popup__input_type_url ${error ? 'popup__input_type_error' : ''}`}
        name="avatar"
        placeholder="Enlace a la foto"
        type="text"
        ref={avatarRef}
        onChange={() => setError('')}
      />
      <span className={`popup__error ${error ? 'popup__error_visible' : ''}`} id="avatar-url-error" aria-live="polite">
        {error}
      </span>

      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}

export default EditAvatar
