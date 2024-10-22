const url = 'https://gateway.marvel.com'
const urlPersonaje = "/v1/public/characters"
const privada = "a5310ea8bfe290ddf4cedb67aa88a10a1e44c214"
const publicKey = "d51604ee04e6b1cfa2697f94934644ae"
const ts = "holaMundo"
const hash = "87ae9325b0b3b405856e715dcedf9d6c"
const parametrosAutenticacion = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;




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

      personajes.forEach((personaje) => {
        const comicsURI = personaje.comics.collectionURI;

       
        fetch(`${comicsURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
          .then((response) => response.json())
          .then((comicData) => {
            const comics = comicData.data.results;

          
            const comicsAMostrar = comics.slice(0, 3);

            comicsAMostrar.forEach((comic) => {
              
              info += `
                <div class="comicItem" data-comic-id="${comic.id}" data-personaje-id="${personaje.id}">
                  <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                  <h4>${comic.title}</h4>
                </div>
              `;
            });

           
            resultados2.innerHTML = info;

           
            const comicItems = document.querySelectorAll('.comicItem');
            comicItems.forEach((item) => {
              item.addEventListener('click', (e) => {
                const comicId = item.getAttribute('data-comic-id');
                const personajeId = item.getAttribute('data-personaje-id');
                
               
                obtenerDetallesComics(comicId, personajeId);
              });
            });
          })
          .catch((error) => {
            console.error('Error obteniendo cómics:', error);
          });
      });
    })
    .catch((error) => {
      console.error('Error obteniendo personajes:', error);
    });
};


const obtenerDetallesComics = (comicId, personajeId) => {
  const resultados3 = document.getElementById('resultados3');
  const resultados2 = document.getElementById('resultados2');

 
  resultados2.style.display = 'none';

  
  fetch(`https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((comicData) => {
      const comic = comicData.data.results[0];
      
      
      const guionistas = comic.creators.items.filter(creator => creator.role === 'writer');
      const guionistaNombres = guionistas.map(guionista => guionista.name).join(', ');

    
      const fechaPublicacion = comic.dates.find(date => date.type === 'onsaleDate')?.date || 'Fecha no disponible';

     
      const descripcion = comic.description || 'No hay descripción disponible para este cómic.';

     
      fetch(`https://gateway.marvel.com/v1/public/characters/${personajeId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then((response) => response.json())
        .then((personajeData) => {
          const personaje = personajeData.data.results[0];

          
          const info = `
            <div class="containerResultado3">
              <div class="comicItem">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
              </div>
              <div>
                <h4>${comic.title}</h4>
                <h5>Fecha de publicación:</h5>
                <p>${new Date(fechaPublicacion).toLocaleDateString()}</p>
                <h5>Guionista:</h5>
                <p>${guionistaNombres || 'Guionista no disponible'}</p>
                <h5>Descripción:</h5>
                <p>${descripcion}</p>
              </div>
            </div>
            <div class="comicItem">
              <img class="containerComicsImagen" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
            </div>
            <h2>${personaje.name}</h2>
          `;

         
          resultados3.innerHTML = info;
        })
        .catch((error) => {
          console.error('Error obteniendo detalles del personaje:', error);
        });
    })
    .catch((error) => {
      console.error('Error obteniendo detalles del cómic:', error);
    });
};


obtenerComics();
