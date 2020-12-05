const imagenesTrending = document.querySelector(".img");
console.log(imagenesTrending);
imagenesTrending.addEventListener("click",(event)=>{
if(event.target.classList.contains("imagen")){
    
    event.preventDefault();
    event.stopImmediatePropagation();
    const dataset =event.target.dataset.id;
    console.log(dataset);
    const found = window["myGifs"].find((gif)=>gif.id==dataset);
    if(found){
        const textAbuscar = found.slug;
        console.log(textAbuscar);
        const buscaText = textAbuscar.split("-");
        trendingClickResultados(buscaText[0]);
    }
}
});

function trendingClickResultados(buscar){
    
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
        console.log(data);
        mostrarFotosDom(data);
      })
      .catch((err) => {
        console.log("erroer catch"+err);
  
      });
  }
  