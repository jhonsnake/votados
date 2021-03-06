import React, { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [subtmitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if (subtmitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn(); // Funcion que se ejecuta en el componente
      }
      guardarSubmitForm(false);
    }
  }, [errores]);

  //Funcion que se ejecuta cuando el usuario va escribiendo.

  const handleChange = e => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value
    });
  };

  //funcion que se ejecuta onSubmit

  const handleSubmit = e => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  //Cuando el usuario abandona el input tb valida (blur)

  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
  };

  return {
    valores,
    guardarValores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  };
};

export default useValidacion;
