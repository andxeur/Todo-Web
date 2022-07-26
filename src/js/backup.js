// Selectors
const zoneDeSaisiePrincipale = document.querySelector(".header_bottom_centre_contain_menu_gauche_form2_ZoneDeSaisie");
const btn_ajoutDuneTache = document.querySelector(".icon_add");
const ZoneDajoutDesTache = document.querySelector(".header_bottom_centre_bottom_centrer_listeDesTaches");
const filterOption = document.querySelector(".filter-todo");


// Event Listener
// document.addEventListener("DOMContentLoaded", obtenirLesTachePresente);
btn_ajoutDuneTache.addEventListener("click", AjoutDesTache);
ZoneDajoutDesTache.addEventListener("click", effacerLaTacheSElectioner);
filterOption.addEventListener("click", filtrerLesTache);

// Functions
function AjoutDesTache(event) {
  event.preventDefault();

  // creationDuneDiv div
  const creationDuneDivPourAficherLesTaches = document.createElement("div");
  creationDuneDivPourAficherLesTaches.classList.add("stylePourLa_listeDesTaches");
  // create li
  const nouvelTache = document.createElement("li");
  nouvelTache.innerText = zoneDeSaisiePrincipale.value;
  nouvelTache.classList.add("iteme_des_tache");
  creationDuneDivPourAficherLesTaches.appendChild(nouvelTache);
  // sauvegarder DesTaches en Local
  sauvegardeLocalDesTaches(zoneDeSaisiePrincipale.value);
  // check mark button
  const btn_tacheTerminer = document.createElement("button");
  btn_tacheTerminer.innerHTML = '<i class="fas fa-check"></i>';
  btn_tacheTerminer.classList.add("complete-btn");
  creationDuneDivPourAficherLesTaches.appendChild(btn_tacheTerminer);
  // check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  creationDuneDivPourAficherLesTaches.appendChild(trashButton);
  // append to list
  ZoneDajoutDesTache.appendChild(creationDuneDivPourAficherLesTaches);
  // clear todo input value
  zoneDeSaisiePrincipale.value = "";
}

// function effacerLaTacheSElectioner(e) {
//   const item = e.target;
//   // delete todo
//   if (item.classList[0] === "trash-btn") {
//     const todo = item.parentElement;
//     // animation
//     todo.classList.add("fall");
//     removeLocalTodos(todo);
//     todo.addEventListener("transitionend", function () {
//       todo.remove();
//     });
//   }
//   // check mark
//   if (item.classList[0] === "complete-btn") {
//     const todo = item.parentElement;
//     todo.classList.toggle("completed");
//   }
// }

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

// function sauvegardeLocalDesTaches(todo) {
//   // check if something exists
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }

//   todos.push(todo);
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// function obtenirLesTachePresente() {
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   todos.forEach(function (todo) {
//     // todo div
//     const todoDiv = document.createElement("div");
//     todoDiv.classList.add("todo");
//     // create li
//     const newTodo = document.createElement("li");
//     newTodo.innerText = todo;
//     newTodo.classList.add("todo-item");
//     todoDiv.appendChild(newTodo);
//     // check mark button
//     const completedButton = document.createElement("button");
//     completedButton.innerHTML = '<i class="fas fa-check"></i>';
//     completedButton.classList.add("complete-btn");
//     todoDiv.appendChild(completedButton);
//     // check trash button
//     const trashButton = document.createElement("button");
//     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
//     trashButton.classList.add("trash-btn");
//     todoDiv.appendChild(trashButton);
//     // append to list
//     ZoneDajoutDesTache.appendChild(todoDiv);
//   });
// }

// function removeLocalTodos(todo) {
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   const todoIndex = todo.children[0].innerText;
//   todos.splice(todos.indexOf(todoIndex), 1);
//   localStorage.setItem("todos", JSON.stringify(todos));
// }
