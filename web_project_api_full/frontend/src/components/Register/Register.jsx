import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onRegister(formValue);
      setFormValue({ email: "", password: "" });
    } catch (registerError) {
      setError(
        typeof registerError === "string"
          ? registerError
          : registerError?.message || "No se pudo completar el registro.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-card__title">Regístrate</h1>
        <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
          <input
            className="auth-card__input"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth-card__input"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          {error ? <p className="auth-card__error">{error}</p> : null}
          <button
            className="auth-card__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
          <p className="auth-card__link">
            ¿Ya tienes una cuenta? <Link to="/signin">Inicia sesión</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;
