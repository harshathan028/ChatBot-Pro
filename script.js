document.addEventListener("DOMContentLoaded", function () {
    const chatContent = document.getElementById('chat');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        displayMessage(message, 'user');

        userInput.value = "";
        chatContent.scrollTop = chatContent.scrollHeight;

        fetch("/get_response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.response, 'bot');
            chatContent.scrollTop = chatContent.scrollHeight;
        })
        .catch(error => {
            displayMessage("Error: Unable to reach AI service.", 'bot');
            console.error("Error:", error);
        });
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatContent.appendChild(messageDiv);
    }

    sendBtn.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});