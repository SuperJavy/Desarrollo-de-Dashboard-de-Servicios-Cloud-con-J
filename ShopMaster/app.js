let skip = 0;
const limite = 10;
let totalProductos = 0;
let filtros = {};

const tbodyTablaProductos = document.getElementById("tbodyTablaProductos");
const infoPaginacion = document.getElementById("infoPaginacion");

function cargarProductos() {
    let url = `https://dummyjson.com/products?limit=${limite}&skip=${skip}`;

    if (filtros.busqueda) {
        url = `https://dummyjson.com/products/search?q=${filtros.busqueda}`;
    }

    if (filtros.categoria) {
        url = `https://dummyjson.com/products/category/${filtros.categoria}`;
    }

    if (filtros.orden) {
        url += `&sortBy=${filtros.orden.campo}&order=${filtros.orden.tipo}`;
    }

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            totalProductos = datos.total || datos.products.length;
            renderizarTablaProductos(datos.products);
            actualizarInfoPaginacion();
        });
}

function renderizarTablaProductos(productos) {
    tbodyTablaProductos.innerHTML = "";

    productos.forEach(producto => {
        tbodyTablaProductos.innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>
                    <img src="${producto.thumbnail}" width="50">
                </td>
                <td>${producto.title}</td>
                <td>$${producto.price}</td>
                <td>${producto.category}</td>
                <td>
                    <button class="btn btn-sm btn-warning">
                        Editar
                    </button>
                    <button 
                        class="btn btn-sm btn-danger"
                        onclick="eliminarProducto(${producto.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function actualizarInfoPaginacion() {
    const paginaActual = Math.floor(skip / limite) + 1;
    const totalPaginas = Math.ceil(totalProductos / limite);
    infoPaginacion.textContent = `Página ${paginaActual} de ${totalPaginas}`;
}

document.getElementById("btnPaginaSiguiente").onclick = () => {
    if (skip + limite < totalProductos) {
        skip += limite;
        cargarProductos();
    }
};

document.getElementById("btnPaginaAnterior").onclick = () => {
    if (skip > 0) {
        skip -= limite;
        cargarProductos();
    }
};

document.getElementById("formBusquedaProducto").addEventListener("submit", evento => {
    evento.preventDefault();
    filtros.busqueda = document.getElementById("inputBusquedaProducto").value;
    skip = 0;
    cargarProductos();
});

fetch("https://dummyjson.com/products/category-list")
    .then(respuesta => respuesta.json())
    .then(categorias => {
        const selectCategoria = document.getElementById("selectCategoriaProducto");
        categorias.forEach(categoria => {
            selectCategoria.innerHTML += `
                <option value="${categoria}">
                    ${categoria}
                </option>`;
        });
    });

document.getElementById("selectCategoriaProducto").onchange = evento => {
    filtros.categoria = evento.target.value || null;
    skip = 0;
    cargarProductos();
};

document.getElementById("selectOrdenProducto").onchange = evento => {
    const valor = evento.target.value;

    if (!valor) {
        filtros.orden = null;
    } else {
        const [campo, tipo] = valor.split("-");
        filtros.orden = { campo, tipo };
    }

    cargarProductos();
};

function eliminarProducto(idProducto) {
    if (!confirm("¿Eliminar producto?")) return;

    fetch(`https://dummyjson.com/products/${idProducto}`, {
        method: "DELETE"
    })
    .then(respuesta => respuesta.json())
    .then(() => {
        alert("Producto eliminado correctamente (simulado)");
        cargarProductos();
    });
}

cargarProductos();
