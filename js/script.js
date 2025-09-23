// === Mostrar fecha, día y hora ===
function actualizarFecha() {
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const ahora = new Date();
  const fechaTexto = ahora.toLocaleDateString('es-ES', opciones);
  const horaTexto = ahora.toLocaleTimeString('es-ES');
  const fechaElement = document.getElementById("fecha-actual");

  if (fechaElement) {
    fechaElement.innerHTML = `📅 ${fechaTexto} - ⏰ ${horaTexto}`;
  }
}
setInterval(actualizarFecha, 1000); // Actualiza cada segundo

// === Cookies creativas ===
const cookieSeccion = document.getElementById("cookieSeccion");
const inputNombre = document.getElementById("nombreUsuarioInput");
const btnAceptar = document.getElementById("aceptarCookie");

function setCookie(nombre, valor, dias) {
  let fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/`;
}

function getCookie(nombre) {
  let nameEQ = nombre + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

window.onload = function () {
  let usuario = getCookie("usuarioNombre");
  if (usuario && document.getElementById("fecha-actual")) {
    document.getElementById("fecha-actual").insertAdjacentHTML("afterend", `<p>👋 Bienvenido de nuevo, <b>${usuario}</b>!</p>`);
  } else if (cookieSeccion) {
    cookieSeccion.style.display = "flex";
  }
};

if (btnAceptar) {
  btnAceptar.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    if (nombre) {
      setCookie("usuarioNombre", nombre, 7); // Dura 7 días
      cookieSeccion.style.display = "none";
      location.reload(); // Recarga para mostrar el saludo
    }
  });
}

// === Validación de formulario de contacto ===
document.addEventListener("DOMContentLoaded", () => {
  const formContacto = document.querySelector("form#contacto-form");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        e.preventDefault();
      } else if (!regexCorreo.test(correo)) {
        alert("Por favor ingresa un correo válido.");
        e.preventDefault();
      } else if (mensaje.length < 10) {
        alert("El mensaje debe tener al menos 10 caracteres.");
        e.preventDefault();
      }
    });
  }
});

// === Validación del cuestionario ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const resultado = document.getElementById("quiz-result");

  const respuestasCorrectas = {
    q1: "b", // Ciudad de México
    q2: "b", // 25
    q3: "a"  // Verde
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;
    const formData = new FormData(form);
    let preguntasSinResponder = [];

    // Validar que todas las preguntas estén respondidas
    for (let pregunta in respuestasCorrectas) {
      const respuesta = formData.get(pregunta);
      if (!respuesta) {
        preguntasSinResponder.push(pregunta);
      } else if (respuesta === respuestasCorrectas[pregunta]) {
        score++;
      }
    }

    if (preguntasSinResponder.length > 0) {
      alert("Por favor responde todas las preguntas antes de enviar el formulario.");
      return;
    }

    // Mostrar resultado en pantalla
    resultado.textContent = `✅ Tu puntuación es ${score}/3`;
    resultado.style.fontWeight = "bold";
    resultado.style.fontSize = "18px";
    resultado.style.color = score === 3 ? "green" : "red";
  });
});
