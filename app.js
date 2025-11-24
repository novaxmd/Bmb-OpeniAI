import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxkdSxieSHEIYi2XeY2cbqhfb6075g7mc",
  authDomain: "mymessenger-2cc0b.firebaseapp.com",
  projectId: "mymessenger-2cc0b",
  storageBucket: "mymessenger-2cc0b.firebasestorage.app",
  messagingSenderId: "622445461217",
  appId: "1:622445461217:web:64895756826579289001a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("messageForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("msg").value.trim();

  if (!phone || !message) {
    status.innerText = "Jaza namba na ujumbe kwanza!";
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      phone,
      message,
      time: new Date()
    });

    status.innerText = "Ujumbe umeenda kikamilifu!";
    form.reset();
  } catch (err) {
    status.innerText = "Hitilafu: " + err.message;
    console.error(err);
  }
});
