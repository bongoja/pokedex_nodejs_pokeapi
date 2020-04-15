"use-strict";
const pokedex = document.getElementById("pokedex");
const dropdown = document.getElementById("dropdown");
const pokeCache = {};
console.log(pokedex);

const numberPerPage = 6;
let currentPage = 1;
let numberOfPages = 0;
let pageList = new Array();
let list = new Array();
//Pagination functions architecture
const nextPage = () => {
  currentPage += 1;
  loadList();
};

const previousPage = () => {
  currentPage -= 1;
  loadList();
};

const firstPage = () => {
  currentPage = 1;
  loadList();
};

const lastPage = () => {
  currentPage = numberOfPages;
  loadList();
};

const getNumberOfPages = (num) => {
  return Math.ceil(num / numberPerPage);
};

const drawList = () => {
  document.getElementById("list").innerHTML = "";
  displayPokemon(pageList);
};

const loadList = () => {
  var begin = (currentPage - 1) * numberPerPage;
  var end = begin + numberPerPage;

  pageList = list.slice(begin, end);
  drawList();
  check();
};

const check = () => {
  document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
  document.getElementById("previous").disabled = currentPage == 1 ? true : false;
  document.getElementById("first").disabled = currentPage == 1 ? true : false;
  document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
};

//Function gets 150 pokemon with their data from PokeAPI
const fetchPokemon = (inType) => {
  console.log(inType);
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    let pokemon = results.map((data) => ({
      //Specifying data
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    //Filtering pokemon types
    if (typeof inType != "undefined") {
      pokemon = pokemon.filter((row) => row.type.includes(inType) === true);
    }
    //Some types of pokemon are empty so...
    if (pokemon.length === 0) {
      alert("There is no such pokemon!");
      fetchPokemon();
      console.log(inType);
    }
    currentPage = 1;
    numberOfPages = getNumberOfPages(pokemon.length);
    list = pokemon;
    loadList();
    // const test = '';
    // return test;
    // console.log(test);
  });
};
//Display pokemon function with mapping and specifying HTML output code
const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) =>
        `
<li class="card" onclick="selectPokemon(${pokeman.id})">
    <img class="card-image" src="${pokeman.image}"/>
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    <p class="card-subtitle">Type: ${pokeman.type}</p>
</li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

//Cache single pokemon data
const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman;
    console.log(pokeCache);
    displayPopup(pokeman);
  } else displayPopup(pokeCache[id]);
};
//Popup display settings in HTML
const displayPopup = (pokeman) => {
  console.log(pokeman);
  const type = pokeman.types.map((type) => type.type.name).join(",");
  const image = pokeman.sprites["front_default"];
  const htmlString = `
  <div class="popup">
    <button id="closeBtn" onclick="closePopup()">Close</button>
    <div class="card" ${pokeman.id}">
        <img class="card-image" src="${image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} |
        <p class="card-subtitle">Type: ${type}</p>
    </div>
    </div>
    `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(htmlString);
};
//Close popup button removes popup
const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};
//Getting all types data form PokeAPI
const fetchTypes = () => {
  const url = `https://pokeapi.co/api/v2/type`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      const typesHTMLString = data.results.map((row) => `<option value=${row.name}>${row.name}</option>`);
      // console.log(types);
      dropdown.innerHTML = typesHTMLString;
    });
};

//Calling main functions
fetchPokemon();
fetchTypes();
