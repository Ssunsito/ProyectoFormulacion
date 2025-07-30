import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validar dominio del correo
    if (!email.endsWith('@epn.edu.ec')) {
      setError('El correo debe pertenecer al dominio @epn.edu.ec');
      return;
    }

    setError('');
    console.log('Email:', email, 'Password:', password);
    // Simulando autenticación exitosa
    navigate('/Dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="app-title">PoliMarket</h1>
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="tu@epn.edu.ec"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="register-text">
          ¿No tienes cuenta? <a href="#">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;