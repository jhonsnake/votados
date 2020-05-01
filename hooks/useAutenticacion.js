import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAtenticacion() {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario && !usuario.emailVerified) {
        usuario.sendEmailVerification();
        if (usuario.emailVerified) {
          guardarUsuarioAutenticado(usuario);
        }
      } else {
        guardarUsuarioAutenticado(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
}

export default useAtenticacion;
