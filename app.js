import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxkdSxieSHEIYi2XeY2cbqhfb6075g7mc",
  authDomain: "mymessenger-2cc0b.firebaseapp.com",
  projectId: "mymessenger-2cc0b",
  storageBucket: "mymessenger-2cc0b.firebasestorage.app",
  messagingSenderId: "622445461217",
  appId: "1:622445461217:web:64895756826579289001a0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "messages"), {
      phone,
      message,
      time: new Date()
    });

    alert("Message imetumwa!");
    document.getElementById("messageForm").reset();
  } catch (error) {
    alert("Error: " + error.message);
  }
});
