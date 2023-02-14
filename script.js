//VARIABLEN =====
//const url = "https://jsonplaceholder.typicode.com/posts"; // -->Ich habe zuerst mit diesem URL versucht. Das funktioniert problemlos.
const card = document.querySelector(".cards");
const value = document.querySelectorAll("li");
const ul = document.querySelector(".navbar-nav");
const title = document.querySelector(".title");
const mode = document.querySelector(".mode");
const mainContainer = document.querySelector(".main-container");

let isDarkTrue = true;
let clickedLi = "montag";
let keys = [];
let values = [];

//request
//response

//readystate
//0 -> keine Anfrage gestellt
//1 -> Verbindung erfolgreich
//2 -> Anfrage erhaltet
//3 -> Anfrage erhalten und bearbeitet
//4 -> Response ist ready

const xhr = new XMLHttpRequest();
console.log(xhr);

xhr.onload = function () {
  if (this.status === 200) {
    const data = JSON.parse(this.responseText);
    console.log(data);

    console.log(clickedLi);
    data.forEach((element) => {
      if (element.day === clickedLi) {
        keys = Object.keys(Object.values(element)[1]);
        console.log("KEYS : ", keys);
        values = Object.values(Object.values(element)[1]);
        console.log("VALUES : ", values);
        title.innerHTML = `${clickedLi}`;
        Object.values(Object.values(element)[1]).forEach((e, idx) => {
          card.innerHTML += `
                  <div class="card">
              <div class="meal">${keys[idx]}</div>
              <div class="food-picture">
                <img src=${values[idx].imageUrl} alt="food-picture" />
              </div>
              <div class="food-title">${values[idx].name}</div>
              <div class="ingredients">
                ${values[idx].ingredients}
              </div>
                  `;
        });
      }
    });
  }
};

//   xhr.open("GET", url) //Wenn ich von einem RESTApi abrufen möchte,...

xhr.open("GET", "./data.json"); //Hier habe ich von einem localen File abgerufen.
xhr.send();

//EVENTS =====

//Wir erreichen die aufgeklickte Li
value.forEach((e) => {
  e.onclick = () => {
    clickedLi = e.id;
    console.log(clickedLi);
  };
});

//MODE CHANGE
console.log(isDarkTrue);

mode.addEventListener("click", () => {
  if (mainContainer.classList.contains("dark")) {
    mainContainer.classList.remove("dark");
    mode.classList.remove("dark-icon");
  } else {
    mainContainer.classList.add("dark");
    mode.classList.add("dark-icon");
  }
});
