window.addEventListener('load', () => {
    listar();
});

const listar = () => {
    const tabla = document.querySelector(".table tbody");
    fetch('http://localhost/crudApiRest/backendApiRest/public/api/personas')
        .then(datos => datos.json())
        .then((datos) => {
            let cadena = "";
            datos.map((dato) => {
                cadena += `<tr>
                             <td>${dato.id}</td>
                             <td>${dato.nombre}</td>
                             <td>${dato.apellido}</td>
                             <td>${dato.edad}</td>
                             <td>${dato.sexo}</td>
                             <td>
                                <a href="" class="btn btn-danger"><i class="bi bi-trash3">Delete</i></a>
                                <a href="" class="btn btn-warning"><i class="bi bi-pencil-square "></i>Edit</a>
                             </td>
                            </tr>`;
            })
            tabla.innerHTML += cadena;
        })
}
let modal = document.getElementById("exampleModal");
const btnEnvio = document.getElementById("envio");
btnEnvio.addEventListener("click", () => {
    const form = document.getElementById("frmPersona");
    const datos = new URLSearchParams(new FormData(form));
    fetch("http://localhost/crudApiRest/backendApiRest/public/api/personas/add", {
        method: 'post',
        body: datos
    })
        .then(response => response.json())
        .then((response) => {
            if (response.Status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: response.Mensaje,
                    showConfirmButton: false,
                    timer: 1500
                })
                form.reset();
                modal.close();
            } else {
                const t = response.length;
                let msj = "";
                if (t > 1) {
                    response.forEach(element => {
                        msj += element + ","
                    });
                    msj = msj.substring(0, msj.length - 1);
                } else {
                    msj = response[0];
                }
                Swal.fire({
                    icon: 'warning',
                    title: 'Cuidado',
                    text: msj
                })
            }
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                text: 'Algo salio mal'
            })
        })
})
