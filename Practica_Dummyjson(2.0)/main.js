const urlApi = "https://dummyjson.com/products"

// Función asíncrona para pedir los datos
const cargarProductos = () => {
    // Usamos fetch para hacer la petición HTTP
    fetch(urlApi)
        .then(respuesta => respuesta.json()) 
        .then(data => {

            const productos = data.products;
            console.log("Datos recibidos:", productos); 

        
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
            alert("Hubo un error al cargar los datos. Revisa la consola.");
        })
}

// Función encargada de manipular el DOM
const mostrarProductos = (productos) => {
  
    const contenedor = document.getElementById("contenedor-productos");

   
    contenedor.innerHTML = "";

   
    productos.forEach(producto => {
        
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");

        tarjeta.addEventListener("click", () => {
            abrirProducto(producto.id);
        })

      
        tarjeta.innerHTML = `
           <img src="${producto.thumbnail}" alt="${producto.title}">
           <div class="card-details"> 
           <h3 class="practice-title">${producto.title}</h3>
            <p class="card-price"><strong>Precio:</strong> ${producto.price}</p>
            <p class="card-description"><strong>Categoria:</strong> ${producto.category}</p>
            <p class="card-description"><strong>Rating:</strong> ${producto.rating}</p>
            </div>
        `;

        
        contenedor.appendChild(tarjeta);
    })
}
const buscarProductos = () => {

    const productoBuscado = document.getElementById("producto-buscado").value;
    fetch(`https://dummyjson.com/products/search?q=${productoBuscado}`)
        .then(res => res.json())
        .then(data => {
            console.log("Resultados de búsqueda:", data);
            mostrarProductos(data.products);
        })
        .catch(error => {
            console.error("Error en la búsqueda:", error);
            alert("Hubo un error al realizar la búsqueda. Revisa la consola.");
        });
       
}
const abrirProducto = (id) => {
    window.location.href = `producto.html?id=${id}`;
}

const formBusqueda = document.querySelector(".barra_busqueda");

formBusqueda.addEventListener("submit", (event) => {

    event.preventDefault(); 
    
    buscarProductos(); 
});

