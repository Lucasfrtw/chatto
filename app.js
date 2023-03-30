const chatbox = document.querySelector('.chatbox');
const form = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const usernameInput = document.querySelector('.username-input');

const socket = io();

// Recupera a conversa anterior do chat
fetch('/messages')
  .then(response => response.json())
  .then(messages => {
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<strong>${message.username}</strong>: ${message.message}`;
      chatbox.appendChild(messageElement);
    });
  })
  .catch(error => console.error(error));

socket.on('message', message => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${message.username}</strong>: ${message.message}`;
  chatbox.appendChild(messageElement);
});

form.addEventListener('submit', event => {
    event.preventDefault();
    const message = messageInput.value;
    const username = usernameInput.value || 'Anônimo';
    const timestamp = new Date(); // Adiciona a hora atual
    socket.emit('message', { message, username, timestamp }); // Envia junto com a mensagem
    messageInput.value = '';
  });
  

usernameInput.addEventListener('change', event => {
  const username = event.target.value;
  socket.emit('username', username);
});
