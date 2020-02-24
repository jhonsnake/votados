import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase/";

const useServidores = (orden, filtro) => {
  const [servidoresPublicos, guardarServidoresPublicos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerServidores = () => {
      firebase.db
        .collection("servidores")
        .orderBy(orden, filtro)
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

  return {
    servidoresPublicos
  };
};

export default useServidores;
