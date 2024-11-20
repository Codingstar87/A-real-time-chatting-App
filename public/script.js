const socket = io();

const messages = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");




                                              
function appendMessage(messageData) {
    const messageElement = document.createElement("li");

    const timestamp = messageData.timeStamp
    time = new Date(timestamp).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
    
    messageElement.textContent = `${messageData.text} , ${time }`;
    messages.appendChild(messageElement);
}

// Load past messages from the server
socket.on("load messages", (messagesArray) => {
    console.log("Old messages:", messagesArray); // Debug log
    messagesArray.forEach((messageData) => appendMessage(messageData)); // Ensure appendMessage is defined
});

// Display incoming messages
socket.on("chat-massage-server", (messageData) => {
    console.log("New message:", messageData); // Debug log
    appendMessage(messageData); // Use appendMessage to add new messages to DOM
});






 // 
sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message) {
        socket.emit("chat-message-client", message);
        messageInput.value = "";  // Clear input after sending
    }
});

