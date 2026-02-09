let productos = []
let productosFiltrados = []

// ==================
// INICIALIZACIÓN
// ==================
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos()

    document.getElementById("formBusqueda").addEventListener("submit", e => {
        e.preventDefault()       // 🔥 EVITA EL REFRESH
        buscarProducto()
    })

    document.getElementById("selectCategoria").addEventListener("change", aplicarFiltros)
    document.getElementById("selectOrden").addEventListener("change", aplicarFiltros)
})

// ==================
// CARGA DE PRODUCTOS
// ==================
async function cargarProductos() {
    const res = await fetch("https://dummyjson.com/products?limit=50")
    const data = await res.json()

    productos = data.products
    productosFiltrados = [...productos]

    cargarCategorias()
    pintarTabla()
}

// ==================
// CATEGORÍAS
// ==================
function cargarCategorias() {
    const select = document.getElementById("selectCategoria")
    const categorias = [...new Set(productos.map(p => p.category))]

    categorias.forEach(cat => {
        const option = document.createElement("option")
        option.value = cat
        option.textContent = cat
        select.appendChild(option)
    })
}

// ==================
// TABLA
// ==================
function pintarTabla() {
    const tbody = document.getElementById("tablaProductos")
    tbody.innerHTML = ""

    productosFiltrados.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><img src="${p.thumbnail}" width="60"></td>
                <td>${p.title}</td>
                <td>$${p.price}</td>
                <td>${p.category}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `
    })
}

// ==================
// BUSCAR
// ==================
function buscarProducto() {
    const texto = document.getElementById("inputBusqueda").value.toLowerCase()

    productosFiltrados = productos.filter(p =>
        p.title.toLowerCase().includes(texto)
    )

    aplicarFiltros(false)
}

// ==================
// FILTROS + ORDEN
// ==================
function aplicarFiltros(reaplicarBusqueda = true) {
    let resultado = [...productos]

    const categoria = document.getElementById("selectCategoria").value
    const orden = document.getElementById("selectOrden").value
    const texto = document.getElementById("inputBusqueda").value.toLowerCase()

    if (categoria) {
        resultado = resultado.filter(p => p.category === categoria)
    }

    if (texto && reaplicarBusqueda) {
        resultado = resultado.filter(p =>
            p.title.toLowerCase().includes(texto)
        )
    }

    if (orden === "price-asc") resultado.sort((a, b) => a.price - b.price)
    if (orden === "price-desc") resultado.sort((a, b) => b.price - a.price)
    if (orden === "title-asc") resultado.sort((a, b) => a.title.localeCompare(b.title))
    if (orden === "title-desc") resultado.sort((a, b) => b.title.localeCompare(a.title))

    productosFiltrados = resultado
    pintarTabla()
}

// ==================
// ELIMINAR
// ==================
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id)
    productosFiltrados = productosFiltrados.filter(p => p.id !== id)
    pintarTabla()
}
