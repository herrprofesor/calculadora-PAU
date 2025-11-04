// =======================================
// Configuración de materias y estructura
// =======================================
const materias = {
  comunes1: [
    "Filosofía",
    "Lengua Castellana y Literatura I",
    "Lengua Extranjera I",
    "Educación Física",
    "Valencià: Llengua i Literatura I"
  ],
  comunes2: [
    "Historia de España",
    "Historia de la Filosofía",
    "Lengua Castellana y Literatura II",
    "Lengua Extranjera II",
    "Valencià: Llengua i Literatura II"
  ]
};

// Materias por modalidad
const materiasModalidad = {
  ciencias: {
    primero: [
      "Matemáticas I",
      ["Física y Química", "Biología y Geología", "Tecnología e Ingeniería I", "Dibujo Técnico I"]
    ],
    segundo: [
      ["Matemáticas II", "Matemáticas CC Sociales II"],
      ["Biología", "Física"],
      ["Química", "Tecnología e Ingeniería II", "Dibujo Técnico II"]
    ]
  },
  humanidades: {
    primero: [
      "Latín I",
      "Griego I",
      ["Literatura Universal", "Historia del Mundo Contemporáneo"]
    ],
    segundo: [
      "Latín II",
      ["Griego II", "Empresa y Diseño de Modelos de Negocio"],
      ["Historia del Arte", "Geografía"]
    ]
  },
  sociales: {
    primero: [
      "Matemáticas CC Sociales I",
      "Economía",
      ["Literatura Universal", "Historia del Mundo Contemporáneo"]
    ],
    segundo: [
      "Matemáticas CC Sociales II",
      ["Griego II", "Empresa y Diseño de Modelos de Negocio"],
      ["Historia del Arte", "Geografía"]
    ]
  },
  artes: {
    primero: [
      "Dibujo Artístico I",
      ["Volumen", "Cultura Audiovisual"],
      ["Proyectos Artísticos", "Dibujo Técnico Aplicado a Artes y Diseño"]
    ],
    segundo: [
      "Dibujo Artístico II",
      "Diseño",
      ["Fundamentos Artísticos", "Dibujo Técnico Aplicado a Artes y Diseño II"]
    ]
  },
  musica: {
    primero: [
      "Coro y Técnica Vocal I",
      ["Análisis Musical I", "Artes Escénicas"],
      ["Lenguaje y Práctica Musical", "Cultura Audiovisual"]
    ],
    segundo: [
      ["Análisis Musical II", "Artes Escénicas II"],
      "Coro y Técnica Vocal II",
      "Historia de la Música y la Danza"
    ]
  }
};

// Optativas
const optativas1 = [
  "Segunda Lengua Extranjera I: Francés",
  "Biología Humana y Salud",
  "Programación, Redes y Sistemas Informáticos I",
  "Imagen y Sonido",
  "Producción Musical",
  "Gestión de Proyectos de Emprendimiento"
];
const optativas2 = [
  "Actividad Física para la Salud y el Desarrollo Personal",
  "Programación, Redes y Sistemas Informáticos II",
  "Psicología",
  "Segunda Lengua Extranjera II: Francés",
  "Trabajo Experimental en Física y Química",
  "Geología y Ciencias Ambientales",
  "Descubriendo nuestras raíces clásicas",
  "Técnicas de Expresión Graficoplásticas"
];

// =======================================
// Elementos del DOM
// =======================================
const modalidadSelect = document.getElementById("modalidad");
const comunes1Div = document.getElementById("comunes1");
const comunes2Div = document.getElementById("comunes2");
const modalidad1Div = document.getElementById("modalidad1");
const modalidad2Div = document.getElementById("modalidad2");
const opt1Div = document.getElementById("optativa1");
const opt2Div = document.getElementById("optativa2");
const faseGeneralDiv = document.getElementById("fase-general");
const faseVolDiv = document.getElementById("fase-voluntaria");
const bachibacRadios = document.getElementsByName("bachibac");

// =======================================
// Funciones de creación de campos
// =======================================

// Crear un campo de nota con CONV
function crearCampo(nombre, idBase) {
  const div = document.createElement("div");
  div.className = "mb-3";

  const label = document.createElement("label");
  label.textContent = nombre;
  div.appendChild(label);

  const convDiv = document.createElement("div");
  convDiv.className = "conv-label";

  const convCheckbox = document.createElement("input");
  convCheckbox.type = "checkbox";
  convCheckbox.className = "conv-checkbox";
  convDiv.appendChild(convCheckbox);

  const convLabel = document.createElement("span");
  convLabel.textContent = "CONV";
  convDiv.appendChild(convLabel);

  div.appendChild(convDiv);

  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.max = 10;
  input.step = 1;
  input.className = "w-full p-1 border border-gray-300 rounded mt-1";
  div.appendChild(input);

  // Manejo de CONV
  convCheckbox.addEventListener("change", () => {
    if (convCheckbox.checked) {
      input.value = "CONV";
      input.disabled = true;
      input.style.textAlign = "center";
    } else {
      input.value = "";
      input.disabled = false;
      input.style.textAlign = "left";
    }
    recalcular();
  });

  input.addEventListener("input", recalcular);

  return div;
}

// Crear un selector de opciones con nota y CONV
function crearSelector(opciones, idBase, titulo, valorDefecto) {
  const div = document.createElement("div");
  div.className = "mb-3";

  const label = document.createElement("label");
  label.textContent = titulo;
  div.appendChild(label);

  const select = document.createElement("select");
  select.className = "w-full p-1 border border-gray-300 rounded mt-1";
  opciones.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = o;
    select.appendChild(opt);
  });
  if (valorDefecto) select.value = valorDefecto;
  div.appendChild(select);

  // Campo de nota
  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.max = 10;
  input.step = 1;
  input.className = "w-full p-1 border border-gray-300 rounded mt-1";
  div.appendChild(input);

  // CONV
  const convDiv = document.createElement("div");
  convDiv.className = "conv-label";
  const convCheckbox = document.createElement("input");
  convCheckbox.type = "checkbox";
  const convLabel = document.createElement("span");
  convLabel.textContent = "CONV";
  convDiv.appendChild(convCheckbox);
  convDiv.appendChild(convLabel);
  div.appendChild(convDiv);

  convCheckbox.addEventListener("change", () => {
    if (convCheckbox.checked) {
      input.value = "CONV";
      input.disabled = true;
      input.style.textAlign = "center";
    } else {
      input.value = "";
      input.disabled = false;
      input.style.textAlign = "left";
    }
    recalcular();
  });

  select.addEventListener("change", recalcular);
  input.addEventListener("input", recalcular);

  return div;
}

// =======================================
// Funciones de limpieza
// =======================================
function limpiar(selector) {
  selector.querySelectorAll("input[type=number]").forEach(inp => inp.value = "");
  selector.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
  selector.querySelectorAll("select").forEach(sel => sel.selectedIndex = 0);
  selector.querySelectorAll("input[type=number]").forEach(inp => inp.disabled = false);
  recalcular();
}

function limpiarTodo() {
  document.querySelectorAll("input[type=number]").forEach(inp => inp.value = "");
  document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
  document.querySelectorAll("select").forEach(sel => sel.selectedIndex = 0);
  document.querySelectorAll("input[type=number]").forEach(inp => inp.disabled = false);
  recalcular();
}

// =======================================
// Funciones para mostrar materias
// =======================================
function mostrarComunes() {
  // Columna 1
  comunes1Div.innerHTML = "";
  materias.comunes1.forEach((m, i) => {
    if (m.includes("Lengua Extranjera")) {
      comunes1Div.appendChild(crearSelector(["Inglés", "Francés"], "bach1-idioma", m, "Inglés"));
    } else {
      comunes1Div.appendChild(crearCampo(m, "bach1-" + i));
    }
  });

  // Columna 2
  comunes2Div.innerHTML = "";
  materias.comunes2.forEach((m, i) => {
    if (m.includes("Lengua Extranjera")) {
      comunes2Div.appendChild(crearSelector(["Inglés", "Francés"], "bach2-idioma", m, "Inglés"));
    } else {
      comunes2Div.appendChild(crearCampo(m, "bach2-" + i));
    }
  });
}

// =======================================
// Mostrar materias según modalidad
// =======================================
function mostrarModalidad() {
  const bachibac = document.querySelector('input[name="bachibac"]:checked').value === "si";
  const mod = modalidadSelect.value;

  // Limpiar columnas
  modalidad1Div.innerHTML = "";
  modalidad2Div.innerHTML = "";
  opt1Div.innerHTML = "";
  opt2Div.innerHTML = "";

  // 1.º Bachillerato
  materiasModalidad[mod].primero.forEach((m, i) => {
    if (Array.isArray(m)) {
      // Selección múltiple (Ciencias)
      let valDefecto = i === 0 ? "Física y Química" : "Biología y Geología";
      modalidad1Div.appendChild(crearSelector(m, `mod1-${i}`, `Materia de modalidad ${i + 1}`, valDefecto));
    } else {
      modalidad1Div.appendChild(crearCampo(m, `mod1-${i}`));
    }
  });

  // Optativas 1.º solo si NO es Bachibac
  if (!bachibac) {
    opt1Div.appendChild(crearSelector(optativas1, "opt1", "Optativa 1.º", optativas1[0]));
  }

  // 2.º Bachillerato
  materiasModalidad[mod].segundo.forEach((m, i) => {
    if (Array.isArray(m)) {
      modalidad2Div.appendChild(crearSelector(m, `mod2-${i}`, `Materia de modalidad ${i + 1}`, m[0]));
    } else {
      modalidad2Div.appendChild(crearCampo(m, `mod2-${i}`));
    }
  });

  // Optativas 2.º solo si NO es Bachibac
  if (!bachibac) {
    opt2Div.appendChild(crearSelector(optativas2, "opt2", "Optativa 2.º", optativas2[0]));
  }

  // Fase PAU o Prueba Externa
  mostrarFaseGeneral();
  mostrarFaseVoluntaria();
  recalcular();
}

// =======================================
// Mostrar Fase General / Prueba Externa
// =======================================
function mostrarFaseGeneral() {
  const bachibac = document.querySelector('input[name="bachibac"]:checked').value === "si";
  faseGeneralDiv.innerHTML = "";

  if (bachibac) {
    // Prueba Externa
    const materiasExterna = ["Lengua y Literatura Francesa", "Historia de España y Francia"];
    materiasExterna.forEach((m, i) => {
      faseGeneralDiv.appendChild(crearCampo(m, `pau-${i}`));
    });
  } else {
    // Fase General PAU
    const materiasPAU = [
      "Lengua Castellana y Literatura",
      "Valencià: Llengua i Literatura",
      "Lengua Extranjera",
      "Historia de España / Historia de la Filosofía",
      "Matemáticas I / Matemáticas CC Sociales"
    ];
    materiasPAU.forEach((m, i) => {
      if (m.includes("/")) {
        const opciones = m.split("/").map(x => x.trim());
        faseGeneralDiv.appendChild(crearSelector(opciones, `pau-${i}`, `Materia ${i + 1}`));
      } else if (m.includes("Lengua Extranjera")) {
        faseGeneralDiv.appendChild(crearSelector(["Inglés", "Francés", "Alemán", "Italiano"], `pau-${i}`, m, "Francés"));
      } else {
        faseGeneralDiv.appendChild(crearCampo(m, `pau-${i}`));
      }
    });
  }
}

// =======================================
// Mostrar Fase Voluntaria (sin cambios)
// =======================================
function mostrarFaseVoluntaria() {
  faseVolDiv.innerHTML = "";
  for (let i = 1; i <= 2; i++) {
    const div = document.createElement("div");
    div.className = "mb-3";

    const labelMat = document.createElement("label");
    labelMat.textContent = `Voluntaria ${i} — Materia:`;
    div.appendChild(labelMat);

    const inputMat = document.createElement("input");
    inputMat.type = "text";
    inputMat.className = "w-full p-1 border border-gray-300 rounded mt-1";
    div.appendChild(inputMat);

    const labelNota = document.createElement("label");
    labelNota.textContent = "Nota:";
    div.appendChild(labelNota);

    const inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.min = 0;
    inputNota.max = 10;
    inputNota.step = 1;
    inputNota.className = "w-full p-1 border border-gray-300 rounded mt-1";
    div.appendChild(inputNota);

    const labelPond = document.createElement("label");
    labelPond.textContent = "Ponderación:";
    div.appendChild(labelPond);

    const selectPond = document.createElement("select");
    selectPond.innerHTML = `
      <option value="0.1">0.1</option>
      <option value="0.2" selected>0.2</option>
    `;
    selectPond.className = "w-full mt-1 p-1 border border-gray-300 rounded";
    div.appendChild(selectPond);

    inputMat.addEventListener("input", recalcular);
    inputNota.addEventListener("input", recalcular);
    selectPond.addEventListener("change", recalcular);

    faseVolDiv.appendChild(div);
  }
}

// =======================================
// Calculo de medias y NAU/NAT
// =======================================
function obtenerNotas(selector) {
  const inputs = selector.querySelectorAll("input[type=number]");
  const notas = [];
  inputs.forEach(inp => {
    const val = parseFloat(inp.value);
    if (!isNaN(val)) notas.push(val);
  });
  if (notas.length === 0) return 0;
  return notas.reduce((a,b) => a+b, 0) / notas.length;
}

function recalcular() {
  const bachibac = document.querySelector('input[name="bachibac"]:checked').value === "si";

  const media1 = obtenerNotas(document.getElementById("columna1"));
  const media2 = obtenerNotas(document.getElementById("columna2"));
  const mediaBach = (media1 + media2) / 2;

  const mediaExterna = obtenerNotas(faseGeneralDiv);

  const volDivs = faseVolDiv.querySelectorAll("div.mb-3");
  let sumVol = 0;
  let vol1Txt = "", vol2Txt = "";
  volDivs.forEach((d, i) => {
    const nota = parseFloat(d.querySelector("input[type=number]").value) || 0;
    const pond = parseFloat(d.querySelector("select").value);
    const aport = nota * pond;
    sumVol += aport;
    if (i === 0) vol1Txt = `Voluntaria 1: ${aport.toFixed(3)}`;
    else vol2Txt = `Voluntaria 2: ${aport.toFixed(3)}`;
  });

  const nau = bachibac ? 0.7*mediaBach + 0.3*mediaExterna : 0.6*mediaBach + 0.4*mediaExterna;
  const nat = nau + sumVol;

  document.getElementById("media1").textContent = `Media 1.º Bachillerato: ${media1.toFixed(3)}`;
  document.getElementById("media2").textContent = `Media 2.º Bachillerato: ${media2.toFixed(3)}`;
  document.getElementById("media-bach").textContent = `Media Bachillerato: ${mediaBach.toFixed(3)}`;
  document.getElementById("media-ebau").textContent = bachibac ? `Media Prueba Externa: ${mediaExterna.toFixed(3)}` : `Media Fase General PAU: ${mediaExterna.toFixed(3)}`;
  document.getElementById("nau").textContent = `Nota de acceso (NAU): ${nau.toFixed(3)}`;
  document.getElementById("vol1").textContent = vol1Txt;
  document.getElementById("vol2").textContent = vol2Txt;
  document.getElementById("nat").textContent = `Nota total (NAT): ${nat.toFixed(3)}`;
}

// =======================================
// Eventos
// =======================================
modalidadSelect.addEventListener("change", mostrarModalidad);
bachibacRadios.forEach(rb => rb.addEventListener("change", mostrarModalidad));

// Inicialización
mostrarComunes();
mostrarModalidad();

