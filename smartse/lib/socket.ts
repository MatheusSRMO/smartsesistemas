import io from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3005';

// Configuração do socket com reconexão automática
export const socket = io("http://localhost:3005", {
  autoConnect: true, // Conexão automática ao criar o socket
});
