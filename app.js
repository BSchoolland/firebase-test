import express from "express";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "./backendFirebaseHandler.js";



const app = express();

app.use(express.static("public"));
app.use(express.json());


app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get("/api/getMessages", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"))
    const docs = querySnapshot.docs.map(doc => doc.data());
    // sort messages by timestamp
    docs.sort((a, b) => a.timeStamp.localeCompare(b.timeStamp));
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading data");
  }
});


app.post("/api/sendMessage", async (req, res) => {
  const { user, text } = req.body;
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      user,
      text,
      timeStamp: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);

    res.status(200).send("Message successfully sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending message");
  }
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
