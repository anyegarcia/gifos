var htmlNocturno = document.getElementById("htmlNocturno");
var ligth = document.getElementById("ligth");
ligth.addEventListener("click", () => {
  if (htmlNocturno.classList.contains("modoNocturno")){
    htmlNocturno.classList.remove("modoNocturno");
    ligth.innerHTML="Modo Nocturno";
    return localStorage.setItem("modo","");
  }else{
    htmlNocturno.classList.add("modoNocturno");
    ligth.innerHTML="Modo Diurno";
    return localStorage.setItem("modo","Nocturno");
  }
});

if ((localStorage.getItem("modo")) === "Nocturno"){
  htmlNocturno.classList.add("modoNocturno");
  ligth.innerHTML="Modo Diurno";
}else{
  htmlNocturno.classList.remove("modoNocturno");
  ligth.innerHTML="Modo Nocturno";
}
