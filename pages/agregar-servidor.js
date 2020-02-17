import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
  Exito
} from "../components/ui/Formulario";
//firebase
import { FirebaseContext } from "../firebase";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearServidor from "../validacion/validarCrearServidor";
import Error404 from "../components/layout/404";

const STATE_INICIAL = {
  nombre: "",
  ciudad: "",
  departamento: "",
  // imagen: "",
  url: "",
  descripcion: "",
  tipo: ""
};

const AgregarServidor = () => {
  //state de las imagenes
  const [nombreImagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");

  const [error, guardarError] = useState(false);
  const [exito, guardarExito] = useState(false);

  const {
    valores,
    guardarValores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidacion(STATE_INICIAL, validarCrearServidor, crearServidor);

  const {
    nombre,
    ciudad,
    departamento,
    url,
    descripcion,
    tipo,
    partido
  } = valores;

  //Hook de routing para redireccionar

  const router = useRouter();

  //Context con las operaciones CRUD de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearServidor() {
    // Si el usuario no esta autenticado llevalo al login
    if (!usuario) {
      return router.push("/login");
    }

    //crear el objeto de nuevo servidor

    const servidor = {
      nombre,
      ciudad,
      departamento,
      url,
      urlimagen,
      descripcion,
      tipo,
      partido,

      votos_salud_mas: 0,
      votos_salud_menos: 0,
      votos_educacion_mas: 0,
      votos_educacion_menos: 0,
      votos_infraestructura_mas: 0,
      votos_infraestructura_menos: 0,
      votos_vivienda_mas: 0,
      votos_vivienda_menos: 0,
      votos_cultura_mas: 0,
      votos_cultura_menos: 0,
      votos_corrupcion_menos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotadoSalud: [],
      haVotadoEducacion: [],
      haVotadoInfraestructura: [],
      haVotadoVivienda: [],
      haVotadoCultura: [],
      haVotadoCorrupcion: []
    };

    //insertarlo en la base de datos
    firebase.db.collection("servidores").add(servidor);
    guardarExito("Servidor agregado correctamente");

    setTimeout(() => {
      guardarExito(false);
      guardarValores(STATE_INICIAL);
    }, 1000);
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase.storage
      .ref("servidores")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        guardarUrlImagen(url);
      });
  };

  return (
    <div>
      <Layout>
        {!usuario ? (
          <Error404 />
        ) : (
          <>
            <h1
              css={css`
                text-align: center;
                margin-bottom: 5rem;
              `}
            >
              Nuevo Servidor Público
            </h1>
            <Formulario onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Información General</legend>

                <Campo>
                  <label htmlFor="nombre">Nombres y Apellidos</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombres y Apellidos"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.nombre && <Error>{errores.nombre}</Error>}

                <Campo>
                  <label htmlFor="ciudad">Municipio</label>
                  <input
                    type="text"
                    id="ciudad"
                    placeholder="Municipio"
                    name="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.ciudad && <Error>{errores.ciudad}</Error>}

                <Campo>
                  <label htmlFor="departamento">Departamento</label>
                  <input
                    type="text"
                    id="departamento"
                    placeholder="Departamento"
                    name="departamento"
                    value={departamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.departamento && <Error>{errores.departamento}</Error>}
                <Campo>
                  <label htmlFor="tipo">Tipo de servidor</label>
                  <input
                    type="text"
                    id="tipo"
                    placeholder="Alcalde, Gobernador, otro"
                    name="tipo"
                    value={tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.tipo && <Error>{errores.tipo}</Error>}
                <Campo>
                  <label htmlFor="partido">Partido</label>
                  <input
                    type="text"
                    id="partido"
                    placeholder="Partido político o afiliación"
                    name="partido"
                    value={partido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.partido && <Error>{errores.partido}</Error>}

                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFileName
                    storageRef={firebase.storage.ref("servidores")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={url}
                    placeholder="Pagina del servidor público"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.url && <Error>{errores.url}</Error>}
              </fieldset>
              <fieldset>
                <legend>Datos reelevantes de este servidor público</legend>
                <Campo>
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    type="descripcion"
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}
              {exito && <Exito>{exito}</Exito>}
              <InputSubmit type="submit" value="Crear servidor" />
            </Formulario>
          </>
        )}
      </Layout>
    </div>
  );
};

export default AgregarServidor;
