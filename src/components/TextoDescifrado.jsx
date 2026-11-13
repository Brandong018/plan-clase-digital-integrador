
import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%";

function TextoDescifrado({ texto, espera = 0 }) {
  const referencia = useRef(null);
  const enPantalla = useInView(referencia, {
    once: true,
    amount: 0.4,
  });

  const reducirMovimiento = useReducedMotion();
  const [visible, setVisible] = useState(texto);

  useEffect(() => {
    if (!enPantalla || reducirMovimiento) return;

    let intervalo;
    let progreso = 0;

    const inicio = setTimeout(() => {
      intervalo = setInterval(() => {
        progreso += 0.85;

        const resultado = texto
          .split("")
          .map((letra, indice) => {
            if (letra === " ") return " ";
            if (indice < progreso) return letra;

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
      }, 30);
    }, espera);

    return () => {
      clearTimeout(inicio);
      clearInterval(intervalo);
    };
  }, [texto, espera, enPantalla, reducirMovimiento]);

  return (
    <span ref={referencia} aria-label={texto}>
      <span aria-hidden="true">{visible}</span>
    </span>
  );
}

export default TextoDescifrado;
