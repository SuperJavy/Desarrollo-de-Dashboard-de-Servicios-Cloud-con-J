    const urlApi = "https://dummyjson.com/products";
    
    document.querySelector(".busqueda").addEventListener("submit", e => {
    e.preventDefault();
    buscar();
});


    const cargarproductos = () => {
        fetch(urlApi)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error en la petición");
                }
                return res.json();
            })
            .then(data => {
                console.log("Datos recibidos:", data);
                mostrarproductos(data.products);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    const mostrarproductos = (productos) => {
        const contenedor = document.getElementById("contenedor-productos");
        contenedor.innerHTML = "";

        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("practice-card");

            tarjeta.innerHTML = `
                <img src="${producto.thumbnail}" alt="${producto.title}"
                    style="width:100%; height:200px; object-fit:contain;">
                <h3>${producto.title}</h3>
                <p>${producto.description}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
            `;
            tarjeta.addEventListener("click", () => {
            window.location.href = `detalle.html?id=${producto.id}`;
        });

            contenedor.appendChild(tarjeta);
        });
    };

const buscar = () => {
    const texto = document.getElementById("txtBuscar").value.trim();

    // Si el input está vacío, vuelve a cargar todo
    if (texto === "") {
        cargarproductos();
        return;
    }

    const urlBusqueda = `https://dummyjson.com/products/search?q=${texto}`;

    fetch(urlBusqueda)
        .then(res => {
            if (!res.ok) {
                throw new Error("Error en la búsqueda");
            }
            return res.json();
        })
        .then(data => {
            console.log("Resultados búsqueda:", data);
            mostrarproductos(data.products);
        })
        .catch(error => {
            console.error("Error:", error);
        });
};



