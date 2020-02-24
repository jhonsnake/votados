import React from "react";
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";
import useServidores from "../hooks/userServidores";

const Populares = () => {
  const { servidoresPublicos } = useServidores(
    "votos_corrupcion_menos",
    "desc"
  );
  return (
    <div>
      <Layout>
        <div className="listado-servidores">
          <div className="contenedor">
            <ul className="bg-white">
              {servidoresPublicos.map(servidor => (
                <DetallesProducto key={servidor.id} servidor={servidor} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Populares;
