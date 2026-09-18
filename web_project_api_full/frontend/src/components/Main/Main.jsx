import { useContext } from 'react'
import avatarImage from '../../images/avatar.jpg'
import Card from '../Card/Card'
import Popup from '../Popup/Popup'
import EditProfile from '../EditProfile/EditProfile'
import EditAvatar from '../EditAvatar/EditAvatar'
import NewCard from '../NewCard/NewCard'
import RemoveCard from '../RemoveCard/RemoveCard'
import ImagePopup from '../ImagePopup/ImagePopup'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  activePopup,
  selectedCard,
  onClosePopup,
  onAddPlaceSubmit,
  onConfirmDeleteCard,
}) {
  const { currentUser } = useContext(CurrentUserContext)
  const profileName = currentUser.name || ''
  const profileAbout = currentUser.about || ''
  const profileAvatar = currentUser.avatar || avatarImage

  return (
    <main className="content">
      <section className="profile page__section">
        <button
          aria-label="Cambiar foto de perfil"
          className="profile__avatar-button"
          type="button"
          onClick={onEditAvatarClick}
        >
          <img
            className="profile__image"
            src={profileAvatar}
            alt={`Avatar de ${profileName || 'usuario'}`}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{profileName}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__description">{profileAbout}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <Popup
        title="Editar perfil"
        isOpen={activePopup === 'edit-profile'}
        onClose={onClosePopup}
      >
        <EditProfile
          key={`${selectedCard?._id || 'guest'}-${activePopup === 'edit-profile'}`}
        />
      </Popup>

      <Popup
        title="Nuevo lugar"
        isOpen={activePopup === 'new-card'}
        onClose={onClosePopup}
      >
        <NewCard
          key={activePopup === 'new-card' ? 'new-card-open' : 'new-card-closed'}
          onAddPlaceSubmit={onAddPlaceSubmit}
        />
      </Popup>

      <Popup
        title="Cambiar foto de perfil"
        isOpen={activePopup === 'edit-avatar'}
        onClose={onClosePopup}
      >
        <EditAvatar isOpen={activePopup === 'edit-avatar'} />
      </Popup>

      <Popup
        title="Eliminar tarjeta"
        isOpen={activePopup === 'confirm-delete'}
        onClose={onClosePopup}
      >
        <RemoveCard onDeleteConfirm={onConfirmDeleteCard} />
      </Popup>

      <ImagePopup isOpen={activePopup === 'image'} onClose={onClosePopup}>
        {selectedCard ? (
          <>
            <img
              alt={selectedCard.name}
              className="popup__image"
              src={selectedCard.link}
            />
            <p className="popup__caption">{selectedCard.name}</p>
          </>
        ) : null}
      </ImagePopup>
    </main>
  )
}

export default Main
