const formulario = document.getElementById("formularioMascota");
const mensaje = document.getElementById("mensaje");

// Pega aquí la URL que copiaste de Apps Script
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbx_tcDmsTRxS_AMJrcEF5_jDahQgE8MCGNQstouNHVRt-NKalb0E9j7-hVli_drldoT/exec";

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const datos = {
        propietario: document.getElementById("propietario").value,
        dni: document.getElementById("dni").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        direccion: document.getElementById("direccion").value,
        nombreMascota: document.getElementById("nombreMascota").value,
        especie: document.getElementById("especie").value,
        raza: document.getElementById("raza").value,
        sexo: document.getElementById("sexo").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        peso: document.getElementById("peso").value,
        vacunas: document.getElementById("vacunas").value,
        alergias: document.getElementById("alergias").value,
        enfermedades: document.getElementById("enfermedades").value,
        observaciones: document.getElementById("observaciones").value,
        servicio: document.getElementById("servicio").value,
        fechaAtencion: document.getElementById("fechaAtencion").value
    };

    if (!/^[0-9]{8}$/.test(datos.dni)) {
        mostrarMensaje("El DNI debe tener 8 números.", "error");
        return;
    }

    if (!/^[0-9]{9}$/.test(datos.telefono)) {
        mostrarMensaje("El teléfono debe tener 9 números.", "error");
        return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (new Date(datos.fechaNacimiento + "T00:00:00") > hoy) {
        mostrarMensaje("La fecha de nacimiento no puede ser futura.", "error");
        return;
    }

    if (new Date(datos.fechaAtencion + "T00:00:00") < hoy) {
        mostrarMensaje("La fecha de atención no puede estar en el pasado.", "error");
        return;
    }

    try {
        mostrarMensaje("Enviando registro...", "exito");

        await fetch(URL_APPS_SCRIPT, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(datos)
        });

        mostrarMensaje(
            "Solicitud enviada. Revisa la hoja Registros Mundo Peludo para confirmar que se guardó. 🐾",
            "exito"
        );

        formulario.reset();

    } catch (error) {
        mostrarMensaje("No se pudo enviar el registro. Inténtalo nuevamente.", "error");
        console.error(error);
    }
});

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}