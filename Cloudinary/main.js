const cloudname = "dun25gq5l";
const preset = "preset5C";

const input = document.getElementById("fileInput");
const imagen = document.getElementById("imagen");

const subirimg = () => {
    const foto = input.files[0]; // Obtenemos la imagen del input
    const formData = new FormData(); // Creamos un objeto FormData
    formData.append("file", foto); //cargamos la imagen
    formData.append("upload_preset", preset); //indicamos el preset donde se subira la imagen

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, { //creamos la solicitud
        method: "POST",// enviamos la solicitud por el metodo POST
        body: formData// Enviamos los datos de la imagen
    })
    .then(response =>{ if (!response.ok) throw new Error("Error en la respuesta del servidor"); return response.json(); })
    .then(data => {
        console.log("Imagen subida con éxito:", data);
        imagen.src = data.secure_url;
    })
    .catch(error => {
        console.error("Error al subir la imagen:", error);
    });
};
