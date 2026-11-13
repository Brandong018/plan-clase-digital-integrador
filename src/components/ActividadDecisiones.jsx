
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorCheck, RotateCcw } from "lucide-react";
import TextoDescifrado from "./TextoDescifrado";

const escenarios = [
  {
    situacion:
      "Recibes un mensaje que promete premios gratuitos si ingresas tu contraseña.",
    opciones: [
      "Ingresar la contraseña para recibir el premio.",
      "Ignorar el mensaje y reportarlo.",
      "Reenviar el mensaje a tus amigos.",
    ],
    correcta: 1,
    explicacion:
      "Los mensajes que solicitan contraseñas pueden ser intentos de phishing.",
  },
  {
    situacion:
      "Una persona desconocida te pide tu ubicación mientras juegas en línea.",
    opciones: [
      "Compartir mi dirección para hacer amistad.",
      "Enviar mi ubicación solamente una vez.",
      "No compartir datos personales y bloquear si insiste.",
    ],
    correcta: 2,
    explicacion:
      "Tu ubicación y dirección son datos privados que debes proteger.",
  },
  {
    situacion:
      "Un compañero está siendo insultado en un grupo de mensajes.",
    opciones: [
      "No participar, conservar evidencias y pedir ayuda a un adulto de confianza.",
      "Compartir los insultos en otros grupos.",
      "Responder con más insultos.",
    ],
    correcta: 0,
    explicacion:
      "Actuar con respeto y buscar ayuda contribuye a prevenir el ciberacoso.",
  },
];

function ActividadDecisiones({ onCompletar }) {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [confirmada, setConfirmada] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [terminada, setTerminada] = useState(false);

  const escenario = escenarios[indice];
  const esCorrecta = seleccion === escenario.correcta;

  function confirmar() {
    if (seleccion === null || confirmada) return;

    setConfirmada(true);

    if (esCorrecta) {
      setPuntos((anteriores) => anteriores + 1);
    }
  }

  function siguiente() {
    if (indice === escenarios.length - 1) {
      const total = puntos;
      setTerminada(true);
      onCompletar?.(total, escenarios.length);
      return;
    }

    setIndice((anterior) => anterior + 1);
    setSeleccion(null);
    setConfirmada(false);
  }

  function reiniciar() {
    setIndice(0);
    setSeleccion(null);
    setConfirmada(false);
    setPuntos(0);
    setTerminada(false);
  }

  return (
    <section className="actividad-interactiva">
      <div className="actividad-titulo">
        <MonitorCheck size={27} aria-hidden="true" />
        <h3>
          <TextoDescifrado texto="Actividad 2: Navega responsablemente" />
        </h3>
      </div>

      {!terminada ? (
        <>
          <p className="contador-actividad">
            Escenario {indice + 1} de {escenarios.length}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={indice}
              className="escenario-panel"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.25 }}
            >
              <h4>¿QUÉ HARÍAS EN ESTA SITUACIÓN?</h4>
              <p>{escenario.situacion}</p>

              <div className="opciones-decision">
                {escenario.opciones.map((opcion, posicion) => (
                  <button
                    key={posicion}
                    type="button"
                    disabled={confirmada}
                    aria-pressed={seleccion === posicion}
                    className={
                      seleccion === posicion
                        ? "opcion-seleccionada"
                        : ""
                    }
                    onClick={() => setSeleccion(posicion)}
                  >
                    {opcion}
                  </button>
                ))}
              </div>

              {confirmada && (
                <div
                  className={`retroalimentacion ${
                    esCorrecta ? "acierto" : "error"
                  }`}
                  role="status"
                >
                  <strong>
                    {esCorrecta
                      ? "DECISIÓN SEGURA"
                      : "DECISIÓN DE RIESGO"}
                  </strong>
                  <p>{escenario.explicacion}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {!confirmada ? (
            <button
              type="button"
              disabled={seleccion === null}
              onClick={confirmar}
            >
              Confirmar decisión
            </button>
          ) : (
            <button type="button" onClick={siguiente}>
              {indice === escenarios.length - 1
                ? "Ver resultado final"
                : "Siguiente escenario"}
            </button>
          )}
        </>
      ) : (
        <motion.div
          className="resultado-actividad"
          role="status"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>SIMULACIÓN FINALIZADA</h4>
          <p>
            Tomaste {puntos} de {escenarios.length} decisiones correctas.
          </p>
          <p>
            {puntos === escenarios.length
              ? "¡Excelente! Demostraste un buen criterio de seguridad digital."
              : "Cada decisión es una oportunidad para aprender a navegar con mayor seguridad."}
          </p>

          <button type="button" onClick={reiniciar}>
            <RotateCcw size={16} aria-hidden="true" />
            Repetir simulación
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default ActividadDecisiones;
