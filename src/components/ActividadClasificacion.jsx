
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, RotateCcw } from "lucide-react";
import TextoDescifrado from "./TextoDescifrado";

const situaciones = [
  {
    texto: "Utilizar una contraseña diferente para cada cuenta.",
    respuesta: "segura",
  },
  {
    texto: "Compartir tu dirección con alguien que conociste en un videojuego.",
    respuesta: "peligrosa",
  },
  {
    texto: "Verificar quién envía un enlace antes de abrirlo.",
    respuesta: "segura",
  },
  {
    texto: "Publicar fotografías de documentos personales en redes sociales.",
    respuesta: "peligrosa",
  },
  {
    texto: "Avisar a un adulto de confianza si recibes mensajes amenazantes.",
    respuesta: "segura",
  },
];

function ActividadClasificacion({ onCompletar }) {
  const [respuestas, setRespuestas] = useState({});
  const [finalizada, setFinalizada] = useState(false);

  const totalRespondidas = Object.keys(respuestas).length;

  const aciertos = situaciones.filter(
    (situacion, indice) =>
      respuestas[indice] === situacion.respuesta
  ).length;

  function seleccionar(indice, respuesta) {
    if (finalizada) return;

    setRespuestas((anteriores) => ({
      ...anteriores,
      [indice]: respuesta,
    }));
  }

  function verificar() {
    if (totalRespondidas !== situaciones.length) return;

    setFinalizada(true);
    onCompletar?.(aciertos, situaciones.length);
  }

  function reiniciar() {
    setRespuestas({});
    setFinalizada(false);
  }

  return (
    <section className="actividad-interactiva">
      <div className="actividad-titulo">
        <ShieldCheck size={27} aria-hidden="true" />
        <h3>
          <TextoDescifrado texto="Actividad 1: Protege tus datos" />
        </h3>
      </div>

      <p>
        Analiza cada situación y selecciona si es una
        práctica segura o peligrosa.
      </p>

      <div className="situaciones-lista">
        {situaciones.map((situacion, indice) => (
          <div className="situacion-card" key={indice}>
            <p>
              <strong>{String(indice + 1).padStart(2, "0")}.</strong>{" "}
              {situacion.texto}
            </p>

            <div className="opciones-clasificacion">
              {["segura", "peligrosa"].map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  className={
                    respuestas[indice] === opcion
                      ? "opcion-seleccionada"
                      : ""
                  }
                  aria-pressed={respuestas[indice] === opcion}
                  disabled={finalizada}
                  onClick={() => seleccionar(indice, opcion)}
                >
                  {opcion === "segura" ? "Segura" : "Peligrosa"}
                </button>
              ))}
            </div>

            {finalizada && (
              <p className="respuesta-detalle">
                {respuestas[indice] === situacion.respuesta
                  ? "✓ Respuesta correcta"
                  : `Respuesta correcta: ${situacion.respuesta}`}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="contador-actividad">
        Situaciones respondidas: {totalRespondidas}/{situaciones.length}
      </p>

      {!finalizada ? (
        <button
          type="button"
          disabled={totalRespondidas !== situaciones.length}
          onClick={verificar}
        >
          Verificar respuestas
        </button>
      ) : (
        <button type="button" onClick={reiniciar}>
          <RotateCcw size={16} aria-hidden="true" />
          Intentar nuevamente
        </button>
      )}

      <AnimatePresence>
        {finalizada && (
          <motion.div
            className="resultado-actividad"
            role="status"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h4>ANÁLISIS COMPLETADO</h4>
            <p>
              Obtuviste {aciertos} de {situaciones.length} respuestas correctas.
            </p>
            <p>
              {aciertos === situaciones.length
                ? "¡Excelente! Identificaste correctamente todas las situaciones."
                : "Revisa las respuestas y vuelve a intentarlo para mejorar."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ActividadClasificacion;
