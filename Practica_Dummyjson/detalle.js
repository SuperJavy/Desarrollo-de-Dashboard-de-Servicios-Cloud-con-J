// Obtener el ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const contenedor = document.getElementById("detalle-producto");

fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(producto => {
        contenedor.innerHTML = `
            <div class="practice-card">
                <img src="${producto.thumbnail}" 
                     style="width:100%; height:300px; object-fit:contain;">
                <h2>${producto.title}</h2>
                <p>${producto.description}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
                <p><strong>Marca:</strong> ${producto.brand}</p>
                <p><strong>Categoría:</strong> ${producto.category}</p>
            </div>
        `;
    })
    .catch(error => {
        contenedor.innerHTML = "<p>Error al cargar el producto</p>";
    });
