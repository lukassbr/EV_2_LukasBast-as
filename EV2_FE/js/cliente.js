var g_id_cliente = "";

//Función para agregar cliente
function agregarCliente(){
    var rut = document.getElementById("txt_rut").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombre").value;
    var apellidos = document.getElementById("txt_apellido").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "rut": rut,
        "dv": dv,
        "nombre": nombres,
        "apellido": apellidos,
        "email": email,
        "celular": celular
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then(response => {
        if(response.status == 200){
            mostrarAlerta("Cliente agregado correctamente.", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        }
        else if(response.status == 400){
            mostrarAlerta("Error al agregar cliente.", 'danger');
        }
    })
    .catch(error => console.error("Error: ", error));
}

//Función para listar clientes
function listarClientes(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then(response => response.json())
    .then(json => {
        json.forEach(completarFilaCliente);
        $('#tbl_cliente').DataTable();
    })
    .catch(error => console.log('error', error));
}

//Función para completar fila de clientes
function completarFilaCliente(element, index, arr){
    arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML += 
    `<tr>
        <td>${element.rut}</td>
        <td>${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>
        <td>
            <a href="actualizar.html?id=${element.rut}" class="btn btn-warning btn-sm">Actualizar</a>
            <a href="eliminar.html?id=${element.rut}" class="btn btn-danger btn-sm">Eliminar</a>
        </td>
    </tr>`;
}

//Función para obtener datos de cliente para actualización
function obtenerIdActualizacion(){
    const urlParams = new URLSearchParams(window.location.search);
    g_id_cliente = urlParams.get('id');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
    .then(response => response.json())
    .then(json => completarFormularioActualizarCliente(json))
    .catch(error => console.error('Error: ', error));
}

//Función para completar el formulario para actualizacion de cliente
function completarFormularioActualizarCliente(element){
    document.getElementById("txt_rut").value = element.rut;
    document.getElementById("txt_dv").value = element.dv;
    document.getElementById("txt_nombre").value = element.nombres;
    document.getElementById("txt_apellido").value = element.apellidos;
    document.getElementById("txt_email").value = element.email;
    document.getElementById("txt_celular").value = element.celular;
}

//Función para actualizar cliente
function actualizarCliente(){
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombre").value;
    var apellidos = document.getElementById("txt_apellido").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "dv": dv,
        "nombre": nombres,
        "apellido": apellidos,
        "email": email,
        "celular": celular
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
    .then(response => {
        if(response.status == 200){
            mostrarAlerta("Cliente actualizado correctamente.", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        }
    })
    .catch(error => console.error('Error: ', error));
}

//Función para obtener datos del cliente para eliminacion
function obtenerIdEliminacion(){
    const urlParams = new URLSearchParams(window.location.search);
    g_id_cliente = urlParams.get('id');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
    .then(response => response.json())
    .then(json => document.getElementById("lbl_eliminar").innerHTML = `¿Está seguro que desea eliminar al cliente ${json.nombres} ${json.apellidos}?`)
    .catch(error => console.error('Error: ', error));
}

//Función para eliminar cliente
function eliminarCliente(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
    .then(response => {
        if(response.statut == 200){
            mostrarAlerta("Cliente eliminado correctamente", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        }
        else if(response.status == 400){
            mostrarAlerta("No es posile eliminar.", 'danger');
        }
    })
    .catch(error => console.error("Error: ", error));
}

//Funcion para crear alertas
function mostrarAlerta(mensaje, tipo){
    const alerta = document.getElementById('alerta');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="alert alert-${tipo} alert-dismissile" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    alerta.append(wrapper);
}