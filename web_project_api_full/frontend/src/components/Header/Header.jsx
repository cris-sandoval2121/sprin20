import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ isLoggedIn, userEmail, onSignOut }) {
  return (
    <header className="header page__section">
      <img src={logo} alt="Logotipo Around The U.S." className="header__logo" />

      {isLoggedIn ? (
        <div className="header__user-block">
          <span className="header__user-email">{userEmail}</span>
          <button type="button" className="header__button" onClick={onSignOut}>
            Salir
          </button>
        </div>
      ) : (
        <nav className="header__nav" aria-label="Navegación de autenticación">
          <Link className="header__link" to="/signup">
            Regístrate
          </Link>
          <Link className="header__link" to="/signin">
            Iniciar sesión
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
