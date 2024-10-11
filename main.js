const url = 'https://gateway.marvel.com'
const urlPersonaje = "/v1/public/characters"
const privada = "a5310ea8bfe290ddf4cedb67aa88a10a1e44c214"
const publicKey = "d51604ee04e6b1cfa2697f94934644ae"
const ts = "holaMundo"
const hash = "87ae9325b0b3b405856e715dcedf9d6c"
const parametrosAutenticacion = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const urlComics ="http://gateway.marvel.com/v1/public/characters/comics"



   const init = () => {
  
      fetch(url + urlPersonaje + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then((response) => {
          return response.json();
        })
        .then((datos) => {
          const personajes = datos.data.results;
          console.log(personajes)
          const  resultados = document.getElementById('resultados');
        
          let info = '';
          let contadorParaImagen = 0;
    
          for (let i = 0; i < personajes.length; i++) {
              contadorParaImagen + i;
              info += `

               <div class="containerComics">
                <img class"containerComicsImagen" src=${personajes[i].thumbnail.path}.${personajes[i].thumbnail.extension}>
                <h3>${personajes[i].name}</h3>
            </div>
              
              `
          } 
          
          
          return resultados.innerHTML = info;
        })
    }
    
    document.onload = init();  

    
    
   

   const obtenerComics = () => {
    fetch(url + urlPersonaje + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => response.json())
      .then((datos) => {
        const personajes = datos.data.results;
        const resultados2 = document.getElementById('resultados2');
        
        let info = '';
  
        for (let i = 0; i < personajes.length; i++) {
          const comicsURI = personajes[i].comics.collectionURI;
          fetch(`${comicsURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            .then((response) => response.json())
            .then((comicData) => {
              const comics = comicData.data.results;
  
              const comicsAMostrar = comics.slice(0, 3);
  
              
              comicsAMostrar.forEach((comic) => {
                info += `
                  <div class="comicItem">
                    <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                     <h4>${comic.title}</h4>
                  </div>
                `;
              });
  
              
              resultados2.innerHTML = info;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  
  obtenerComics();
  