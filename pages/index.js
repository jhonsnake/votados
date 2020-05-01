import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";
import useServidores from "../hooks/userServidores";
import styled from "@emotion/styled";
import Boton from "../components/ui/Boton";

const Home = () => {
  const { servidoresPublicos } = useServidores("nombre", "asc");
  const [aviso, setAviso] = useState(false);

  const Mensaje = styled.div`
    text-align: center;
    margin-bottom: 20px;
    p {
      display: block;
      margin-bottom: 20px;
    }
  `;

  const MasInfo = styled.div`
    margin-bottom: 20px;
  `;

  return (
    <div>
      <Layout>
        <div className="listado-servidores">
          <div className="contenedor">
            <Mensaje>
              <p>Vote y opine sobre la gestión de sus servidores públicos.</p>
              <Boton
                onClick={() => {
                  setAviso(!aviso);
                }}
              >
                {aviso ? "Ocultar información" : "Quiero saber más"}
              </Boton>
            </Mensaje>

            {aviso && (
              <MasInfo>
                <h2>CALIFIQUE A SU GOBERNADOR Y ALCALDE</h2>
                <p>
                  ¡Bienvenido! Esta es una oportunidad para que usted califique
                  con su propio criterio, sin presiones ni manipulaciones, a su
                  gobernador y alcalde municipal o distrital, de una manera
                  sencilla y rápida, otorgándole en cada una de las tareas de
                  gobierno, un aplauso si su gestión ha sido buena o lanzándole
                  un tomate si considera que lo está haciendo mal.
                </p>

                <h2>¿COMO HACERLO?</h2>

                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/zuZ2a2qj3aA"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </MasInfo>
            )}

            <ul className="bg-white">
              {servidoresPublicos.map((servidor) => (
                <DetallesProducto key={servidor.id} servidor={servidor} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
