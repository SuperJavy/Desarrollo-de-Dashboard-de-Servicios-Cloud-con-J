const URL_API = 'https://api.opensensemap.org';
let estacionesGlobales = [];

const obtenerEstaciones = async () => {
    const contenedor = document.getElementById('listado-estaciones');
    contenedor.innerHTML = '<h3>Cargando estaciones...</h3>';

    try {
        const respuesta = await fetch(`${URL_API}/boxes?minimal=true&per_page=50`);
        estacionesGlobales = await respuesta.json();
        dibujarTarjetas(estacionesGlobales);
    } catch (error) {
        contenedor.innerHTML = '<h3>Error al conectar con la API</h3>';
    }
};

const dibujarTarjetas = (lista) => {
    const contenedor = document.getElementById('listado-estaciones');
    contenedor.innerHTML = '';

    lista.forEach(estacion => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'practice-card';
        tarjeta.innerHTML = `
            <h3 style="color: var(--accent)">${estacion.name}</h3>
            <p>ID: ${estacion._id.substring(0, 8)}...</p>
            <small>Ver sensores</small>
        `;
        tarjeta.onclick = () => obtenerDetalle(estacion._id);
        contenedor.appendChild(tarjeta);
    });
};

const filtrarPorNombre = () => {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const filtradas = estacionesGlobales.filter(est => 
        est.name.toLowerCase().includes(texto)
    );
    dibujarTarjetas(filtradas);
};

const obtenerDetalle = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/boxes/${id}`);
        const datos = await respuesta.json();
        mostrarModal(datos);
    } catch (error) {
        alert("Error al obtener detalle");
    }
};

const mostrarModal = (datos) => {
    const contenido = document.getElementById('detalle-contenido');
    let sensoresHtml = '';

    datos.sensors.forEach(s => {
        const valor = s.lastMeasurement ? s.lastMeasurement.value : '--';
        sensoresHtml += `
            <div class="sensor-item">
                <span>${s.title}</span>
                <strong style="color: var(--accent)">${valor} ${s.unit}</strong>
            </div>
        `;
    });

    contenido.innerHTML = `
        <h2>${datos.name}</h2>
        <p>Última actualización: ${new Date(datos.updatedAt).toLocaleString()}</p>
        <hr style="border:0; border-top:1px solid #334155; margin:10px 0;">
        ${sensoresHtml}
    `;
    document.getElementById('modal-detalle').style.display = 'flex';
};

const cerrarModal = () => {
    document.getElementById('modal-detalle').style.display = 'none';
};

obtenerEstaciones();