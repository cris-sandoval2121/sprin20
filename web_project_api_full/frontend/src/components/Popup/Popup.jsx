import { useEffect } from 'react'

function Popup({ title, isOpen, onClose, children, isImage }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const popupClassName = `popup${isOpen ? ' popup_is-opened' : ''}`
  const contentClassName = isImage
    ? 'popup__content popup__content_content_image'
    : 'popup__content'

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={popupClassName}
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div className={contentClassName} role="dialog" aria-modal="true">
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {title ? <h3 className="popup__title">{title}</h3> : null}
        {children}
      </div>
    </div>
  )
}

export default Popup
