import React, { useContext, useEffect } from "react";
import { css } from "@emotion/core";
import { VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from "victory";

const width = 500;
const height = 500;
const padding = { top: 80, bottom: 80, left: 20, right: 20 };

const Grafica = ({ servidor }) => {
  const votosPositivos = [
    {
      x: "Salud",
      y:
        (servidor.votos_salud_mas * 100) /
        (servidor.votos_salud_mas + servidor.votos_salud_menos)
    },
    {
      x: "Educación",
      y:
        (servidor.votos_educacion_mas * 100) /
        (servidor.votos_educacion_mas + servidor.votos_educacion_menos)
    },
    {
      x: "Infraestructura",
      y:
        (servidor.votos_infraestructura_mas * 100) /
        (servidor.votos_infraestructura_mas +
          servidor.votos_infraestructura_menos)
    },
    {
      x: "Vivienda",
      y:
        (servidor.votos_vivienda_mas * 100) /
        (servidor.votos_vivienda_mas + servidor.votos_vivienda_menos)
    },
    {
      x: "Cultura",
      y:
        (servidor.votos_cultura_mas * 100) /
        (servidor.votos_cultura_mas + servidor.votos_cultura_menos)
    },
    {
      x: "Corrupción",
      y: (servidor.votos_corrupcion_menos * 100) / 50000
    }
  ];

  const votosNegativos = [
    {
      x: "Salud",
      y:
        (servidor.votos_salud_menos * 100) /
        (servidor.votos_salud_mas + servidor.votos_salud_menos)
    },
    {
      x: "Educación",
      y:
        (servidor.votos_educacion_menos * 100) /
        (servidor.votos_educacion_mas + servidor.votos_educacion_menos)
    },
    {
      x: "Infraestructura",
      y:
        (servidor.votos_infraestructura_menos * 100) /
        (servidor.votos_infraestructura_mas +
          servidor.votos_infraestructura_menos)
    },
    {
      x: "Vivienda",
      y:
        (servidor.votos_vivienda_menos * 100) /
        (servidor.votos_vivienda_mas + servidor.votos_vivienda_menos)
    },
    {
      x: "Cultura",
      y:
        (servidor.votos_cultura_menos * 100) /
        (servidor.votos_cultura_mas + servidor.votos_cultura_menos)
    },

    {
      x: "Corrupción",
      y: 1
    }
  ];

  return (
    <div>
      <h2>Resultados Mala Gestión vs Buena Gestión</h2>
      <div
        css={css`
          display: block;
          margin: 0 auto;
          margin-top: -30px;
        `}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto" }}
        >
          <VictoryStack
            horizontal
            standalone={false}
            /* setting a symmetric domain makes it much easier to center the axis  */
            domain={{ y: [-150, 150] }}
            padding={padding}
            height={height}
            width={width}
            style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
          >
            <VictoryBar
              style={{ data: { fill: "green" } }}
              data={votosPositivos}
              y={data => -Math.abs(data.y)}
              labels={({ datum }) => `${datum.x} ${datum.y} %`}
            />
            <VictoryBar
              style={{ data: { fill: "red" } }}
              data={votosNegativos}
              labels={({ datum }) => `${datum.x} ${datum.y} % `}
            />
          </VictoryStack>
        </svg>
      </div>
    </div>
  );
};

export default Grafica;
