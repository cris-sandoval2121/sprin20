import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import api from "../utils/api";
import { checkToken, signIn, signUp } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [token, setToken] = useState(() => localStorage.getItem("jwt") || "");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAuthReady, setIsAuthReady] = useState(
    () => !localStorage.getItem("jwt"),
  );

  const [tooltip, setTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });

  // Comprueba el token guardado al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (!storedToken) {
      return;
    }

    // Configuramos el token para las peticiones de la API
    api.setToken(storedToken);

    checkToken(storedToken)
      .then(({ data }) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Token inválido:", error);

        localStorage.removeItem("jwt");
        api.setToken("");
        setToken("");
        setCurrentUser({});
        setCards([]);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthReady(true);
      });
  }, []);

  // Carga los datos reales del usuario y las tarjetas
  // después de confirmar que el usuario está autenticado
  useEffect(() => {
    if (!isLoggedIn || !token) {
      return;
    }

    api.setToken(token);

    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser((currentUser) => ({
  ...currentUser,
  ...(userData.data || userData),
}));
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });

    api
      .getCardList()
      .then((cardsData) => {
        setCards(cardsData.data || cardsData);
      })
      .catch((error) => {
        console.error("Error al obtener las tarjetas:", error);
      });
  }, [isLoggedIn, token]);

  const handleOpenPopup = (popupName, card = null) => {
    setSelectedCard(card);
    setActivePopup(popupName);
  };

  const handleClosePopup = () => {
    setActivePopup("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleCardLike = (card) => {
    const isLiked = Boolean(card.isLiked);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        console.error("Error al cambiar el like:", error);
      });
  };

  const handleCardDelete = (card) => {
    setCardToDelete(card);
    handleOpenPopup("confirm-delete");
  };

  const handleConfirmDeleteCard = () => {
    if (!cardToDelete) {
      return;
    }

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== cardToDelete._id),
        );

        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al agregar la tarjeta:", error);
      });
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await signIn(credentials);
      const { token: newToken } = response;

      // Guardar token
      localStorage.setItem("jwt", newToken);

      // Configurar API
      api.setToken(newToken);

      // Actualizar estado
      setToken(newToken);

      // Obtener información del usuario
      const userResponse = await checkToken(newToken);

      setCurrentUser(userResponse.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const handleRegister = async (credentials) => {
    try {
      await signUp(credentials);

      setTooltip({
        isOpen: true,
        isSuccess: true,
        message: "¡Registro exitoso! Ya puedes iniciar sesión.",
      });
    } catch (error) {
      console.error("Error al registrarse:", error);
      throw error;
    }
  };

  const handleCloseTooltip = () => {
    setTooltip((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");

    api.setToken("");

    setToken("");
    setCurrentUser({});
    setCards([]);
    setIsLoggedIn(false);

    setTooltip({
      isOpen: false,
      isSuccess: false,
      message: "",
    });
  };

  if (!isAuthReady) {
    return null;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            isLoggedIn={isLoggedIn}
            userEmail={currentUser.email || ""}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register onRegister={handleRegister} />
                )
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    onCardClick={(card) => handleOpenPopup("image", card)}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditAvatarClick={() => handleOpenPopup("edit-avatar")}
                    onEditProfileClick={() => handleOpenPopup("edit-profile")}
                    onAddPlaceClick={() => handleOpenPopup("new-card")}
                    activePopup={activePopup}
                    selectedCard={selectedCard}
                    onClosePopup={handleClosePopup}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onConfirmDeleteCard={handleConfirmDeleteCard}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>

          <InfoTooltip
            isOpen={tooltip.isOpen}
            isSuccess={tooltip.isSuccess}
            message={tooltip.message}
            onClose={handleCloseTooltip}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
