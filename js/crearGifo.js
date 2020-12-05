const one = document.querySelector(".one");
const two = document.querySelector(".two");
const titulo = document.querySelector(".titulo");
const tSegundo = document.querySelector(".tSegundo");
const lineaUno = document.querySelector(".lineaUno");
const lineaDos = document.querySelector(".lineaDos");
const botonComenzar = document.querySelector(".botonComenzar");
const botonFinalizar = document.querySelector(".botonFinalizar");
const botonSubir = document.querySelector(".botonSubir");
const h2 = document.querySelector("h2");
const botonGrabar = document.querySelector(".botonGrabar");
const recordeVideo = document.querySelector("#video");
const preview = document.getElementById("gif-preview");
const previewContainer = document.querySelector(".gif-preview-container")
const three = document.querySelector(".three");

const time = document.getElementById("timer");
const timeLetra = document.querySelector(".timeLetra");
const letra = document.querySelector(".letra");
const backMorado = document.querySelector(".backMorado");

botonComenzar.addEventListener("click",(e)=>{
    one.className = "activa";
    h2.textContent = "¿Nos das acceso";
    tSegundo.textContent = "a tu cámara?";
    lineaUno.textContent = "El acceso a tu camara será válido sólo";
    lineaDos.textContent = "por el tiempo en el que estés creando el GIFO.";
    botonComenzar.style.display = "none";
    botonGrabar.style.display="block";
});
botonGrabar.addEventListener("click",()=>{
  one.className= "one";
  two.classList.add("activa");
  getStream();
});

//
// two.addEventListener("click",()=>{
//   one.className= "";
//     grabar();
// });

function getStream() {
  const videoContain = {
    video: true,
    audio: false
  };
  navigator.mediaDevices.getUserMedia(videoContain)
  .then(stream => {
recordeVideo.srcObject = stream;
console.log(recordeVideo.srcObject);
    // video.play()
  })
  .catch(error => {
    console.error(error);
  });
  grabar();
}
function grabar(){
  lineaUno.style.display = "none";
  lineaDos.style.display = "none";
  titulo.style.display = "none";
recordeVideo.style.display= "block";
}
botonGrabar.addEventListener("click",(e)=>{
  startRecording();
  botonGrabar.style.display="none";
  botonFinalizar.style.display="block";
});

function startRecording() {
  recording = true;
  recorder = RecordRTC(recordeVideo.srcObject, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    onGifRecordingStarted: function () {
      recordeVideo.play();
      console.log("started");
    }
  });
  recorder.startRecording();
  getDuration();
}

// Cronometro
function getDuration() {
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }
        time.style.display = "block";
        time.innerHTML = `00:00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

botonFinalizar.addEventListener("click",()=>{
  botonFinalizar.style.display = "none";
  botonSubir.style.display= "block";
  timeLetra.style.display = "none";
  letra.style.display = "block";
  stopRecording();
});

function stopRecording() {
  recordeVideo.srcObject.getTracks().forEach(function (track) {
    // alert()
    console.log(track);
    track.stop();
  });
  
  recorder.stopRecording(function () {
    recording = false;
// Se oculta video y muestra el preview del gif
    video.style.display = "none";
    previewContainer.style.display = "flex";
    preview.src = URL.createObjectURL(recorder.getBlob());
    console.log(URL.createObjectURL(recorder.getBlob()));
  });
  //formulario para enviarlo por el body a giphy
  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get('file'))
  botonSubir.addEventListener("click", () => {
    two.className= "two";
    three.className = "activa";
    backMorado.style.display = "flex";
    uploadGif(form);
    botonSubir.style.display = "none";
    letra.innerHTML="";
    letra.style.border="none";
  });
}

letra.addEventListener("click",()=>{
  // alert()
  botonGrabar.style.display = "block";
  botonSubir.style.display = "none";
  previewContainer.style.display = "none";
  letra.style.display="none";
  timeLetra.style.display="block";
  getStream();
});

/////////////////////////////
const cargando = document.querySelector(".cargando");
function uploadGif(gif) {
  fetch(
    "https://upload.giphy.com/v1/gifs?api_key=3G5PVSBPEL8IdD01ObSzV9pXTSMle3Es",
    {
      method: "POST",
      body: gif
    }
  )
  .then(response => {
    console.log(response);
    if (response.status === 200) {

      console.log('Gif subido!');
    } else {
      console.log('error');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    fetch(
      `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=3G5PVSBPEL8IdD01ObSzV9pXTSMle3Es`
    )
    .then(response => {
      return response.json();
    })
    .then(data => {
      const allGif = getGifs();
      allGif.push(data.data);
      localStorage["myGif"] = JSON.stringify(allGif);
      console.log(data.data);
      const urlActual = data.data.images.downsized.url
      preview.src = urlActual;
      cargando.innerHTML="GIFO subido con éxito";
    });
  });

}

function getGifs(){
  return JSON.parse(localStorage["myGif"] || "[]");
}

// ///////////////



//clave api = 3G5PVSBPEL8IdD01ObSzV9pXTSMle3Es