import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../ChatContext';
import './SellerDashboard.css';

function SellerDashboard() {
  const navigate = useNavigate();
  const { chats, addMessage } = useContext(ChatContext);

  // Lista de artículos publicados por el vendedor
  const sellerItems = [
    { id: 1, name: 'Arduino Uno', price: 15, description: 'Placa Arduino Uno original, ideal para proyectos.' },
    { id: 2, name: 'Resistencias 1kΩ (pack)', price: 1, description: 'Pack de 50 resistencias de 1kΩ.' },
    { id: 3, name: 'Sensor ultrasónico HC-SR04', price: 4, description: 'Sensor para medir distancias, nuevo.' },
    { id: 4, name: 'LEDs RGB (pack)', price: 3, description: 'Pack de 20 LEDs RGB para circuitos.' },
  ];

  const [newMessage, setNewMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedItem) {
      const sellerMessage = {
        sender: 'seller',
        text: newMessage,
        timestamp: new Date(),
      };
      addMessage(selectedItem.id, sellerMessage);
      setNewMessage('');
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="seller-dashboard-container">
      <h1 className="seller-dashboard-title">PoliMarket - Modo Vendedor</h1>
      <div className="seller-content">
        {/* Lista de artículos publicados */}
        <div className="items-section">
          <h2 className="section-title">Mis Artículos Publicados</h2>
          <div className="items-grid">
            {sellerItems.map((item) => (
              <div
                key={item.id}
                className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">${item.price}</p>
                <p className="item-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="chat-section">
          <h2 className="section-title">Chat con Interesados</h2>
          {selectedItem ? (
            <div className="chat-box">
              <div className="chat-messages">
                {(chats[selectedItem.id] || [])
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((msg, index) => (
                    <div
                      key={`msg-${index}`}
                      className={`message ${msg.sender === 'seller' ? 'seller-message' : 'buyer-message'}`}
                    >
                      <span className="message-sender">
                        {msg.sender === 'seller' ? 'Tú' : `Interesado (${msg.email})`}:
                      </span>{' '}
                      {msg.text}
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSendMessage} className="chat-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="chat-input"
                />
                <button type="submit" className="chat-button">
                  Enviar
                </button>
              </form>
            </div>
          ) : (
            <p className="chat-placeholder">Selecciona un artículo para ver los chats.</p>
          )}
        </div>
      </div>
      <div className="switch-button-container">
        <button
          onClick={() => navigate('/dashboard')}
          className="switch-button"
        >
          Cambiar a Modo Comprador
        </button>
        <button
          onClick={handleLogout}
          className="switch-button logout-button"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default SellerDashboard;