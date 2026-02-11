const API_URL = 'https://api.opensensemap.org';

// 1. Obtener y mostrar las estaciones (Endpoint 1)
async function loadBoxes() {
    const container = document.getElementById('listado-estaciones');
    container.innerHTML = '<h3>Cargando estaciones...</h3>';

    try {
        const res = await fetch(`${API_URL}/boxes?minimal=true&per_page=12`);
        const boxes = await res.json();

        container.innerHTML = ''; // Limpiar mensaje de carga

        boxes.forEach(box => {
            // Creamos la tarjeta
            const card = document.createElement('div');
            card.className = 'practice-card';
            
            card.innerHTML = `
                <h3 style="color: var(--accent)">${box.name}</h3>
                <p>Modelo: ${box.model || 'SenseBox'}</p>
                <small>Ver sensores</small>
            `;

            // Al hacer clic, pedimos el detalle (Endpoint 2)
            card.onclick = async () => {
                try {
                    const resDetail = await fetch(`${API_URL}/boxes/${box._id}`);
                    const detail = await resDetail.json();
                    showModal(detail);
                } catch (err) {
                    alert("Error al cargar detalles");
                }
            };

            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<h3>Error al conectar con la API</h3>';
    }
}

// 2. Función para armar y mostrar el modal
function showModal(data) {
    const content = document.getElementById('detalle-contenido');
    
    // Creamos la lista de sensores con un simple loop
    let sensorsHtml = '';
    data.sensors.forEach(s => {
        sensorsHtml += `
            <div class="sensor-item">
                <span>${s.title}</span>
                <strong style="color: var(--accent)">
                    ${s.lastMeasurement ? s.lastMeasurement.value : '--'} ${s.unit}
                </strong>
            </div>
        `;
    });

    content.innerHTML = `
        <h2 style="color: var(--accent)">${data.name}</h2>
        <p>Reporte: ${new Date(data.updatedAt).toLocaleString()}</p>
        <hr style="border: 0; border-top: 1px solid #374151">
        <div>${sensorsHtml}</div>
    `;

    document.getElementById('modal-detalle').style.display = 'flex';
}

// 3. Función para cerrar el modal
function closeModal() {
    document.getElementById('modal-detalle').style.display = 'none';
}

// Arrancar la app
loadBoxes();