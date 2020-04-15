"use-strict";
const pokedex = document.getElementById("pokedex");
const dropdown = document.getElementById("dropdown");
const pokeCache = {};
console.log(pokedex);
const fetchPokemon = (inType) => {
  console.log(inType);
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    let pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    if (typeof inType != "undefined") {
      pokemon = pokemon.filter((row) => row.type.includes(inType) === true);
    }
    console.log(pokemon);
    displayPokemon(pokemon);
  });
};
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

const selectPokemon = async (id) => {
  if(!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman;
    console.log(pokeCache);
    displayPopup(pokeman);
  }
  else displayPopup(pokeCache[id]);
}

const displayPopup = (pokeman) => {
  console.log(pokeman);
  const type = pokeman.types.map (type => type.type.name).join(',');
  const image = pokeman.sprites['front_default'];
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

const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
};
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
fetchPokemon();
fetchTypes();
