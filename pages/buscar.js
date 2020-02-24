import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/layout/DetallesProducto";
import useServidores from "../hooks/userServidores";

const Buscar = () => {
  const router = useRouter();
  const {
    query: { q }
  } = router;

  //Todos los servidores
  const { servidoresPublicos } = useServidores("nombre", "asc");
  const [resultado, guardarResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLocaleLowerCase();
    const filtro = servidoresPublicos.filter(servidor => {
      return (
        servidor.nombre.toLocaleLowerCase().includes(busqueda) ||
        servidor.departamento.toLocaleLowerCase().includes(busqueda) ||
        servidor.ciudad.toLocaleLowerCase().includes(busqueda) ||
        servidor.partido.toLocaleLowerCase().includes(busqueda)
      );
    });
    guardarResultado(filtro);
  }, [q, servidoresPublicos]);

  return (
    <div>
      <Layout>
        <div className="listado-servidores">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map(servidor => (
                <DetallesProducto key={servidor.id} servidor={servidor} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
