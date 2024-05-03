
fetch('/api/getMessages').then(response => response.json()).then(data => {
    for (let message of data) {
        const li = document.createElement('li');
        li.textContent = message.user + ': ' + message.text;
        document.getElementById('messages').appendChild(li);
    }
    scrollToBottom();
})

// when the form is submitted, send the message to the server
document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = 'anonymous';
    const text = document.getElementById('input-text').value;
    const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, text })
    });
    if (response.ok) {
        // reload the page to see the new message
        location.reload();
    } else {
        console.error('Error sending message');
    }
});


function scrollToBottom() {
    var messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
}


