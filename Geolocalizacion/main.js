const cordenadas = document.getElementById("parrafo");
const enlace = document.querySelector("enlace");

    const obtener=()=> {
        if (navigator.geolocation) {
            cordenadas.innerText="Localizando"
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const longitud = position.coords.longitude
                    const latitud = position.coords.latitude

                    cordenadas.innerText="latidud ="+ latitud+"longitud = "+longitud;
                    enlace.href="https://www.google.com/maps.?q="+latitud+","+longitud;
                    enlace.style.display="block";
                    

                    //alert("longitud :"+longitud+"latitud"+latitud)
                }
                ,(error)=>{
                     cordenandas.textContent = "La geolocalización no es compatible con este navegador.";
                })
        } else {
           
        }
    }

