
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

function EvaluacionForm({ onCompletar }) {
  const [respuesta, setRespuesta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [registrado, setRegistrado] = useState(false);

  function verificarRespuesta(evento) {
    evento.preventDefault();

    if (!respuesta) return;

    const esCorrecta = respuesta === "correcta";

    setResultado(
      esCorrecta ? "correcto" : "incorrecto"
    );

    // Registrar únicamente cuando la respuesta sea correcta.
    if (esCorrecta && !registrado) {
      setRegistrado(true);
      onCompletar?.(1, 1);
    }
  }

  function cambiarRespuesta(evento) {
    setRespuesta(evento.target.value);
    setResultado(null);
  }

  return (
    <section className="evaluacion-form">
      <div className="evaluacion-encabezado">
        <ShieldCheck size={28} aria-hidden="true" />
        <h2>Mini evaluación</h2>
      </div>

      <p>
        Comprueba lo aprendido sobre seguridad digital.
      </p>

      <form onSubmit={verificarRespuesta}>
        <label htmlFor="respuesta-seguridad">
          ¿Qué debes hacer si recibes un mensaje sospechoso
          solicitando tu contraseña?
        </label>

        <select
          id="respuesta-seguridad"
          value={respuesta}
          onChange={cambiarRespuesta}
          required
        >
          <option value="">
            Selecciona una respuesta
          </option>

          <option value="incorrecta1">
            Compartir la contraseña para verificar mi cuenta
          </option>

          <option value="correcta">
            No compartirla y reportar el mensaje
          </option>

          <option value="incorrecta2">
            Abrir todos los enlaces del mensaje
          </option>
        </select>

        <button type="submit">
          Verificar respuesta
        </button>
      </form>

      <AnimatePresence mode="wait">
        {resultado && (
          <motion.div
            key={resultado}
            className={`resultado-evaluacion ${resultado}`}
            role="status"
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <div className="resultado-icono">
              {resultado === "correcto" ? (
                <CheckCircle2
                  size={30}
                  aria-hidden="true"
                />
              ) : (
                <AlertTriangle
                  size={30}
                  aria-hidden="true"
                />
              )}
            </div>

            <div>
              <h3>
                {resultado === "correcto"
                  ? "ACCESO AUTORIZADO"
                  : "ALERTA DE SEGURIDAD"}
              </h3>

              <p>
                {resultado === "correcto"
                  ? "¡Excelente! Identificaste la acción correcta. Nunca compartas tus contraseñas ante mensajes sospechosos."
                  : "Esa acción podría poner en riesgo tu información. Revisa las opciones e inténtalo nuevamente."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default EvaluacionForm;
