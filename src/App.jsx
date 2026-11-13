
import { motion } from "framer-motion";
import "./App.css";

import HeaderClase from "./components/HeaderClase";
import ObjetivoCard from "./components/ObjetivoCard";
import ActividadItem from "./components/ActividadItem";
import EvaluacionForm from "./components/EvaluacionForm";

const animacionSeccion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: "easeOut" },
};

function App() {
  return (
    <>
      <HeaderClase
        tituloTema="Seguridad digital y uso responsable de Internet"
        grado="Segundo Básico"
        nombreDocente="Brandon José Gonzalez Gregorio"
      />

      <main>
        <motion.div {...animacionSeccion} className="seccion-animada">
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
            <li>Consulta con un adulto de confianza ante situaciones de riesgo.</li>
          </ul>
        </motion.section>

        <motion.section
          {...animacionSeccion}
          aria-labelledby="actividades-titulo"
        >
          <h2 id="actividades-titulo">Actividades de aprendizaje</h2>

          <ActividadItem
            titulo="Actividad 1: Protege tus datos"
            descripcion="Lee las recomendaciones de seguridad e identifica tres acciones que puedes aplicar para proteger tu información personal."
          />

          <ActividadItem
            titulo="Actividad 2: Navega responsablemente"
            descripcion="Reflexiona sobre cómo actuarías al recibir mensajes sospechosos o encontrar información poco confiable en Internet."
          />
        </motion.section>

        <motion.div {...animacionSeccion} className="seccion-animada">
          <EvaluacionForm />
        </motion.div>
      </main>

      <footer>
        <p>Plan de Clase Digital Interactivo — Segundo Básico</p>
      </footer>
    </>
  );
}

export default App;
