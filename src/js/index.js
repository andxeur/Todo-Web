//-----------------------------tout le Selecteur ---------------------------------------

// Selecteur des Zone de Saisie

const panel_user_menu = document.querySelector(
  ".header_bottom_gauche_bottom_centre_menu"
);
const panel_user_menu_div_ul = document.querySelector(
  ".header_bottom_gauche_bottom_centre_menu_div_ul"
);

const panel_user_menu_ul = document.querySelector(
  ".header_bottom_gauche_bottom_centre_menu_ul"
);

const notifNbrDeTache = document.querySelector(".nav_notif_nbr_tache > span");

const notif_panel = document.querySelector(".nav_notif_user_panel");

const panel_user = document.querySelector(".header_bottom_gauche");
const header_bottom_centre = document.querySelector(".header_bottom_centre");
const header_bottom_droit = document.querySelector(".header_bottom_droit");

const header_bottom = document.querySelector(".header_bottom");

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

panel_user_menu.addEventListener("click", () => {
  panel_user_menu_div_ul.classList.toggle("afficheCategorie_filter");
});

panel_user_menu_ul.addEventListener("click", (parmt) => {
  //obtien le li du ul sur le quel on a cliquer (parmt.target;)
  const titre_categorie = parmt.target.innerHTML;

  const lisDesEnfantZoneDajoutDesTache = Array.from(
    ZoneDajoutDesTache.children
  );

  lisDesEnfantZoneDajoutDesTache.forEach((enfant) => {
    switch (titre_categorie) {
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

        case "tout supprimer": 
        localStorage.clear("tacheTodo");
        // console.log(localStorage.getItem("tacheTodo"));
        enfant.style.display = "none";
        obtenirLesTachePresente();
        // effacerLaTacheSElectioner();
        break;
        
    }
  });

});

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

//responsive section header_bottom
notif_panel.addEventListener("click", () => {
  panel_user.classList.toggle("masquerElement");
  header_bottom_centre.classList.toggle("demiLargeurElement");
  header_bottom_droit.classList.toggle("demiLargeurElement");

  header_bottom.style.width = "100%";
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

  <!-- <div class="editerLaTache"></div> -->

  <div class="effacerLaTache">
  <img src="./src/img/icon/delete_bin_24px.png" alt="" srcset="">
  </div>
  `;

  creationDuneDivPourAficherLesTaches.appendChild(divConteneurDinfo);
  // sauvegarder DesTaches en Local
  sauvegardeLocalDesTaches(
    zoneDeSaisie_tire.value,
    titreSousMenu.textContent,
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

  const item = e.path[1];

  const cercleTacheComplete = e.path[0];

  // recupere le parent qui les contien (class="stylePourLa_listeDesTaches")
  const item_conteneurGlobale = e.path[3];

  // delete todo
  if (item.classList[0] === "effacerLaTache") {
    // animation tombee
    item_conteneurGlobale.classList.add("fall");

    removeLocalTodos(item_conteneurGlobale);

    item_conteneurGlobale.addEventListener("transitionend", function () {
      item_conteneurGlobale.remove();
    });
  }

  // check mark
  if (cercleTacheComplete.classList[0] === "statueTache_cercle") {
    cercleTacheComplete.classList.toggle("statue_tache_completer");
    item_conteneurGlobale.classList.toggle("tache_completer");
  }
}

function sauvegardeLocalDesTaches(titre, categorie, description) {
  // localStorage.clear();
  // console.log(localStorage.getItem("tacheTodo"));

  // verifie si des tache exists deja
  let listeDesTodo;

  const arrayInfoTodo = { titre, categorie, description };

  if (localStorage.getItem("tacheTodo") === null) {
    listeDesTodo = [];
  } else {
    listeDesTodo = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  listeDesTodo.push(arrayInfoTodo);
  localStorage.setItem("tacheTodo", JSON.stringify(listeDesTodo));
  // console.log(localStorage.getItem("tacheTodo"));

  //actualise le nbr de tache presente
  notifNbrDeTache.textContent = `${listeDesTodo.length}`;
}

function obtenirLesTachePresente() {
  let listeDesTacheEnregistrer;

  if (localStorage.getItem("tacheTodo") === null) {
    listeDesTacheEnregistrer = [];
  } else {
    listeDesTacheEnregistrer = JSON.parse(localStorage.getItem("tacheTodo"));
    // console.log(localStorage.getItem("tacheTodo").length)
  }

  //actualise le nbr de tache presente
  notifNbrDeTache.textContent = `${listeDesTacheEnregistrer.length}`;

  listeDesTacheEnregistrer.forEach((infoOBjet) => {
    // creationDuneDiv div
    const creationDuneDivPourAficherLesTaches = document.createElement("div");
    creationDuneDivPourAficherLesTaches.classList.add(
      "stylePourLa_listeDesTaches"
    );

    // <h4>${infoOBjet.titre}</h4>
    // <p>${infoOBjet.description}</p>

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
     <h4>${infoOBjet.categorie}</h4>
     </div>

     <div class="contenuDeTache_description">
     <p>${infoOBjet.description}</p>
     </div>
  </div>

  <!-- <div class="editerLaTache"></div> -->

  <div class="effacerLaTache">
  <img src="./src/img/icon/delete_bin_24px.png" alt="" srcset="">
  </div>
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

  // console.log(localStorage.getItem("tacheTodo"))

  if (localStorage.getItem("tacheTodo") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("tacheTodo"));
  }

  //obtenire l'index de la div a supprimer
  const index = Array.from(todo.parentElement.children).indexOf(todo);

  todos.splice(index, 1);

  localStorage.setItem("tacheTodo", JSON.stringify(todos));

  //actualise le nbr de tache presente
  notifNbrDeTache.textContent = `${todos.length}`;
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
