function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const isLiked = Boolean(card.isLiked);

  const likeButtonClassName = `card__like-button${
    isLiked ? " card__like-button_is-active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="card">
      <button
        className="card__image-button"
        type="button"
        aria-label={`Ver ${card.name}`}
        onClick={handleCardClick}
      >
        <img className="card__image" src={card.link} alt={card.name} />
      </button>

      <button
        aria-label={`Eliminar tarjeta ${card.name}`}
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>

      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <button
          aria-label={
            isLiked
              ? `Quitar me gusta a ${card.name}`
              : `Dar me gusta a ${card.name}`
          }
          className={likeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}

export default Card;
