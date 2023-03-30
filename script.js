var chatbox = document.getElementById("chatbox");
var username = document.getElementById("username");
var message = document.getElementById("message");
var send = document.getElementById("send");

send.onclick = function() {
    var newMessage = document.createElement("p");
    newMessage.innerText = username.value + ": " + message.value;
    chatbox.appendChild(newMessage);
    username.disabled = true; // desabilita o campo de nome de usuário após enviar a primeira mensagem
    message.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}
