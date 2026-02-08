const paramentros = new URLSearchParams(window.location.search);
const idProducto = paramentros.get("id");


const cargarDetalle = async () => {
    fetch(`https://dummyjson.com/products/${idProducto}`)
        .then(respuesta => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
        .then(data => {
            // La API devuelve un objeto del tipo data
            const producto = data;
            console.log("Datos recibidos:", producto); 

            // Llamamos a la función que se encarga de dibujar en pantalla
            dibujarDetalle(producto);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })

};



const dibujarDetalle = (producto) => {
    const contenedor = document.getElementById("detalle-producto");

    contenedor.innerHTML = `
    
            <img src="${producto.thumbnail}" alt="${producto.title}">
           <div class="detalle-contenedor"> 
           <h3 class="practice-title">${producto.title}</h3>
            <p class="card-price"><strong>Descripción:</strong> ${producto.description}</p>
            <p class="card-price"><strong>Precio:</strong> ${producto.price}</p>
            <p class="card-description"><strong>Categoria:</strong> ${producto.category}</p>
            <p class="card-description"><strong>Rating:</strong> ${producto.rating}</p>
            <p class="card-description"><strong>Stock:</strong> ${producto.stock}</p>
            <p class="card-price"><strong>tags:</strong> ${producto.tags}</p>
            <button type="button" class="btn-regresar" onclick="window.location.href='index.html'">Regresar</button>
            </div>
        `;
}
cargarDetalle();
