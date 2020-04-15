const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
          const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
          }));
          displayPokemon(pokemon);
          console.log(pokemon);
      });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
  .map(
      (pokeman) =>
      `
<li class="card">
    <img class="card-image" src="${pokeman.image}"/>
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    <p class="card-subtitle">Type: ${pokeman.type}</p>
</li>
  `
    )
  .join('');
  pokedex.innerHTML = pokemonHTMLString;
};




fetchPokemon();


const fetchTypes = () => {
  const url = `https://pokeapi.co/api/v2/type`;
  fetch(url)
  .then((res) => {
      return res.json();
  })
  .then((data) => {
    console.log(data);
    const types = data.results.map((row) => row.name);
    console.log(types);
    });
};

fetchTypes();


const select = document.getElementById("dropdown");
const options = ["1", "2"];

for (var i = 0; i < 20; i++) {
  const opt = options[i];
  const el = document.createElement("a");
  el.textContent = opt;
  el.value = opt;
  a.appendChild(el);
}
