// Selectors pour les Zone de Saisie
const zoneDeSaisie_tire = document.querySelector(".header_bottom_centre_contain_menu_gauche_form_Titre");
const zoneDeSaisieDescription = document.querySelector(".header_bottom_centre_contain_menu_gauche_form2_Description");
// Selectors
const btn_ajoutDuneTache = document.querySelector(".icon_add");
const ZoneDajoutDesTache = document.querySelector(".header_bottom_centre_bottom_centrer_listeDesTaches");
const filterOption = document.querySelector(".filter-todo");


// Event Listener
// document.addEventListener("DOMContentLoaded", obtenirLesTachePresente);
btn_ajoutDuneTache.addEventListener("click", AjoutDesTache);
ZoneDajoutDesTache.addEventListener("click", effacerLaTacheSElectioner);
// filterOption.addEventListener("click", filtrerLesTache);

// Functions
function AjoutDesTache(event) {
  event.preventDefault();

  // creationDuneDiv div
  const creationDuneDivPourAficherLesTaches = document.createElement("div");
  creationDuneDivPourAficherLesTaches.classList.add("stylePourLa_listeDesTaches");

  // create div
  const divConteneurDinfo = document.createElement("div");
  divConteneurDinfo.classList.add("divConteneurDinfo");
  divConteneurDinfo.innerHTML =`
  <div class="statueTache">
  <div class="statueTache_cercle"></div>
  </div>

  <div class="contenuDeTache">

     <div class="contenuDeTache_titreEtCategorie">
     <h4>${zoneDeSaisie_tire.value}</h4>
     <h4>${zoneDeSaisie_tire.value}</h4>
     </div>

     <div class="contenuDeTache_description">
     <p>${zoneDeSaisieDescription.value}</p>
     </div>
  </div>

  <div class="editerLaTache"></div>

  <div class="effacerLaTache"></div>
  `;
  
  creationDuneDivPourAficherLesTaches.appendChild(divConteneurDinfo);
  // sauvegarder DesTaches en Local
  sauvegardeLocalDesTaches(zoneDeSaisieDescription.value);
  // append to list
  ZoneDajoutDesTache.appendChild(creationDuneDivPourAficherLesTaches);
  // clear todo input value
  zoneDeSaisieDescription.value = "";
  zoneDeSaisie_tire.value = "" ;
}

function effacerLaTacheSElectioner(e) {
  const item = e.target;

  // delete todo
  if (item.classList[0] === "effacerLaTache") {

    // recupere le parent qui les contien
    const item_conteneurGlobale = e.path[2];
    console.log(item_conteneurGlobale);

    const todo = item_conteneurGlobale;
    // animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// function filtrerLesTache(e) {
//   const todos = ZoneDajoutDesTache.childNodes;
//   todos.forEach(function (todo) {
//     switch (e.target.value) {
//       case "all":
//         todo.style.display = "flex";
//         break;
//       case "completed":
//         if (todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       case "uncompleted":
//         if (!todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//     }
//   });
// }

function sauvegardeLocalDesTaches(todo) {
  // check if something exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function obtenirLesTachePresente() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    ZoneDajoutDesTache.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
