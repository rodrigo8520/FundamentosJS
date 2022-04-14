
//querySelector    ---------- para seleccionar solo uno
//querySelectorAll -------- para recorrer varios array
//const enlaces = document.querySelector('a');

// Array.from(enlaces).forEach(element => {
//     enlaces.style.backgroundColor = '#000000';
// });

// for (let i = 0; i < enlaces.length; i++) {
//     enlaces.style.backgroundColor = '#000000';    
// }
//nulo e undifined se consideran falsos en javascript 
//if(!dsad) ---   signi de ! hace que se haga lo contrario en casos de false o true


const formulario = document.querySelector("#formulario-contacto");
const botonEnviar = document.querySelector(".btn-enviar");

//getElementsByName entrega una colleccion de elementos no uno 
const nameContact = document.getElementsByName("name_contact")[0];
const email = document.getElementsByName("email_contact")[0];
const phone = document.getElementsByName("phone_contact")[0];
const topic = document.getElementById("topic_contact");
const commit = document.getElementsByName("commit_contact")[0];

const errorsList = document.getElementById("errors");

function showError(element, message) {
    element.classList.toggle("error");
    errorsList.innerHTML += `<li>${message}</li>`;
}

function cleanErrors() {
    errorsList.innerHTML = "";
}

async function sendMail(name, email, phone, select, comment) {
    await fetch('https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, select, comment })
    });

    const content = await rawResponse.json();
    if (Object.keys(content.errors).length > 0) {
        alert('Error al enviar el correo');
    } else {
        alert('Correo enviado exitosamente');
    }

}



/*
Validaciones necesarias:
+ Campo nombre y apellido no debe estar vacío y contener al menos un espacio
+ Campo correo debe tener un correo válido
+ Campo número de teléfono debe tener entre 7 y 15 dígitos, 
    pudiendo tener un + al inicio, ignorando espacios en blanco
+ Campo comentario debe tener al menos 20 caracteres
*/
// Desafío opcional: qué elemento y evento podríamos usar para detectar si el usuario apreta Enter en vez de hacer click?

botonEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    cleanErrors();
    let hasErrors = false;

    const sanitizedName = nameContact.value.trim();
    if (sanitizedName.length === 0 || sanitizedName.indexOf(' ') < 0) {
        alert('Error en el nombre');
        hasErrors = true;
    }
    //value.trim();
    const mailRe = /^\w+@\w+\.\w{2,7}/;
    if (!mailRe.exec(email.value)) {
        alert('Error en el correo');
        hasErrors = true;
    }

    const phoneRe = /^\+?\d{7,15}$/;
    const sanitizedPhone = phone.value.replace(' ', '');
    if (!phoneRe.exec(sanitizedPhone)) {
        alert('Error en el numero de telefono');
        hasErrors = true;
    }

    const sanitizedCommit = commit.value.trim();
    if (sanitizedCommit.length < 20) {
        alert('Error en el comentarioo');
        hasErrors = true;
    }

    if (!hasErrors) {
        sendMail(sanitizedName, email.value, sanitizedPhone, topic.value, sanitizedCommit);
    }

});