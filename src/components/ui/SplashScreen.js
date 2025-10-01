import React from 'react';

const SplashScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
    <img
      src="https://i.imgur.com/4a8RBx6.png"
      alt="GG AGRO Logo"
      className="w-48 animate-pulse"
    />
    <p className="text-gray-300 text-sm font-medium mt-8">
      Iniciando sistemas e autenticando usuário...
    </p>
  </div>
);

export default SplashScreen;