

getMisGifos();
const parrafoPa = document.querySelector(".parrafoPag");
const logo= document.querySelector(".logoPag");
function getMisGifos(){
    return JSON.parse(localStorage["myGif"] || "[]");
}
const getMyGifos = getMisGifos();

console.log(getMyGifos.length);
if(getMyGifos.length === 0){
    logo.style.display="block";
    parrafoPa.style.display="block";
}else{
    const $imagen = document.createElement("img");
    const fotoRow0 = document.getElementById("02");
    const verMas = document.querySelector(".verMas");
    logo.style.display="none";
    parrafoPa.style.display="none";
    mostrarFotos(getMyGifos);
    function mostrarFotos(data){    
        let inicio = 0;
        let fin = 12;
        console.log(data);
        if(data.length>12){
            verMas.style.display = "block";
        }
        agregarDocemas(data,inicio,fin);
        verMas.addEventListener("click", ()=>{
            inicio = inicio + 12;
            fin = fin + 12;
            agregarDocemas(data,inicio,fin);
        });      
    }

    function agregarDocemas(data,inicio,fin){
        console.log(data);
        if(fin>= data.length){
        verMas.style.display="none";
        }
        for(let i=inicio; i<fin; i++){
            let $image = document.createElement("div");
            $image.className="favImgContainer";
                                                        
            $image.style.backgroundImage = `url(${data[i].images.downsized.url})`;
            fotoRow0.appendChild($image);
        }
    }
}