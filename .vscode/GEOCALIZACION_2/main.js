let lat=21.1712193
let lon= -86.8512345

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta) => {
            lat = respuesta.coords.latitude
            lon = respuesta.coords.longitude

            const coordenadas = [lat, lon]
            let map = L.map('map').setView([lat,lon], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

                  let marcador = L.marker([lat,lon]).addTo(map);
                  marcador.bindPopup('<b>Estoy aqui... </b><br> Mis cordenadas son: <br>latitud: '+ lat +
                    ' <br> longitud: '+lon).openPopup()

                  let perimetrocase=[
                    [lat + 0.0001, lon - 0.0001],
                    [lat + 0.0001, lon + 0.0001],
                    [lat - 0.0001, lon + 0.0001],
                    [lat - 0.0001, lon - 0.0001]
                  ]  
                  let poligono= L.polygon(perimetrocase,{color: 'Red',fillColor: 'Red', fillOpacity: 0.5}).addTo(map);

                  poligono.on('click', ()=> {
                      poligono.bindPopup("Perimetro de mi casa").openPopup();
                  });
        },
        () => { })
} else { }