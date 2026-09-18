function RemoveCard({ onDeleteConfirm }) {
  return (
    <form className="popup__form" id="remove-card-form" noValidate>
      <p className="popup__description">¿Estás seguro de que deseas eliminar esta tarjeta?</p>
      <button
        className="popup__button popup__button_type_confirm"
        type="button"
        onClick={onDeleteConfirm}
      >
        Sí
      </button>
    </form>
  )
}

export default RemoveCard
