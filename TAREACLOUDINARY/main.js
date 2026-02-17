const CLOUD_NAME = "dun25gq5l";
const UPLOAD_PRESET = "MI_UPLOAD_PRACTICE"; 

const input = document.getElementById("fileInput");
const imagen = document.getElementById("imagen");
const btnSubir = document.getElementById("btnSubir");
const statusMsg = document.getElementById("statusMsg");

const subirimg = () => {
    const foto = input.files[0];

    if (!foto) {
        alert("Por favor, selecciona una imagen primero.");
        return;
    }

    const formData = new FormData();
    formData.append("file", foto);
    formData.append("upload_preset", UPLOAD_PRESET);

    btnSubir.disabled = true;
    statusMsg.innerText = "Procesando y subiendo...";
    statusMsg.style.display = "block";

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
    })
    .then(data => {
        const urlTransformada = data.secure_url.replace(
            "/upload/", 
            "/upload/e_grayscale,w_500,c_fill,r_60/"
        );

        imagen.src = urlTransformada;
        imagen.style.display = "block";
        statusMsg.innerText = "¡Imagen transformada con éxito!";
    })
    .catch(error => {
        console.error("Error:", error);
        statusMsg.innerText = "Hubo un fallo en la subida.";
    })
    .finally(() => {
        btnSubir.disabled = false;
    });
};

btnSubir.addEventListener("click", subirimg);