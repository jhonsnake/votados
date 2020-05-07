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

  function renderServidores() {
    if (servidoresPublicos.length > 10) {
      return <p>Por favor haga una búsqueda</p>;
    } else {
      return servidoresPublicos.map((servidor) => (
        <DetallesProducto key={servidor.id} servidor={servidor} />
      ));
    }
  }

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

                <div
                  className="video"
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%" /* 16:9 */,
                    paddingTop: 25,
                    height: 0,
                  }}
                >
                  <iframe
                    allowFullScreen="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    src={`https://www.youtube.com/embed/zuZ2a2qj3aA`}
                    frameBorder="0"
                  />
                </div>
              </MasInfo>
            )}

            <ul className="bg-white">{renderServidores()}</ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
