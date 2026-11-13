
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import TextoDescifrado from "./TextoDescifrado";

function ActividadItem({ titulo, descripcion }) {
  const [completada, setCompletada] = useState(false);

  return (
    <motion.article
      className={`actividad-item ${completada ? "completada" : ""}`}
      layout
      transition={{ duration: 0.3 }}
    >
      <div className="actividad-encabezado">
        <h3>
  <TextoDescifrado texto={titulo} />
</h3>
        <motion.span
          animate={{
            scale: completada ? [1, 1.25, 1] : 1,
          }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          {completada ? (
            <CheckCircle2 size={26} color="#a3e635" />
          ) : (
            <Circle size={26} color="#a78bfa" />
          )}
        </motion.span>
      </div>

      <p>{descripcion}</p>

      <button
        type="button"
        aria-pressed={completada}
        onClick={() => setCompletada(!completada)}
      >
        {completada ? "Actividad completada" : "Marcar como completada"}
      </button>

      <AnimatePresence>
        {completada && (
          <motion.p
            className="mensaje-completado"
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            ✓ Progreso registrado en esta sesión.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default ActividadItem;
