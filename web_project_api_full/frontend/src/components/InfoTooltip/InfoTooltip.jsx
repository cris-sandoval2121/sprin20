import Popup from "../Popup/Popup";

function InfoTooltip({ isOpen, isSuccess, message, onClose }) {
  return (
    <Popup title="" isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </div>
        <p className="info-tooltip__text">{message}</p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
