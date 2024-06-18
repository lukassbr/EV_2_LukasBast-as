var g_id_cliente = "";

function agregarCliente(){
    var nombre = document.getElementById("txt_nombre").value;
    var apellido = document.getElementById("txt_apellido").value;
    var direccion = document.getElementById("txt_direccion").value;
    var telefono = document.getElementById("txt_telefono").value;
    var correo = document.getElementById("txt_correo").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombres": nombre,
        "apellidos": apellido,
        "direccion": direccion,
        "telefono": telefono,
        "correo": correo
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
            mostrarAlerta("Cliente agregado correctamente", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        }
        else if(response.status == 400){
            mostrarAlerta("Error al agregar cliente", 'danger');
        }
    })
    .catch(error =>console.error("Error: ", error));
}

function listarClientes(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"query": "SELECT * FROM cliente"});

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/dynamic", requestOptions)
    .then(response => response.json())
    .then(json => {
        json.forEach(completarFilaCliente);
        $('#tbl_cliente').DataTable();
    })
    .catch(error => console.log('error', error));
}

function completarFilaCliente(element, index, arr){
    arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML += 
    `<tr>
        <td>${element.id_cliente}</td>
        <td>${element.nombres} ${element.apellidos}</td>
        <td>${element.direccion}</td>
        <td>${element.telefono}</td>
        <td>${element.correo}</td>
        <td>
            <a href="actualizar.html?id=${element.id_cliente}" class="btn btn-warning btn-sm">Actualizar</a>
            <a href="eliminar.html?id=${element.id_cliente}" class="btn btn-danger btn-sm">Eliminar</a>
        </td>
    </tr>`;
}

function obtenerDatosActualizacionCliente(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente/" + id_cliente, requestOptions)
    .then(response => response.json())
    .then(json => json.forEach(completarFormularioActualizarCliente))
    .catch(error => console.error('Error:', error));
}

function completarFormularioActualizarCliente(element, index, arr){
    document.getElementById("txt_nombre").value = element.nombres;
    document,getElementById("txt_apellido").value = element.apellidos;
    document.getElementById("txt_direccion").value = element.direccion;
    document.getElementById("txt_telefono").value = element.telefono;
    document.getElementById("txt_correo").value = element.correo;
}

function actualizarCliente(){
    var nombre = document.getElementById("txt_nombre").value;
    var apellido = document.getElementById("txt_apellido").value;
    var direccion  = document.getElementById("txt_direccion").value;
    var telefono = document.getElementById("txt_telefono").value;
    var correo = document.getElementById("txt_correo").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "appplication/json");

    const raw = JSON.stringify({
        "nombres": nombre,
        "apellidos": apellido,
        "direccion": direccion,
        "telefono": telefono,
        "correo": correo
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
    .catch(error => console.error('Error:', error));
}

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
        if(response.status == 200){
            mostrarAlerta("Cliente eliminado correctamente.", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        }
        else if(response.status == 400){
            mostrarAlerta("No es posible eliminar.", 'danger');
        }
    })
    .catch(error => console.error('Error:', error));
}

function mostrarAlerta(mensaje, tipo){
    const alerta = document.getElementById('alerta');
    const wrapper = document.createElment('div');
    wrapper.innerHTML = `<div class="alert alert-${tipo} alert-dismissible" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    alerta.append(wrapper);
}

//function cargarListasDesplegablesClientes(){}