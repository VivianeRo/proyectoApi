const url = 'https://gateway.marvel.com'
const urlPersonaje = "/v1/public/characters"
const privada = "a5310ea8bfe290ddf4cedb67aa88a10a1e44c214"
const publicKey = "d51604ee04e6b1cfa2697f94934644ae"
const ts = "holaMundo"
const hash = "87ae9325b0b3b405856e715dcedf9d6c"
const parametrosAutenticacion = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

let dataPersonaje = [];

// Realizar la petición con fetch
fetch(url + urlPersonaje + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`, {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((info) => {
    dataPersonaje = info.data.results;

    
    crearPersonaje(dataPersonaje);
    
    return dataPersonaje;
  })
  .catch((error) => console.error(error));


const resultados =document.getElementById('resultados')

function crearPersonaje(dataPersonaje) {
    resultados.innerHTML = `
    <div class="containerComics">
                <img src="${dataPersonaje[0].thumbnail.path}.${dataPersonaje[0].thumbnail.extension}" alt="${dataPersonaje[0].name}">
                <h3>${dataPersonaje[0].name}</h3>
            </div>
    `
    }
    // falta hacer que se llame todo los comic de la api
 