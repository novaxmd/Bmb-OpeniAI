import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
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

// Get DOM elements
const form = document.getElementById("messageForm");
const status = document.getElementById("status");

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("msg").value.trim();

  // Simple validation
  if (!phone || !message) {
    status.innerText = "Jaza namba na ujumbe kwanza!";
    status.style.color = "red";
    return;
  }

  try {
    // Save message to Firestore
    await addDoc(collection(db, "messages"), {
      phone,
      message,
      time: new Date()
    });

    // Show success feedback
    status.innerText = "✅ Ujumbe tayari umetumwa!";
    status.style.color = "#00ff88";

    // Reset form
    form.reset();

  } catch (err) {
    status.innerText = "❌ Hitilafu: " + err.message;
    status.style.color = "red";
    console.error(err);
  }
});
