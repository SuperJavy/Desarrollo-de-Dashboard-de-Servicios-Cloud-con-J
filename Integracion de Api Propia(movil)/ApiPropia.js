const urlApi = "https://inventariocomputo.grupoctic.com/apiEquipos.php";

const cargarEquipos = () => {
    fetch(urlApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "action=obtener_todos"
    })
    .then(res => res.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        mostrarEquipos(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
};


const mostrarEquipos = (equipos) => {
    const contenedor = document.getElementById("contenedor-equipos");

    contenedor.innerHTML = "";

    equipos.forEach(equipo => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");

        tarjeta.innerHTML = `
            <img src="${equipo.ruta_imagen}" alt="${equipo.nombre}"
                 style="width:100%; height:200px; object-fit:contain;">
            <h3>${equipo.nombre}</h3>
            <p>${equipo.descripcion}</p>
            <p><strong>Estado:</strong> ${equipo.estado}</p>
            <p><strong>Registrado:</strong> ${equipo.fecha_registro}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
};