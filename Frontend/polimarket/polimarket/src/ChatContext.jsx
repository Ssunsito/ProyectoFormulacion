import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState({}); // Objeto para almacenar mensajes por artículo

  const addMessage = (itemId, message) => {
    setChats((prev) => {
      const itemChats = prev[itemId] || [];
      const buyerMessages = itemChats.filter((msg) => msg.sender === 'buyer').length;
      const sellerMessages = itemChats.filter((msg) => msg.sender === 'seller').length;

      // Verificar límites: 10 mensajes por comprador, 10 por vendedor
      if (
        (message.sender === 'buyer' && buyerMessages >= 10) ||
        (message.sender === 'seller' && sellerMessages >= 10)
      ) {
        return prev;
      }

      return {
        ...prev,
        [itemId]: [...itemChats, message],
      };
    });
  };

  return (
    <ChatContext.Provider value={{ chats, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};