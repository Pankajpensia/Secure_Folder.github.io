
let HomePage = document.querySelector("#HomeContainer");
let DocPage = document.querySelector("#DocContainer");
let num = 0;
import { getDatabase, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

// Your web app's Firebase configuration
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
const database = getDatabase(app);

// ...
let text = localStorage.getItem("Username");
let getDataRef = localStorage.getItem("Mobile");

window.addEventListener('load', () => {
  onValue(ref(database, getDataRef), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      const Title = childData.Title;
      const Info = childData.Info;

      num++;
      const documentId = childSnapshot.key; // Get the unique key of the document

      HomePage.innerHTML += `<div class="card my-2 bg-primary">
      <div class="card-body">
        <h5 class="card-title" style="color:white;"> <b> #${num}</b>&nbsp;&nbsp;&nbsp;${Title}</h5>
        <p class="card-text" style="color:white; font-size:20px;">${Info}</p>
        <button class="btn btn-danger mx-2" style="position:absolute;right:10px; bottom:10px;"
              data-document-id="${documentId}" id="delBtn"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>`;
    
DocPage.innerHTML += `<div class="card my-2 bg-primary">
<div class="card-body">
  <h5 class="card-title" style="color:white;"> <b> #${num}</b>&nbsp;&nbsp;&nbsp;${Title}</h5>
  <p class="card-text" style="color:white; font-size:20px;">${Info}</p>
  <button class="btn btn-danger mx-2" style="position:absolute;right:10px; bottom:10px;"
        data-document-id="${documentId}" id="delBtn"><i class="fa-solid fa-trash"></i></button>
  </div>
</div>`;
    });

    // Add click event listener to delete buttons
    const deleteButtons = document.querySelectorAll("#delBtn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const documentIdToDelete = event.target.getAttribute("data-document-id");
        if (documentIdToDelete) {
          const documentRefToDelete = ref(database, `${getDataRef}/${documentIdToDelete}`);
          deleteDoc(documentRefToDelete);
        }
      });
    });
  });
});

// Function to delete a document from Firebase
async function deleteDoc(docRef) {
  try {
    await remove(docRef);
    alert("Document successfully deleted!");
    location.reload();
  } catch (error) {
    console.log("Document Delete Unsuccessfully Please Try Again !")
    setInterval(function(){
      location.reload();
    },500)
  }
}
