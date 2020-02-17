import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import DetallesProducto from "../components/layout/DetallesProducto";

const Home = () => {
  const [servidoresPublicos, guardarServidoresPublicos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerServidores = () => {
      firebase.db
        .collection("servidores")
        .orderBy("nombre", "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerServidores();
  }, []);

  function manejarSnapshot(snapshot) {
    const servidores = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });

    guardarServidoresPublicos(servidores);
  }
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

export default Home;
