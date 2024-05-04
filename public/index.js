
// Import the Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { collection, query, onSnapshot, orderBy, limit, endBefore, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAJtEmcLkZ6pjXWWHEdtUUqZs5t0oXqVco",
    authDomain: "simple-chat-app-96e48.firebaseapp.com",
    projectId: "simple-chat-app-96e48",
    storageBucket: "simple-chat-app-96e48.appspot.com",
    messagingSenderId: "1046119630509",
    appId: "1:1046119630509:web:7323ed03e0eb1367d12824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allMessagesLoaded = false;
let chunkSize = 10;
let currentChunkSize = chunkSize;

const getMessages = () => {
    const q = query(collection(db, "messages"), orderBy("timeStamp", "desc"), limit(currentChunkSize));

    onSnapshot(q, (snapshot) => {
        let changes = snapshot.docChanges();
        changes.reverse().forEach((change) => {
            if (change.type === "added") {
                console.log("New message: ", change.doc.data());
                const li = document.createElement("li");
                li.textContent = change.doc.data().user + ": " + change.doc.data().text;
                document.getElementById("messages").appendChild(li);
                scrollToBottom();
            }
        });
    });
}

const getOlderMessages = () => {
    if (allMessagesLoaded) {
        return;
    }
    console.log("Getting older messages");
    let ready = false;
    currentChunkSize += chunkSize;
    const q = query(collection(db, "messages"), orderBy("timeStamp", "desc"), limit(currentChunkSize));
    onSnapshot(q, (snapshot) => {
        if (!ready) {
            ready = true;
            allMessagesLoaded = true
            return;
        }
        allMessagesLoaded = false;
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
            if (change.type === "added") {
                const li = document.createElement("li");
                li.textContent = change.doc.data().user + ": " + change.doc.data().text;
                // add to the top of the list
                document.getElementById("messages").prepend(li);
            }
        });
    });
}

getMessages();

// if the user scrolls to the top of the page, load more messages
document.getElementById("messages").addEventListener("scroll", () => {
    if (document.getElementById("messages").scrollTop === 0) {
        getOlderMessages();
        // scroll back to where the user was
        document.getElementById("messages").scrollTop = 5;
    }
});

function scrollToBottom() {
  var messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight;
}

// when the form is submitted, send the message to the server
document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = "anonymous";
    const text = document.getElementById("input-text").value;
    const response = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, text }),
    });
    if (response.ok) {
      console.log("Message sent successfully");
    } else {
      console.error("Error sending message");
    }
  });