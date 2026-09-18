import { useContext, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name || '')
  const [description, setDescription] = useState(currentUser.about || '')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextNameError = name.trim().length > 4 ? '' : 'El nombre debe tener más de 4 caracteres.'
    const nextDescriptionError = description.trim().length > 5 ? '' : 'La descripción debe tener más de 5 caracteres.'

    setNameError(nextNameError)
    setDescriptionError(nextDescriptionError)

    if (nextNameError || nextDescriptionError) {
      return
    }

    handleUpdateUser({ name: name.trim(), about: description.trim() })
  }

  return (
    <form className="popup__form" id="edit-profile-form" noValidate onSubmit={handleSubmit}>
      <input
        id="owner-name"
        className={`popup__input popup__input_type_name ${nameError ? 'popup__input_type_error' : ''}`}
        name="userName"
        placeholder="Nombre"
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          setNameError('')
        }}
      />
      <span className={`popup__error ${nameError ? 'popup__error_visible' : ''}`} id="owner-name-error" aria-live="polite">
        {nameError}
      </span>

      <input
        id="owner-description"
        className={`popup__input popup__input_type_description ${descriptionError ? 'popup__input_type_error' : ''}`}
        name="userDescription"
        placeholder="Acerca de mi"
        type="text"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value)
          setDescriptionError('')
        }}
      />
      <span className={`popup__error ${descriptionError ? 'popup__error_visible' : ''}`} id="owner-description-error" aria-live="polite">
        {descriptionError}
      </span>

      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  )
}

export default EditProfile
