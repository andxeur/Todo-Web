//-----------------------------tout le Selecteur ---------------------------------------

// Selecteur des Zone de Saisie

const zoneDeSaisie_tire = document.querySelector(
  ".header_bottom_centre_contain_menu_gauche_form_Titre"
);
const zoneDeSaisieDescription = document.querySelector(
  ".header_bottom_centre_contain_menu_gauche_form2_Description"
);
//Selecteur des  categorie
const menuSelectionDeCategorie = document.querySelector(
  ".Categorie_selectioner"
);
const listeDesCategorie = document.querySelector(
  ".Categorie_selectioner_liste"
);

//Selecteur des categorie filter
const menuSelectionDeCategorie_filter = document.querySelector(
  ".Categorie_selectioner_filter"
);
const listeDesCategorie_filter = document.querySelector(
  ".Categorie_selectioner_liste_filter"
);
const sousMenu_filter = document.querySelector(".sous_menu_filter");
const titreSousMenu_filter = document.querySelector(
  ".Categorie_selectioner_filter > p"
);
const icon_Categorie_selection_filter = document.querySelector(
  ".Categorie_selectioner_icon_filter"
);

const sousMenu = document.querySelector(".sous_menu");
const titreSousMenu = document.querySelector(".Categorie_selectioner > p");
const icon_Categorie_selection = document.querySelector(
  ".Categorie_selectioner_icon"
);
const btn_ajoutDuneTache = document.querySelector(".icon_add");
const ZoneDajoutDesTache = document.querySelector(
  ".header_bottom_centre_bottom_centrer_listeDesTaches"
);

// --------------------------------tout les Event Listener----------------------------------
document.addEventListener("DOMContentLoaded", obtenirLesTachePresente);
btn_ajoutDuneTache.addEventListener("click", controlZoneZaisie);
ZoneDajoutDesTache.addEventListener("click", effacerLaTacheSElectioner);
menuSelectionDeCategorie.addEventListener("click", afficherLesCategorie);
menuSelectionDeCategorie_filter.addEventListener(
  "click",
  afficherLesCategorie_filter
);
sousMenu_filter.addEventListener("click", (parmt) => {
  //obtien le li du ul sur le quel on a cliquer (parmt.target;)
  const titre_categorie = parmt.target.innerHTML;

  titreSousMenu_filter.textContent = `${titre_categorie}`;

  filtrerLesTache();
});

sousMenu.addEventListener("click", (parmt) => {
  //obtien le li du ul sur le quel on a cliquer (parmt.target;)
  const titre_categorie = parmt.target.innerHTML;

  titreSousMenu.textContent = `${titre_categorie}`;
});

// ---------------------------tout les Functions---------------------------------------------
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
     <h4>${titreSousMenu.textContent}</h4>
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

  // recupere le parent qui les contien (class="stylePourLa_listeDesTaches")
  const item_conteneurGlobale = e.path[2];

  // delete todo
  if (item.classList[0] === "effacerLaTache") {
    // animation tombee
    item_conteneurGlobale.classList.add("fall");

    removeLocalTodos(item_conteneurGlobale);
    // removeLocalTodos(e);

    item_conteneurGlobale.addEventListener("transitionend", function () {
      item_conteneurGlobale.remove();
    });
  }

  // check mark
  if (item.classList[0] === "statueTache_cercle") {
    item.classList.toggle("statue_tache_completer");
    console.log(item_conteneurGlobale);
    console.log(item);
    console.log(e);
    const enveloppeurTotale = e.path[3];
    enveloppeurTotale.classList.toggle("tache_completer");
  }
}

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
}

function obtenirLesTachePresente() {
  let listeDesTacheEnregistrer;
  if (localStorage.getItem("tacheTodo") === null) {
    listeDesTacheEnregistrer = [];
  } else {
    listeDesTacheEnregistrer = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  listeDesTacheEnregistrer.forEach((infoOBjet) => {
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

function filtrerLesTache() {
  const lisDesEnfantZoneDajoutDesTache = Array.from(
    ZoneDajoutDesTache.children
  );

  lisDesEnfantZoneDajoutDesTache.forEach((enfant) => {
    switch (titreSousMenu_filter.textContent) {
      case "tout":
        enfant.style.display = "flex";
        break;

      case "terminer":
        if (enfant.classList.contains("tache_completer")) {
          enfant.style.display = "flex";
        } else {
          enfant.style.display = "none";
        }
        break;

      case "inachever":
        if (!enfant.classList.contains("tache_completer")) {
          enfant.style.display = "flex";
        } else {
          enfant.style.display = "none";
        }
        break;
    }
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  //obtenire l'index de la div a supprimer
  const index = Array.from(todo.parentElement.children).indexOf(todo);

  todos.splice(index, 1);

  localStorage.setItem("tacheTodo", JSON.stringify(todos));
}

function afficherLesCategorie() {
  icon_Categorie_selection.style.transition = "1s";
  icon_Categorie_selection.style.transform = "rotate(180deg)";
  listeDesCategorie.classList.toggle("afficheCategorie");
}

function afficherLesCategorie_filter() {
  icon_Categorie_selection_filter.style.transition = "1s";
  icon_Categorie_selection_filter.style.transform = "rotate(180deg)";
  listeDesCategorie_filter.classList.toggle("afficheCategorie_filter");
}
