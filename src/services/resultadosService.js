
const API_URL = "/api/resultados";

async function solicitarAPI(opciones = {}) {
  let respuesta;

  try {
    respuesta = await fetch(API_URL, opciones);
  } catch {
    throw new Error(
      "No se pudo conectar con el servidor. Revisa tu conexión."
    );
  }

  let datos;

  try {
    datos = await respuesta.json();
  } catch {
    throw new Error("El servidor devolvió una respuesta no válida.");
  }

  if (!respuesta.ok) {
    throw new Error(
      datos.error || "No se pudo completar la operación."
    );
  }

  return datos;
}

export async function guardarResultado(resultado) {
  return solicitarAPI({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultado),
  });
}

export async function obtenerResultados() {
  return solicitarAPI();
}
