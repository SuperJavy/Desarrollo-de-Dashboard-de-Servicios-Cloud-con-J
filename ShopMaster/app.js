let start = 0;
const limit = 10;

const ddlCategory = document.getElementById("cmbCategory");
const ddlSort = document.getElementById("cmbSort");
const tbody = document.getElementById("tblProducts");
const lblPage = document.getElementById("lblPage");

fetch("https://dummyjson.com/products/category-list")
    .then(r => r.json())
    .then(data => {
        data.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            ddlCategory.appendChild(opt);
        });
    });

const getProducts = () => {
    const text = document.getElementById("txtSearch").value.trim();
    const category = ddlCategory.value;
    const sort = ddlSort.value;

    let url = "https://dummyjson.com/products";

    if (text) {
        url += `/search?q=${text}&`;
    } else if (category) {
        url += `/category/${category}?`;
    } else {
        url += "?";
    }

    url += `limit=${limit}&skip=${start}`;

    if (sort) {
        const [field, order] = sort.split("-");
        url += `&sortBy=${field}&order=${order}`;
    }

    fetch(url)
        .then(r => r.json())
        .then(data => {
            drawTable(data.products || []);
            updatePagination(data.total || 0);
        });
};

const drawTable = products => {
    tbody.innerHTML = "";

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No se encontraron productos
                </td>
            </tr>`;
        return;
    }

    products.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}" class="product-img"></td>
            <td>${p.title}</td>
            <td><span class="badge bg-primary">${p.category}</span></td>
            <td>$${p.price}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editItem(${p.id}, this)">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="removeItem(${p.id}, this)">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

const updatePagination = total => {
    const page = Math.floor(start / limit) + 1;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    lblPage.textContent = `Página ${page} de ${totalPages}`;

    document.getElementById("btnPrev").disabled = start === 0;
    document.getElementById("btnNext").disabled = start + limit >= total;
};

const editItem = (id, btn) => {
    const title = prompt("Nuevo nombre:");
    const price = prompt("Nuevo precio:");

    if (!title || !price) return;

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price })
    })
    .then(r => r.json())
    .then(data => {
        const row = btn.closest("tr");
        row.children[2].textContent = data.title;
        row.children[4].textContent = `$${data.price}`;
    });
};

const removeItem = (id, btn) => {
    fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" })
        .then(() => btn.closest("tr").remove());
};

// EVENTOS
document.getElementById("formSearch").addEventListener("submit", e => {
    e.preventDefault();
    start = 0;
    getProducts();
});

document.getElementById("btnNext").onclick = () => {
    start += limit;
    getProducts();
};

document.getElementById("btnPrev").onclick = () => {
    if (start === 0) return;
    start -= limit;
    getProducts();
};

ddlSort.onchange = () => { start = 0; getProducts(); };
ddlCategory.onchange = () => { start = 0; getProducts(); };

getProducts();
