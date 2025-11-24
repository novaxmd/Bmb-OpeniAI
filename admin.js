import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

async function loadMessages() {
  const tbody = document.getElementById("messagesTable");

  const q = query(collection(db, "messages"), orderBy("time", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const row = `
      <tr>
        <td>${data.phone}</td>
        <td>${data.message}</td>
        <td>${new Date(data.time.seconds * 1000).toLocaleString()}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

loadMessages();
