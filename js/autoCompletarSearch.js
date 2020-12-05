let input = document.getElementById('autocompleta');
const containerSearch = document.querySelector(".containerSearch");
const h2 = document.createElement("h2");

function autocompletar(palabraAcompletar) {
  opciones.innerHTML="";
  arrayDom.splice(0);
  // console.log(arrayDom);
  const urlAutocompletar = `https://api.giphy.com/v1/gifs/search/tags?api_key=6QrswqZ3kToVmQ2DYTh7tm40RbORtMlr&q=${palabraAcompletar}`;
  fetch(urlAutocompletar)
    .then((sucess) => {
      if (sucess.ok) {
        return sucess.json();
      } else {
        console.log('error sucees');
      }
    })
    .then((data) => {
      // console.log(data);
      mostrarenDom(data);
    })
    .catch((error)=>{
      console.log("errores"+error);
    });
}

const opciones = document.getElementById('values');
let arrayDom = [];
const espacioUl = document.querySelector("#espacioUl");
function mostrarenDom(data) {  
  containerSearch.className = "containerSearchActivo";
  espacioUl.className ="espacioUl";
  const longitud = data.data.length;
  // console.log(data);  
  let incial = 0;
  for (let i = incial; i < longitud; i++) {
    let li = document.createElement('li');
    li.textContent = data.data[i].name;
    li.id = i;  
    li.className = "lupaIzquierda";
    const icono = document.createElement('i');
    icono.id = i;
    icono.className = "fas fa-search fa-li";
    arrayDom.push(li.textContent);
    li.appendChild(icono);
    opciones.appendChild(li);
  }
  let LI = document.getElementsByTagName("li");
  let liLupa = document.getElementsByTagName("i");
  
  seleccionadoLuPa(liLupa,LI);
  
  
  
  let containerSearchActivo = document.querySelector(".containerSearchActivo");
  const imgError = document.getElementById("imgError");
  containerSearchActivo.addEventListener("keydown", (e)=>{
    
     if (e.keyCode === 13) {   
      // console.log(arrayDom.length);
        // if(arrayDom.length < 1){ 
          if(arrayDom.length <= 0){ 
          e.preventDefault();
          espacioUl.className ="";
          Seleccionado = input.value;
          // console.log("buscar");
          // console.log(Seleccionado);
          texto = MaysPrimera(Seleccionado.toLowerCase());
          h2.innerText=texto;
          gifAconcultar.appendChild(h2);
          fotoRow0.style.display="none";
          imgError.style.display="flex";
          containerSearch.className = "containerSearch";
          verMas.style.display = "none";
        }else{
          imgError.style.display="none";
          fotoRow0.style.display="flex";
          // incial=incial+1;
          // Seleccionado = arrayDom[0];
          Seleccionado = input.value;
          containerSearch.className = "containerSearch";
          inputaBuscar(Seleccionado);
          // alert(Seleccionado);
        }
      }
    // }
    // if (e.keyCode === 38){
    //   alert();
    //   opciones.scrollTop=-40;
    // }
  });  
}
let lupaInput = document.getElementById("lupaInput");
lupaInput.addEventListener("click", (evento) => {
  evento.preventDefault();
  evento.stopImmediatePropagation();
fotoRow0.innerHTML="";
  let Seleccion = input.value;
  inputaBuscar(Seleccion);
  containerSearch.className = "containerSearch";          
});

function seleccionadoLuPa(liLupa,LI){
  let Seleccionado;
  let buscar;
  
  for (liescogido of liLupa) {
      liescogido.addEventListener("click", function(e){
        e.preventDefault();
fotoRow0.innerHTML="";
      let Seleccionado = e.target;
      let id = Seleccionado.id;
      buscar = arrayDom[id];
      inputaBuscar(buscar);
      containerSearch.className = "containerSearch";          
      });
  }
  for (liescogido of LI) {
    liescogido.addEventListener("click", function(ev){
      Seleccionado = ev.target;
      id = Seleccionado.id;
      buscar = arrayDom[id];
      containerSearch.className = "containerSearch";
      inputaBuscar(buscar);
    });
  }
}



const gifAconcultar = document.getElementById("gifAconcultar");
const containerFotos = document.querySelector(".fotos");
function inputaBuscar(buscar){
  
  // alert();
  input.value = buscar.toLowerCase();
  espacioUl.className =""; 
  texto = MaysPrimera(buscar.toLowerCase());
  MaysPrimera(texto);
  h2.innerText = texto;
  gifAconcultar.appendChild(h2);
  const urlBuscar = `https://api.giphy.com/v1/gifs/search?api_key=6QrswqZ3kToVmQ2DYTh7tm40RbORtMlr&q=${buscar}`;
  fetch(urlBuscar)
    .then((sucess)=>{
      if(sucess.ok){
        return sucess.json();
      }else{
        console.log("error sucees");
      }
    })
    .then((data)=>{
      // console.log(data);
      mostrarFotosDom(data);
    })
    .catch((err) => {
      console.log("erroer catch"+err);

    });
}

function MaysPrimera(texto){
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
const cerrar = document.querySelector(".x");
cerrar.addEventListener("click", (e)=>{
  e.preventDefault();
  e.stopImmediatePropagation();
  containerSearch.className = "containerSearch";
  input.value ="";
});  

const fotoRow0 = document.getElementById("00");
const $imagen = document.createElement("img"); 
const $imagen1 = document.createElement("img");
const $imagen2 = document.createElement("img");   
const $imagen3 = document.createElement("img");
const $imagen4 = document.createElement("img");   
const $imagen5 = document.createElement("img");
const $imagen6 = document.createElement("img");   
const $imagen7 = document.createElement("img");
const $imagen8 = document.createElement("img");   
const $imagen9 = document.createElement("img");
const $imagen10 = document.createElement("img");   
const $imagen11 = document.createElement("img");

const verMas = document.querySelector(".verMas");
let inicio = 0;
let fin = 12;
let switchVermas = 0;

function mostrarFotosDom(data){
  if(data.length=!0){
  verMas.style.display = "block";
  // console.log("data llena "+data);
  $imagen.style.backgroundImage = `url(${data.data[0].images.downsized.url}})`;
  $imagen1.style.backgroundImage = `url(${data.data[1].images.downsized.url}})`;  
  fotoRow0.appendChild($imagen);
  fotoRow0.appendChild($imagen1);

  $imagen2.style.backgroundImage = `url(${data.data[2].images.downsized.url}})`;
  $imagen3.style.backgroundImage = `url(${data.data[3].images.downsized.url}})`;  
  fotoRow0.appendChild($imagen2);
  fotoRow0.appendChild($imagen3);

  $imagen4.style.backgroundImage = `url(${data.data[4].images.downsized.url}})`;
  $imagen5.style.backgroundImage = `url(${data.data[5].images.downsized.url}})`;  
  fotoRow0.appendChild($imagen4);
  fotoRow0.appendChild($imagen5);

  $imagen6.style.backgroundImage = `url(${data.data[6].images.downsized.url}})`;
  $imagen7.style.backgroundImage = `url(${data.data[7].images.downsized.url}})`;  
  fotoRow0.appendChild($imagen6);
  fotoRow0.appendChild($imagen7);

  $imagen8.style.backgroundImage = `url(${data.data[8].images.downsized.url}})`;
  $imagen9.style.backgroundImage = `url(${data.data[9].images.downsized.url}})`;  
  fotoRow0.appendChild($imagen8);
  fotoRow0.appendChild($imagen9);

  $imagen10.style.backgroundImage = `url(${data.data[10].images.downsized.url}})`;
  $imagen11.style.backgroundImage = `url(${data.data[11].images.downsized.url}})`;  
  fotoRow0.appendChild($imagen10);
  fotoRow0.appendChild($imagen11);
  switchVermas = 0;
  inicio=0;
  fin=12;
}else{alert(":(");}
verMas.addEventListener("click", (e)=>{
  e.preventDefault();
  e.stopImmediatePropagation();
  switchVermas = switchVermas+1;
  // console.log(switchVermas);
  if((switchVermas == 1) || (switchVermas == 2) || (switchVermas == 3)){
    inicio = inicio + 12;
    // console.log(inicio);
    fin = fin + 12;
    // console.log(fin);
  }else{
    inicio = inicio + 1;
    fin = fin + 2;
  }
  

  agregarDocemas(data,inicio,fin);
  
});

}

function agregarDocemas(data,inicio,fin){
  if(fin>= data.data.length){
    verMas.style.display="none";
  }
  for(let i=inicio; i<fin; i++){
    let image = document.createElement("img");
    image.style.backgroundImage = `url(${data.data[i].images.downsized.url})`;
    // image.className="imagen";
    fotoRow0.appendChild(image);
  }
}
input.addEventListener('input', (e) => {
  e.preventDefault();
  if (e.target.value) {
    autocompletar(input.value);
  } else {
    if (input.value == '') {
      containerSearch.className = "containerSearch";
      opciones.innerHTML = '';
      espacioUl.className ="";
      fotoRow0.innerHTML="";
      h2.innerHTML="";
      iniaDocenas=-1;
      finDocenas=0;
      verMas.style.display = "none";
      imgError.style.display="none";
    }
  }
});

const trendingAbuscarClick=document.querySelectorAll(".trendingAbuscarClick");
// console.log(trendingAbuscarClick);
trendingClick();
function trendingClick() {
  const url = `https://api.giphy.com/v1/trending/searches?api_key=6QrswqZ3kToVmQ2DYTh7tm40RbORtMlr`;
  fetch(url)
  .then((success) => {
      if (success.ok) {
          return success.json();
      } else{console.log("error sucess CLick trending")};
  })
  .then((data) => {    
      consultarTrendingClick(data);
  })
  .catch((err) => {
      console.log('No esta trayendo los trending sugeridos, revisar');
  })
}
function consultarTrendingClick(data){
  // console.log(data.data[0]);
  for(let i=0; i< 5;i++){
    let may = MaysPrimera(data.data[i]);
    // console.log(may);
    trendingAbuscarClick[i].innerHTML=may;

  }
}
const parrafo = document.querySelector(".parrafo");
parrafo.addEventListener("click",(e)=>{
  fotoRow0.innerHTML="";
  
  if (e.target.classList.contains("trendingAbuscarClick")){
    
    inputaBuscar(e.target.innerText);
    
    // mostrarTrendingClick(e.target.innerText);
  }
});
// function mostrarTrendingClick(buscar){
//   const urlBuscar = `https://api.giphy.com/v1/gifs/search?api_key=3G5PVSBPEL8IdD01ObSzV9pXTSMle3Es&q=${buscar}`;
//   fetch(urlBuscar)
//     .then((sucess)=>{
//       if(sucess.ok){
//         return sucess.json();
//       }else{
//         console.log("error sucees");
//       }
//     })
//     .then((data)=>{
//       console.log(data);
//       mostrarFotosDom(data);
//     })
//     .catch((err) => {
//       console.log("erroer catch"+err);

//     });
// }