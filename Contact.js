let SendBtn = document.querySelector("#SendFeeback");
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBhc0fk_t5q6xo4FySI9XXGHdEfLssCru8",
    authDomain: "folder-24d4a.firebaseapp.com",
    projectId: "folder-24d4a",
    storageBucket: "folder-24d4a.appspot.com",
    messagingSenderId: "256440210644",
    appId: "1:256440210644:web:244b521bde9a1aa728d741",
    measurementId: "G-32LGWTYVNN"
  };

  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase();

const Name = document.getElementById("Name");
const Email = document.getElementById("Email");

function SendData(e) {
  e.preventDefault()
  const DocTitle = Name.value;
  const DocInfo = Email.value;

  if (DocTitle && DocInfo) {
    const usersRef = push(ref(database, "Documents"));
    set(usersRef, {
      Title: DocTitle,
      Info: DocInfo
    })
      .then(() => {
        alert("Document Added Successfully 🥰");
            window.open("index.html")
        Name.value = "";
        Email.value = "";
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  } else {
    alert("Please enter both a Title and a Details.");
  }
}

SendBtn.addEventListener("click", SendData);
