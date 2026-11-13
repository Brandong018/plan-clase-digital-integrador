
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%";

function TextoDescifrado({ texto, espera = 0 }) {
  const reducirMovimiento = useReducedMotion();
  const [visible, setVisible] = useState(
    reducirMovimiento ? texto : ""
  );

  useEffect(() => {
    if (reducirMovimiento) return;

    let intervalo;
    let progreso = 0;

    const inicio = setTimeout(() => {
      intervalo = setInterval(() => {
        progreso += 0.65;

        const resultado = texto
          .split("")
          .map((letra, indice) => {
            if (letra === " ") return " ";

            if (indice < progreso) {
              return letra;
            }

            return caracteres[
              Math.floor(Math.random() * caracteres.length)
            ];
          })
          .join("");

        setVisible(resultado);

        if (progreso >= texto.length) {
          clearInterval(intervalo);
          setVisible(texto);
        }
      }, 35);
    }, espera);

    return () => {
      clearTimeout(inicio);
      clearInterval(intervalo);
    };
  }, [texto, espera, reducirMovimiento]);

  return (
    <span aria-label={texto}>
      <span aria-hidden="true">{visible}</span>
    </span>
  );
}

function HeaderClase({ tituloTema, grado, nombreDocente }) {
  const reducirMovimiento = useReducedMotion();

  return (
    <header className="header-clase">
      <div className="holograma-contenedor">
        {!reducirMovimiento && (
          <>
            <motion.h1
              className="holograma-capa holograma-verde"
              aria-hidden="true"
              initial={{ opacity: 0, x: -18, y: -8 }}
              animate={{
                opacity: [0, 0.65, 0],
                x: [-18, -5, 0],
                y: [-8, 0, 0],
              }}
              transition={{
                duration: 1.15,
                times: [0, 0.65, 1],
                ease: "easeOut",
              }}
            >
              {tituloTema}
            </motion.h1>

            <motion.h1
              className="holograma-capa holograma-morada"
              aria-hidden="true"
              initial={{ opacity: 0, x: 18, y: 8 }}
              animate={{
                opacity: [0, 0.65, 0],
                x: [18, 5, 0],
                y: [8, 0, 0],
              }}
              transition={{
                duration: 1.15,
                times: [0, 0.65, 1],
                ease: "easeOut",
              }}
            >
              {tituloTema}
            </motion.h1>
          </>
        )}

        <motion.h1
          className="holograma-principal"
          initial={
            reducirMovimiento
              ? false
              : { opacity: 0, filter: "blur(6px)" }
          }
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.75,
            delay: reducirMovimiento ? 0 : 0.45,
          }}
        >
          {tituloTema}
        </motion.h1>
      </div>

      <motion.div
        className="header-datos"
        initial={reducirMovimiento ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: reducirMovimiento ? 0 : 0.8,
        }}
      >
        <p>
          <strong>Grado: </strong>
          <TextoDescifrado texto={grado} espera={850} />
        </p>

        <p>
          <strong>Docente: </strong>
          <TextoDescifrado
            texto={nombreDocente}
            espera={1000}
          />
        </p>
      </motion.div>
    </header>
  );
}

export default HeaderClase;
