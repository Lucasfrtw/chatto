const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('./'));

const server = app.listen(3000, () => {
  console.log('Servidor WebSocket iniciado na porta 3000.');
});

const io = require('socket.io')(server);

// Carregar mensagens antigas do arquivo de log
let chatLog = [];
if (fs.existsSync('./chat.log')) {
  const logData = fs.readFileSync('./chat.log', 'utf-8');
  if (logData) {
    chatLog = JSON.parse(logData);
  }
}

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", (message) => {
    console.log(`[${message.time}] ${message.username}: ${message.text}`);
    io.emit("message", message, message.time);

    // Adicionar nova mensagem ao chatLog
    const username = socket.username || 'Anônimo';
    const newMessage = { username, message: data.message };
    chatLog.push(newMessage);

    // Salvar nova mensagem no arquivo de log
    fs.writeFileSync('./chat.log', JSON.stringify(chatLog));

    io.emit('message', newMessage);
  });

  socket.on('username', username => {
    console.log(`Novo usuário: ${username}`);
    socket.username = username;
  });
});
