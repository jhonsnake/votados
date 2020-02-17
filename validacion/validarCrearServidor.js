export default function validarCrearServidor(valores) {
  let errores = {};

  //Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio.";
  }

  //Validar el departamento o municipio del usuario
  if (!valores.ciudad) {
    errores.ciudad = "El Departamento o municipio es obligatorio.";
  }
  return errores;
}
