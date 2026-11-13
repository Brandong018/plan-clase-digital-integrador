
const NOCODB_URL =
  "https://app.nocodb.com/api/v3/data/p3lg0mennyh9nr2/mtsmwu72ng2cyr8/records";

export default async function handler(req, res) {
  const token = process.env.NOCODB_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "La conexión con NocoDB no está configurada.",
    });
  }

  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({
      error: "Método no permitido.",
    });
  }

  try {
    let respuesta;

    if (req.method === "GET") {
      respuesta = await fetch(NOCODB_URL, {
        headers: {
          "xc-token": token,
        },
      });
    } else {
      const { Estudiante, Actividad, Aciertos, Total } =
        req.body ?? {};

      if (
        typeof Estudiante !== "string" ||
        !Estudiante.trim() ||
        Estudiante.length > 80 ||
        typeof Actividad !== "string" ||
        !Actividad.trim() ||
        Actividad.length > 80 ||
        !Number.isInteger(Aciertos) ||
        !Number.isInteger(Total) ||
        Total < 1 ||
        Aciertos < 0 ||
        Aciertos > Total
      ) {
        return res.status(400).json({
          error: "Los datos del resultado no son válidos.",
        });
      }

      respuesta = await fetch(NOCODB_URL, {
        method: "POST",
        headers: {
          "xc-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Estudiante: Estudiante.trim(),
          Actividad: Actividad.trim(),
          Aciertos,
          Total,
          Fecha: new Date().toISOString(),
        }),
      });
    }

    if (!respuesta.ok) {
      console.error(
        "Error de NocoDB:",
        respuesta.status
      );

      return res.status(502).json({
        error: "No se pudo completar la operación con NocoDB.",
      });
    }

    const datos = await respuesta.json();
    return res.status(200).json(datos);
  } catch (error) {
    console.error("Error de conexión:", error.message);

    return res.status(500).json({
      error: "No se pudo establecer conexión con NocoDB.",
    });
  }
}
