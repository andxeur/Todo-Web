// Selecteur des Zone de Saisie
const zoneDeSaisie_tire = document.querySelector(
  ".header_bottom_centre_contain_menu_gauche_form_Titre"
);
const zoneDeSaisieDescription = document.querySelector(
  ".header_bottom_centre_contain_menu_gauche_form2_Description"
);
//Selecteur des  categorie
const menuSelectionDeCategorie = document.querySelector(
  ".header_bottom_centre_contain_menu_gauche_form_div"
);
const listeDesCategorie = document.querySelector(
  ".Categorie_selectioner_liste"
);

// Selecteur des boutton
// const selecteurCategorie = document.querySelector(".icon_Categorie");
const btn_ajoutDuneTache = document.querySelector(".icon_add");
const ZoneDajoutDesTache = document.querySelector(
  ".header_bottom_centre_bottom_centrer_listeDesTaches"
);
const filterOption = document.querySelector(".filter-todo");

// Event Listener
document.addEventListener("DOMContentLoaded", obtenirLesTachePresente);
btn_ajoutDuneTache.addEventListener("click", controlZoneZaisie);
ZoneDajoutDesTache.addEventListener("click", effacerLaTacheSElectioner);
// Event Listener de la categorie
menuSelectionDeCategorie.addEventListener("click", afficherLesCategorie);
// filterOption.addEventListener("click", filtrerLesTache);

console.log(localStorage.getItem("tacheTodo"));

// Functions
function AjoutDesTache() {
  // creationDuneDiv div
  const creationDuneDivPourAficherLesTaches = document.createElement("div");
  creationDuneDivPourAficherLesTaches.classList.add(
    "stylePourLa_listeDesTaches"
  );

  // create div
   const divConteneurDinfo = document.createElement("div");
  divConteneurDinfo.classList.add("divConteneurDinfo");
  divConteneurDinfo.innerHTML = `
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
  sauvegardeLocalDesTaches(
    zoneDeSaisie_tire.value,
    zoneDeSaisieDescription.value
  );
  // ajouter a la zone des tache
  ZoneDajoutDesTache.appendChild(creationDuneDivPourAficherLesTaches);
  // effacer la valeur des input
  zoneDeSaisieDescription.value = "";
  zoneDeSaisie_tire.value = "";
}

function controlZoneZaisie(event) {
  event.preventDefault();

  if (zoneDeSaisie_tire.value == "") {
    alert("le titre est vide");
  } else {
    AjoutDesTache();
  }
}

function effacerLaTacheSElectioner(e) {
  const item = e.target;

  // delete todo
  if (item.classList[0] === "effacerLaTache") {
    // recupere le parent qui les contien
    const item_conteneurGlobale = e.path[2];
    // console.log(item_conteneurGlobale);

    // animation
    item_conteneurGlobale.classList.add("fall");

    removeLocalTodos(item_conteneurGlobale);
    // removeLocalTodos(e);

    item_conteneurGlobale.addEventListener("transitionend", function () {
      item_conteneurGlobale.remove();
    });
  }

  //TODO:dd
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

function sauvegardeLocalDesTaches(titre, description) {
  // localStorage.clear();
  // console.log(localStorage.getItem("tacheTodo"));

  // verifie si des tache exists deja
  let listeDesTodo;

  const arrayInfoTodo = { titre, description };

  if (localStorage.getItem("tacheTodo") === null) {
    listeDesTodo = [];
  } else {
    listeDesTodo = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  listeDesTodo.push(arrayInfoTodo);
  localStorage.setItem("tacheTodo", JSON.stringify(listeDesTodo));

  // console.log(listeDesTodo);
  console.log(localStorage.getItem("tacheTodo"));
}

function obtenirLesTachePresente() {
  let listeDesTacheEnregistrer;
  if (localStorage.getItem("tacheTodo") === null) {
    listeDesTacheEnregistrer = [];
  } else {
    listeDesTacheEnregistrer = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  listeDesTacheEnregistrer.forEach((infoOBjet) => {
    // console.log(infoOBjet.titre);
    // console.log(infoOBjet.description);

    // creationDuneDiv div
    const creationDuneDivPourAficherLesTaches = document.createElement("div");
    creationDuneDivPourAficherLesTaches.classList.add(
      "stylePourLa_listeDesTaches"
    );

    // create div
    const divConteneurDinfo = document.createElement("div");
    divConteneurDinfo.classList.add("divConteneurDinfo");
    divConteneurDinfo.innerHTML = `
  <div class="statueTache">
  <div class="statueTache_cercle"></div>
  </div>

  <div class="contenuDeTache">

     <div class="contenuDeTache_titreEtCategorie">
     <h4>${infoOBjet.titre}</h4>
     <h4>${infoOBjet.titre}</h4>
     </div>

     <div class="contenuDeTache_description">
     <p>${infoOBjet.description}</p>
     </div>
  </div>

  <div class="editerLaTache"></div>

  <div class="effacerLaTache"></div>
  `;

    creationDuneDivPourAficherLesTaches.appendChild(divConteneurDinfo);

    // ajouter a la zone des tache
    ZoneDajoutDesTache.appendChild(creationDuneDivPourAficherLesTaches);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  // console.log(todo);
  // console.log(todo.parentNode);
  // console.log(todo.parentNode.children);
  // console.log(todo.parentNode.children[todo.parentNode]);

  //obtenire l'index de la div a supprimer
  const index = Array.from(todo.parentElement.children).indexOf(todo);
  // console.log("index est " + index);

  todos.splice(index, 1);

  localStorage.setItem("tacheTodo", JSON.stringify(todos));

  console.log(localStorage.getItem("tacheTodo"));
}


function afficherLesCategorie() {
  console.log('tess ok')

  listeDesCategorie.classList.toggle('afficheCategorie');
}