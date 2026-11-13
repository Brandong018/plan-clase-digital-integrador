
import { useState } from "react";
import { motion } from "framer-motion";
import { UserRound, Database, LoaderCircle } from "lucide-react";

import "./App.css";

import HeaderClase from "./components/HeaderClase";
import ObjetivoCard from "./components/ObjetivoCard";
import EvaluacionForm from "./components/EvaluacionForm";
import ActividadClasificacion from "./components/ActividadClasificacion";
import ActividadDecisiones from "./components/ActividadDecisiones";

import { guardarResultado } from "./services/resultadosService";

const animacionSeccion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: "easeOut" },
};

function App() {
  const [estudiante, setEstudiante] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [resultados, setResultados] = useState([]);

  async function registrarResultado(actividad, aciertos, total) {
    if (!estudiante.trim()) {
      setMensaje(
        "Escribe tu alias antes de guardar los resultados."
      );
      return;
    }

    setGuardando(true);
    setMensaje("");

    try {
      await guardarResultado({
        Estudiante: estudiante.trim(),
        Actividad: actividad,
        Aciertos: aciertos,
        Total: total,
      });

      setResultados((anteriores) => [
        ...anteriores,
        { actividad, aciertos, total },
      ]);

      setMensaje(
        `Resultado de "${actividad}" guardado correctamente.`
      );
    } catch (error) {
      setMensaje(
        `No se pudo guardar el resultado: ${error.message}`
      );
    } finally {
      setGuardando(false);
    }
  }

  return (
    <>
      <HeaderClase
        tituloTema="Seguridad digital y uso responsable de Internet"
        grado="Segundo Básico"
        nombreDocente="Brandon José Gonzalez Gregorio"
      />

      <main>
        <motion.div
          {...animacionSeccion}
          className="seccion-animada"
        >
          <ObjetivoCard
            titulo="Objetivo de aprendizaje"
            descripcion="Reconocer los riesgos del entorno digital y aplicar medidas de seguridad para proteger la información personal y utilizar Internet de manera responsable."
          />
        </motion.div>

        <motion.section
          {...animacionSeccion}
          aria-labelledby="contenido-titulo"
        >
          <h2 id="contenido-titulo">
            Aprendamos sobre seguridad digital
          </h2>

          <p>
            La seguridad digital consiste en utilizar herramientas
            tecnológicas de manera responsable, protegiendo nuestra
            información personal y evitando riesgos en Internet.
          </p>

          <h3>Recomendaciones importantes</h3>

          <ul>
            <li>Utiliza contraseñas seguras y privadas.</li>
            <li>No compartas información personal con desconocidos.</li>
            <li>Evita abrir enlaces sospechosos.</li>
            <li>Respeta a otras personas en los espacios digitales.</li>
            <li>
              Consulta con un adulto de confianza ante situaciones de riesgo.
            </li>
          </ul>
        </motion.section>

        <motion.section
          {...animacionSeccion}
          aria-labelledby="registro-titulo"
          className="registro-estudiante"
        >
          <div className="registro-encabezado">
            <UserRound size={26} aria-hidden="true" />
            <h2 id="registro-titulo">
              Identificación del estudiante
            </h2>
          </div>

          <p>
            Escribe un alias para identificar tus resultados.
            No necesitas proporcionar tu nombre real.
          </p>

          <label htmlFor="alias-estudiante">
            Alias del estudiante
          </label>

          <input
            id="alias-estudiante"
            type="text"
            value={estudiante}
            onChange={(evento) =>
              setEstudiante(evento.target.value)
            }
            placeholder="Ejemplo: Estudiante 01"
            maxLength={80}
            autoComplete="off"
          />
        </motion.section>

        <motion.section
          {...animacionSeccion}
          aria-labelledby="actividades-titulo"
        >
          <h2 id="actividades-titulo">
            Actividades de aprendizaje
          </h2>

          <ActividadClasificacion
            onCompletar={(aciertos, total) =>
              registrarResultado(
                "Clasificación",
                aciertos,
                total
              )
            }
          />

          <ActividadDecisiones
            onCompletar={(aciertos, total) =>
              registrarResultado(
                "Simulación de decisiones",
                aciertos,
                total
              )
            }
          />
        </motion.section>

        <motion.div
          {...animacionSeccion}
          className="seccion-animada"
        >
          <EvaluacionForm />
        </motion.div>

        <motion.section
          {...animacionSeccion}
          aria-labelledby="resultados-titulo"
          className="panel-resultados"
        >
          <div className="registro-encabezado">
            <Database size={26} aria-hidden="true" />
            <h2 id="resultados-titulo">
              Registro de resultados
            </h2>
          </div>

          {guardando && (
            <p className="estado-guardado" role="status">
              <LoaderCircle size={18} aria-hidden="true" />
              Guardando resultado...
            </p>
          )}

          {mensaje && (
            <p className="mensaje-registro" role="status">
              {mensaje}
            </p>
          )}

          {resultados.length > 0 ? (
            <ul className="lista-resultados">
              {resultados.map((resultado, indice) => (
                <li key={indice}>
                  <strong>{resultado.actividad}</strong>
                  <span>
                    {resultado.aciertos}/{resultado.total}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Todavía no hay resultados guardados durante
              esta visita.
            </p>
          )}
        </motion.section>
      </main>

      <footer>
        <p>
          Plan de Clase Digital Interactivo — Segundo Básico
        </p>
      </footer>
    </>
  );
}

export default App;
