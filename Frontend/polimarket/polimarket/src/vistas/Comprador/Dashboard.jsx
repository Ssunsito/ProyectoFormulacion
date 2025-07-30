import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../ChatContext';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { chats, addMessage } = useContext(ChatContext);

  // Lista de artículos relacionados con ingeniería
  const initialItems = [
    { id: 1, name: 'Protoboard 830 puntos', price: 5, description: 'Protoboard de alta calidad para circuitos electrónicos.' },
    { id: 2, name: 'Sensor DHT11', price: 3, description: 'Sensor de temperatura y humedad, ideal para proyectos IoT.' },
    { id: 3, name: 'Potenciómetro 10kΩ', price: 1, description: 'Potenciómetro lineal para control de circuitos.' },
    { id: 4, name: 'Kit de cables Dupont', price: 2, description: 'Juego de 40 cables macho-hembra para conexiones.' },
  ];

  const [newMessage, setNewMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedItem) {
      const buyerMessage = {
        sender: 'buyer',
        text: newMessage,
        timestamp: new Date(),
        email: 'bryan.lugmania@epn.edu.ec',
      };
      addMessage(selectedItem.id, buyerMessage);
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">PoliMarket - MarketPlace</h1>
      <div className="marketplace-content">
        {/* Lista de artículos */}
        <div className="items-section">
          <h2 className="section-title">Artículos en Venta</h2>
          <div className="items-grid">
            {initialItems.map((item) => (
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
          <h2 className="section-title">Chat con el Vendedor</h2>
          {selectedItem ? (
            <div className="chat-box">
              <div className="chat-messages">
                {(chats[selectedItem.id] || [])
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((msg, index) => (
                    <div
                      key={`msg-${index}`}
                      className={`message ${msg.sender === 'buyer' ? 'buyer-message' : 'seller-message'}`}
                    >
                      <span className="message-sender">
                        {msg.sender === 'buyer' ? `Tú (${msg.email})` : 'Vendedor'}:
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
            <p className="chat-placeholder">Selecciona un artículo para iniciar el chat.</p>
          )}
        </div>
      </div>
      <div className="switch-button-container">
        <button
          onClick={() => navigate('/seller')}
          className="switch-button"
        >
          Cambiar a Modo Vendedor
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

export default Dashboard;