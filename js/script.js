// Mostrar la fecha actual
function formatearFecha(fecha) {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0'); // asegura dos dígitos
    const segundos = fecha.getSeconds().toString().padStart(2, '0'); // asegura dos dígitos
    const ampm = horas >= 12 ? 'p.m' : 'a.m';

    // Convertir de 24 horas a 12 horas
    horas = horas % 12;
    horas = horas ? horas : 12;

    return `${diasSemana[fecha.getDay()]} ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()} ${horas}:${minutos}:${segundos} ${ampm}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const fechaHoy = new Date();
    document.getElementById('fecha-actual').textContent = formatearFecha(fechaHoy);

    const fechaElemento = document.getElementById('fecha-actual');
    function actualizarFecha(){
        const fechaHoy = new Date();
        fechaElemento.textContent = formatearFecha(fechaHoy);
    }
    //Mostrar inmediatamente la fecha
    actualizarFecha();

    // Actualizar cada segundo
    setInterval(actualizarFecha, 1000);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Confirmación al enviar formulario
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.");
            form.reset();
        });
    }
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let resetNext = false;

// --- FUNCIÓN PRINCIPAL ---
function handleInput(action) {
  if (action === 'clear') {
    currentInput = '0';

  } else if (action === 'delete') {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';

  } else if (action === '=') {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = 'Error';
    }
    resetNext = true;

  } else {
    if (currentInput === '0' || resetNext) {
      currentInput = action;
      resetNext = false;
    } else {
      currentInput += action;
    }
  }

  display.textContent = currentInput;
}

// --- EVENTO BOTONES ---
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    handleInput(action);
  });
});

// --- EVENTO TECLADO ---
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || key === '.') {
    handleInput(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    e.preventDefault(); // Evita que recargue la página
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('delete');
  } else if (key === 'Escape') {
    handleInput('clear');
  }
});

document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('quiz-result').textContent = "¡Gracias por participar! Tus respuestas han sido registradas.";
})

// Validación de formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      if (!nombre || !correo || !mensaje) {
        alert("Por favor completa todos los campos.");
        e.preventDefault();
      } else if (!/\S+@\S+\.\S+/.test(correo)) {
        alert("Por favor ingresa un correo válido.");
        e.preventDefault();
      } else {
        alert("Formulario enviado correctamente.");
      }
    });
  }
});

function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  document.cookie = `${nombre}=${valor};expires=${fecha.toUTCString()};path=/`;
}

// Obtener cookie
function getCookie(nombre) {
  const nombreEQ = `${nombre}=`;
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nombreEQ) === 0) return c.substring(nombreEQ.length, c.length);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cookieSeccion');
  const aceptarBtn = document.getElementById('aceptarCookie');
  const nombreInput = document.getElementById('nombreUsuarioInput');

  const nombreUsuario = getCookie("nombreUsuario");

  if (!nombreUsuario) {
    // Mostrar ventana si NO existe cookie
    modal.style.display = 'flex';
  } else {
    // Mostrar mensaje de bienvenida si ya hay cookie
    mostrarMensajeBienvenida(nombreUsuario);
  }

  // Evento de aceptar
  aceptarBtn.addEventListener('click', () => {
    const nombre = nombreInput.value.trim();
    if (nombre === "") {
      alert("Por favor ingresa tu nombre.");
      return;
    }

    // Guardar cookie por 7 días
    setCookie("nombreUsuario", nombre, 7);

    // Cerrar modal
    modal.style.display = 'none';

    // Mostrar mensaje en la página
    mostrarMensajeBienvenida(nombre);
  });
});

function mostrarMensajeBienvenida(nombre) {
  const bienvenidaDiv = document.createElement('div');
  bienvenidaDiv.innerHTML = `<p class="bienvenida">¡Hola <strong>${nombre}</strong>! Nos alegra verte de nuevo 😄</p>`;
  bienvenidaDiv.classList.add('mensaje-bienvenida');

  document.body.prepend(bienvenidaDiv);

  // Desaparece después de 5 segundos
  setTimeout(() => {
    bienvenidaDiv.style.opacity = '0';
    setTimeout(() => bienvenidaDiv.remove(), 500);
  }, 5000);
}
