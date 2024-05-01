import express from "express";
import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "./firebaseHandler.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    const docRef = doc(db, "test", "test_document");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      res.send(docSnap.data());
    } else {
      console.log("No such document!");
      res.status(404).send("Document not found");
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
