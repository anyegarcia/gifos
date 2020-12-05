trending();
function trending() {
  const url_trending =
    'https://api.giphy.com/v1/gifs/trending?api_key=6QrswqZ3kToVmQ2DYTh7tm40RbORtMlr&limit=25&rating=g';
  fetch(url_trending)
    .then((sucess) => {
      if (sucess.ok) {
        return sucess.json();
      } else {
        console.log('error sucees');
      }
    })
    .then((data) => {
      //      console.log(data);
      window['myGifs'] = data.data; // fixed
      mostrarDOM(data);
    })
    .catch((err) => {
      console.log('error fecth');
    });
}
const container_search = document.querySelector('#container');
function mostrarDOM(search) {
  let posicionActual = 0;
  let $botonRetroceder = document.querySelector('.retroceder');
  let $botonAvanzar = document.querySelector('.avanzar');
  let $imagen = document.querySelector('#imagen');
  let $imagen1 = document.querySelector('#imagen1');
  let $imagen2 = document.querySelector('#imagen2');
  let $user = document.querySelector("#user");
  let $user1 = document.querySelector("#user1");
  let $user2 = document.querySelector("#user2");
  let $titulo = document.querySelector("#titulo");
  let $titulo1 = document.querySelector("#titulo1");
  let $titulo2 = document.querySelector("#titulo2");
  function pasarFoto() {
    if (posicionActual >= search.length - 1) {
      posicionActual = 0;
    } else {
      posicionActual = posicionActual + 1;
    }
    mostrarImagen();
  }

  function retrocederFoto() {
    if (posicionActual <= 0) {
      posicionActual = search.length - 1;
    } else {
      posicionActual = posicionActual - 1;
    }
    mostrarImagen();
  }
  function mostrarImagen() {
    $imagen.style.backgroundImage = `url(${search.data[posicionActual].images.downsized.url}})`;
    $imagen.dataset.id = `${search.data[posicionActual].id}`; // fixed
    $user.innerHTML = search.data[posicionActual].username;
    $titulo.innerHTML = search.data[posicionActual].title;

    $imagen1.style.backgroundImage = `url(${
      search.data[posicionActual + 1].images.downsized.url
    }})`;
    $imagen1.dataset.id = `${search.data[posicionActual + 1].id}`; // fixed
    $user1.innerHTML = search.data[posicionActual + 1].username;
    $titulo1.innerHTML = search.data[posicionActual + 1].title;

    $imagen2.style.backgroundImage = `url(${
      search.data[posicionActual + 2].images.downsized.url
    }})`;
    $imagen2.dataset.id = `${search.data[posicionActual + 2].id}`; // fixed
    $user2.innerHTML = search.data[posicionActual + 2].username;
    $titulo2.innerHTML = search.data[posicionActual + 2].title;
    marcarSiEsFavorito();
  }
  $botonAvanzar.addEventListener('click', pasarFoto);
  $botonRetroceder.addEventListener('click', retrocederFoto);
  mostrarImagen();
}

const imagenes = document.querySelectorAll('.imagen');
const hoverMouse = document.querySelectorAll('.hoverMouse');
const modal = document.getElementById('containerModal');
const container = document.querySelector('#container');
const imgMax = document.getElementById('imgMax');
// const userMax = document.querySelector(".userMax");
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('corazon')) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const parent = event.target.parentNode.parentNode.parentNode;
    event.target.src = './img/icon-fav-active.svg';
    const dataset = parent.dataset;
    parent.classList.add('Activa');
    const found = window['myGifs'].find((gif) => gif.id === dataset.id);
    if (found) {
      // hay que agregarlo al array de favoritos
      addFavorito(found);
    }
  }
  if (event.target.classList.contains('descargar')) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const parent = event.target.parentNode.parentNode.parentNode;
    const imag = parent.style.backgroundImage;
    //  console.log(imag);
    gifDescargar(imag);
  }
  if (event.target.classList.contains('max')) {
    
    // console.log("max");
    event.preventDefault();
    event.stopImmediatePropagation();
    const parent = event.target.parentNode.parentNode.parentNode;
    console.log(parent);
    const imag = parent.style.backgroundImage;
    //    console.log(parent);
    imgMax.style.backgroundImage = imag;
    imgMax.dataset.id = parent.dataset.id;
    
    modal.style.display = 'flex';
    console.log(parent.querySelector('.user'));
    const userCont = parent.querySelector('.user').innerHTML;
    userMax.textContent = userCont;
    const titulo = parent.querySelector('.titulo').innerHTML;
    tituloMax.textContent = titulo;
    modal.addEventListener('click', (ev) => {
      console.log(ev.target);
      ev.preventDefault();
      ev.stopImmediatePropagation();
      modalActivo(ev.target);
    });
    marcarSiEsFavoritoMax();
  }
  marcarSiEsFavorito();
});
function modalActivo(e) {
  
  if (e.classList.contains('close')) {
    modal.style.display = 'none';
    marcarSiEsFavorito();
  }
  if (e.classList.contains('corazon')) {
    const parent = e.parentNode.parentNode.parentNode.parentNode.parentNode;
    //  console.log(parent);
    const imgParent = parent.querySelector('#imgMax');
    //console.log(imgParent);
    e.src = './img/icon-fav-active.svg';
    //console.log(e.target);
    const dataset = imgParent.dataset;
    //console.log(dataset);
    const found = window['myGifs'].find((gif) => gif.id === dataset.id);
    //       console.log(found);
    if (found) {
      // hay que agregarlo al array de favoritos
      addFavorito(found);
    }
  }
  if (e.classList.contains('descargar')) {
    // alert()
    const parent = e.parentNode.parentNode.parentNode.parentNode;
    //     console.log(parent);
    const imag = parent.querySelector('#imgMax').style.backgroundImage;
    //       console.log(imag);
    gifDescargar(imag);
  }
  
}

function addFavorito(seleccionado) {
  if (!findFavorito(seleccionado)) {
    // si no encontramos el gif seleccionado entonces lo agregamos al localstorage
    const allFavorites = getFavoritos();
    allFavorites.push(seleccionado);
    localStorage['favoritos'] = JSON.stringify(allFavorites);

    // al agregarlo a favoritos podemos disparar un evento para notificar a otras partes de la app
    const event = new CustomEvent('favorito-added', { detail: seleccionado });
    document.dispatchEvent(event);
  }
}

function getFavoritos() {
  return JSON.parse(localStorage['favoritos'] || '[]');
}

function findFavorito(seleccionado) {
  const allFavorites = getFavoritos();
  const found = allFavorites.find((gif) => gif.id === seleccionado.id);
  return found;
}
marcarSiEsFavorito();
function marcarSiEsFavorito() {
  container.querySelectorAll('.imagen').forEach((element) => {
    // console.log(element);
    const dataset = element.dataset;
    const found = findFavorito(dataset);
    if (found) {
      element.classList.add('Activa');
      element.querySelector('.corazon').src = './img/icon-fav-active.svg';
    } else {
      element.classList.remove('Activa');
      element.querySelector('.corazon').src = './img/icon-fav-hover.svg';
    }
  });
  //   const found = findFavorito({ id: id });

  //   if (found) {
  //   }
}

const gifDescargar = function (data) {
  (async () => {
    let a = document.createElement('a');
    let d = data.slice(5, -3);
    let response = await fetch(d);
    let file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = [
      'application/octet-stream',
      a.download,
      a.href,
    ].join(':');
    a.click();
  })();
};

function marcarSiEsFavoritoMax() {
  // alert()
  const ele = modal.querySelector('#imgMax');
  // console.log(ele);
  const dataset = ele.dataset;
  // console.log(dataset);
  const found = findFavorito(dataset);
  if (found) {
    modal.querySelector('.corazon').src = './img/icon-fav-active.svg';
  } else {
    // alert();
    modal.querySelector('.corazon').src = './img/icon-fav-hover.svg';
  }
}
