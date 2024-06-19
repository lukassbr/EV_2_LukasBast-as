var g_id_usuario = "";

// Función para agregar un usuario
function agregarUsuario() {
    var rut = document.getElementById("txt_rut").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "rut": rut,
        "dv": dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then(response => {
        if (response.status == 200) {
            mostrarAlerta("Usuario agregado correctamente", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        } else if (response.status == 400) {
            mostrarAlerta("Error al agregar usuario", 'danger');
        }
    })
    .catch(error => console.error("Error: ", error));
}

// Función para listar los usuarios
function listarUsuarios() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then(response => response.json())
    .then(json => {
        json.forEach(completarFilaUsuario);
        $('#tbl_usuarios').DataTable();
    })
    .catch(error => console.log('error', error));
}

// Función para completar una fila de la tabla de usuarios
function completarFilaUsuario(element, index, arr) {
    arr[index] = document.querySelector("#tbl_usuarios tbody").innerHTML += 
    `<tr>
        <td>${element.rut}</td>
        <td>${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${element.fecha_registro}</td>
        <td>
            <a href="actualizar.html?id=${element.rut}" class="btn btn-warning btn-sm">Actualizar</a>
            <a href="eliminar.html?id=${element.rut}" class="btn btn-danger btn-sm">Eliminar</a>
        </td>
    </tr>`;
}

// Función para obtener datos de un usuario para su actualización
function obtenerIdActualizacion() {
    const urlParams = new URLSearchParams(window.location.search);
    g_id_usuario = urlParams.get('id');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
    .then(response => response.json())
    .then(json => completarFormularioActualizarUsuario(json))
    .catch(error => console.error('Error:', error));
}

// Función para completar el formulario de actualización de usuario
function completarFormularioActualizarUsuario(element) {
    document.getElementById("txt_rut").value = element.rut;
    document.getElementById("txt_dv").value = element.dv;
    document.getElementById("txt_nombres").value = element.nombres;
    document.getElementById("txt_apellidos").value = element.apellidos;
    document.getElementById("txt_email").value = element.email;
    document.getElementById("txt_celular").value = element.celular;
    document.getElementById("txt_username").value = element.username;
    document.getElementById("txt_password").value = element.password;
}

// Función para actualizar un usuario
function actualizarUsuario() {
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "dv": dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
    .then(response => {
        if (response.status == 200) {
            mostrarAlerta("Usuario actualizado correctamente.", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Función para obtener datos de un usuario para su eliminación
function obtenerIdEliminacion() {
    const urlParams = new URLSearchParams(window.location.search);
    g_id_usuario = urlParams.get('id');

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
    .then(response => response.json())
    .then(json => document.getElementById("lbl_eliminar").innerHTML = `¿Está seguro que desea eliminar al usuario ${json.nombres} ${json.apellidos}?`)
    .catch(error => console.error('Error:', error));
}

// Función para eliminar un usuario
function eliminarUsuario() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
    .then(response => {
        if (response.status == 200) {
            mostrarAlerta("Usuario eliminado correctamente.", 'success');
            setTimeout(() => {
                location.href = "listar.html";
            }, 2000);
        } else if (response.status == 400) {
            mostrarAlerta("No es posible eliminar.", 'danger');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Función para mostrar alertas en la página
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById('alerta');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="alert alert-${tipo} alert-dismissible" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    alerta.append(wrapper);
}
