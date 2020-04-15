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

for (var i = 0; i < 20; i++) {
  const result = fetchTypes(i)
}

array = 
