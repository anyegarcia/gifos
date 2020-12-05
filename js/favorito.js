const parrafoPag = document.querySelector('.parrafoPag');
const logo = document.querySelector('.logoPag');
const verMas = document.querySelector('.verMas');
const fotoRow0 = document.querySelector('.fotoRow');
getFavoritos();
function getFavoritos() {
  return JSON.parse(localStorage['favoritos'] || '[]');
}
const favoritosLS = getFavoritos();
cargarFav();

function cargarFav() {
  if (favoritosLS.length === 0) {
    logo.style.display = 'block';
    parrafoPag.style.display = 'block';
  } else {
    if (favoritosLS.length < 12) {
      let inicio = 0;
      let fin = favoritosLS.length;
      mostrarFotos(favoritosLS, inicio, fin);
    } else {
      if (favoritosLS.length === 12) {
        let inicio = 0;
        let fin = 12;
        mostrarFotos(favoritosLS, inicio, fin);
      } else {
        let inicio = 0;
        let fin = 12;
        mostrarFotos(favoritosLS, inicio, fin);
        verMas.style.display = 'block';
      }
    }
  }
}

function mostrarFotos(data, inicio, fin) {
  console.log(data);
  for (let i = inicio; i < fin; i++) {
    let imageFav = document.createElement('div');
    imageFav.classList.add('favImgContainer');
    imageFav.style.backgroundImage = `url(${data[i].images.downsized.url}})`;
    let ulFav = document.createElement("ul");
    ulFav.classList.add("hoverMouse");
    let liCorazonFav = document.createElement("li");
    liCorazonFav.classList.add("corazonLi");
    let imgFavCorazon = document.createElement("img");
    imgFavCorazon.classList.add("corazonLi");
    imgFavCorazon.src = "./img/icon-fav-active.svg";
    liCorazonFav.appendChild(imgFavCorazon);
    let liFavDescargar = document.createElement("li");
    liFavDescargar.classList.add("descargar");
    let imgFavDescargar = document.createElement("img");
    imgFavDescargar.src = "./img/icon-download.svg";
    imgFavDescargar.classList.add("descargar");
    liFavDescargar.appendChild(imgFavDescargar);
    let liMaxFav = document.createElement("li");
    liMaxFav.classList.add("max");
    let imgMaxFav = document.createElement("img");
    imgMaxFav.src= "./img/icon-max.svg";
    imgMaxFav.classList.add("max");
    liMaxFav.appendChild(imgMaxFav);
    ulFav.appendChild(liCorazonFav);
    ulFav.appendChild(liFavDescargar);
    ulFav.appendChild(liMaxFav);
    
    imageFav.appendChild(ulFav);
    fotoRow0.appendChild(imageFav);    
    let ulInfoFav = document.createElement("ul");
    ulInfoFav.classList.add("info");
    let liUser = document.createElement("li");
    liUser.classList.add("user");
    liUser.innerHTML = data[i].username;
    ulInfoFav.appendChild(liUser);
    console.log(data[i].username);
    imgMaxFav.appendChild(ulInfoFav);
    let liInfoTitle = document.createElement("li");
    liInfoTitle.classList.add("titulo");
    liInfoTitle.innerHTML = data[i].title;
    ulInfoFav.appendChild(liInfoTitle);
    imageFav.appendChild(ulInfoFav);

  }
}
let inicio = 0;
let fin = 12;
verMas.addEventListener('click', () => {
  inicio = inicio + 12;
  fin = fin + 12;
  if (fin >= favoritosLS.length) {
    verMas.style.display = 'none';
  }
  mostrarFotos(favoritosLS, inicio, fin);
});

document.addEventListener('favorito-added', (event) => {
  // aqui se obtiene el nuevo favorito y se puede agregar a la lista de favoritos
  const seleccionado = event.detail;
  agregarAListaFavoritos(seleccionado);
});

function agregarAListaFavoritos(item) {
  logo.style.display = 'none';
  parrafoPag.style.display = 'none';
  let imageFav = document.createElement('div');
  imageFav.classList.add('favImgContainer');
  imageFav.style.backgroundImage = `url(${item.images.downsized.url}})`;
  let ulFav = document.createElement("ul");
  ulFav.classList.add("hoverMouse");
  let liCorazonFav = document.createElement("li");
  liCorazonFav.classList.add("corazonLi");
  let imgFavCorazon = document.createElement("img");
  imgFavCorazon.classList.add("corazonLi");
  imgFavCorazon.src = "./img/icon-fav-active.svg";
  liCorazonFav.appendChild(imgFavCorazon);
  let liFavDescargar = document.createElement("li");
  liFavDescargar.classList.add("descargar");
  let imgFavDescargar = document.createElement("img");
  imgFavDescargar.src = "./img/icon-download.svg";
  imgFavDescargar.classList.add("descargar");
  liFavDescargar.appendChild(imgFavDescargar);

  let liMaxFav = document.createElement("li");
  liMaxFav.classList.add("max");
  
  let imgMaxFav = document.createElement("img");
  imgMaxFav.src= "./img/icon-max.svg";
  imgMaxFav.classList.add("max");
  
  liMaxFav.appendChild(imgMaxFav);
  
  ulFav.appendChild(liCorazonFav);
  ulFav.appendChild(liFavDescargar);
  ulFav.appendChild(liMaxFav);
  imageFav.appendChild(ulFav);
  fotoRow0.appendChild(imageFav);
  
  let ulInfoFav = document.createElement("ul");
  ulInfoFav.classList.add("info");
  let liUser = document.createElement("li");
  liUser.classList.add("user");
  liUser.innerHTML = item.username;
  ulInfoFav.appendChild(liUser);
  let liInfoTitle = document.createElement("li");
  liInfoTitle.classList.add("titulo");
  liInfoTitle.innerHTML = item.title;
  ulInfoFav.appendChild(liInfoTitle);
  imageFav.appendChild(ulInfoFav);

}