import React, { useEffect, useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import Grafica from "../../components/ui/Grafica";

const ContenedorServidor = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorServidor = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Avatar = styled.img`
  margin: 0 auto;
  display: block;
  max-height: 160px;
`;

const Votacion = styled.div`
  div {
    margin-top: 5rem;
    p {
      text-align: center;
    }
  }
`;

const VotosContenedor = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryContainer = styled.div`
  display: flex;

  width: 200px;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IconoVotacion = styled.img`
  margin-top: -20px;
`;

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConteoVotos = styled.p`
  font-size: 12px;
  text-align: center;
  margin: 5px 0;
  color: ${(props) => props.color};
`;
const BotonVotar = styled.button`
  width: 4rem;
  height: 4rem;
  background: none;
  margin: 0 10px;
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    width: 5rem;
    height: 5rem;
  }
`;

const Gif = styled.img`
  margin: 0 auto;
  z-index: 999;
  margin-top: -160px;
  width: 160px;
  height: 160px;
  display: block;
`;

function Servidor() {
  //state del componente
  const [servidor, guardarServidor] = useState({});
  const [error, guardarError] = useState(false);
  const [ejecutarGif, setEjecutarGif] = useState({
    play: false,
    url: "",
  });

  const [comentario, guardarComentario] = useState({});
  const [consultarDB, guardarConsultarDB] = useState(true);
  const [ip, setIp] = useState(null);

  //context del firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  const router = useRouter();
  const {
    query: { id },
  } = router;
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const servidorAvatar = useRef();
  const AudioBooRef = useRef();
  const AudioAplausosRef = useRef();

  useEffect(() => {
    async function getUserIp() {
      const userIpResponse = await fetch("https://api.ipify.org?format=json	");
      const userIp = await userIpResponse.json();
      setIp(userIp.ip);
    }

    getUserIp();
    if (id && consultarDB) {
      const obtenerServidor = async () => {
        const productoQuery = await firebase.db
          .collection("servidores")
          .doc(id);
        const servidor = await productoQuery.get();
        if (servidor.exists) {
          guardarServidor(servidor.data());
          guardarConsultarDB(false);
        } else {
          guardarError(true);
          guardarConsultarDB(false);
        }
      };
      obtenerServidor();
    }
  }, [id]);

  if (!error && Object.keys(servidor).length === 0) return <p>Cargando...</p>;
  const {
    nombre,
    ciudad,
    departamento,
    url,
    urlimagen,
    descripcion,
    tipo,
    partido,
    votos_salud_mas,
    votos_salud_menos,
    votos_educacion_mas,
    votos_educacion_menos,
    votos_infraestructura_mas,
    votos_infraestructura_menos,
    votos_vivienda_mas,
    votos_vivienda_menos,
    votos_cultura_mas,
    votos_cultura_menos,
    votos_corrupcion_menos,
    comentarios,
    creado,
    creador,
    haVotadoSalud,
    haVotadoEducacion,
    haVotadoInfraestructura,
    haVotadoVivienda,
    haVotadoCultura,
    haVotadoCorrupcion,
  } = servidor;

  //Administrar y validar los votos

  //SALUD
  const VotarSaludMas = () => {
    //obtener y sumar votos salud
    const totalSaludMas = votos_salud_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoSalud.includes(ip)) return;
    lanzarAplauso();
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoSalud = [...haVotadoSalud, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_salud_mas: totalSaludMas,
      haVotadoSalud: nuevoHaVotadoSalud,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_salud_mas: totalSaludMas,
      haVotadoSalud: nuevoHaVotadoSalud,
    });
    guardarConsultarDB(true);
  };

  const VotarSaludMenos = () => {
    //obtener y sumar votos salud
    const totalSaludMenos = votos_salud_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoSalud.includes(ip)) return;
    lanzarTomate();

    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoSalud = [...haVotadoSalud, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_salud_menos: totalSaludMenos,
      haVotadoSalud: nuevoHaVotadoSalud,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_salud_menos: totalSaludMenos,
      haVotadoSalud: nuevoHaVotadoSalud,
    });
    guardarConsultarDB(true);
  };

  //EDUCACIÓN

  const VotarEducacionMas = () => {
    //obtener y sumar votos salud
    const totalEducacionMas = votos_educacion_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoEducacion.includes(ip)) return;
    lanzarAplauso();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoEducacion = [...haVotadoEducacion, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_educacion_mas: totalEducacionMas,
      haVotadoEducacion: nuevoHaVotadoEducacion,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_educacion_mas: totalEducacionMas,
      haVotadoEducacion: nuevoHaVotadoEducacion,
    });
    guardarConsultarDB(true);
  };

  const VotarEducacionMenos = () => {
    //obtener y sumar votos Educacion
    const totalEducacionMenos = votos_educacion_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoEducacion.includes(ip)) return;
    lanzarTomate();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoEducacion = [...haVotadoEducacion, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_educacion_menos: totalEducacionMenos,
      haVotadoEducacion: nuevoHaVotadoEducacion,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_educacion_menos: totalEducacionMenos,
      haVotadoEducacion: nuevoHaVotadoEducacion,
    });
    guardarConsultarDB(true);
  };

  //INFRAESTRUCTURA

  const VotarInfraestructuraMas = () => {
    //obtener y sumar votos salud
    const totalInfraestructuraMas = votos_infraestructura_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoInfraestructura.includes(ip)) return;
    lanzarAplauso();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoInfraestructura = [...haVotadoInfraestructura, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_infraestructura_mas: totalInfraestructuraMas,
      haVotadoInfraestructura: nuevoHaVotadoInfraestructura,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_infraestructura_mas: totalInfraestructuraMas,
      haVotadoInfraestructura: nuevoHaVotadoInfraestructura,
    });
    guardarConsultarDB(true);
  };

  const VotarInfraestructuraMenos = () => {
    //obtener y sumar votos Infraestructura
    const totalInfraestructuraMenos = votos_infraestructura_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoInfraestructura.includes(ip)) return;
    lanzarTomate();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoInfraestructura = [...haVotadoInfraestructura, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_infraestructura_menos: totalInfraestructuraMenos,
      haVotadoInfraestructura: nuevoHaVotadoInfraestructura,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_infraestructura_menos: totalInfraestructuraMenos,
      haVotadoInfraestructura: nuevoHaVotadoInfraestructura,
    });
    guardarConsultarDB(true);
  };
  //VIVIENDA

  const VotarViviendaMas = () => {
    //obtener y sumar votos salud
    const totalViviendaMas = votos_vivienda_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoVivienda.includes(ip)) return;
    lanzarAplauso();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoVivienda = [...haVotadoVivienda, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_vivienda_mas: totalViviendaMas,
      haVotadoVivienda: nuevoHaVotadoVivienda,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_vivienda_mas: totalViviendaMas,
      haVotadoVivienda: nuevoHaVotadoVivienda,
    });
    guardarConsultarDB(true);
  };

  const VotarViviendaMenos = () => {
    //obtener y sumar votos Vivienda
    const totalViviendaMenos = votos_vivienda_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoVivienda.includes(ip)) return;
    lanzarTomate();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoVivienda = [...haVotadoVivienda, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_vivienda_menos: totalViviendaMenos,
      haVotadoVivienda: nuevoHaVotadoVivienda,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_vivienda_menos: totalViviendaMenos,
      haVotadoVivienda: nuevoHaVotadoVivienda,
    });
    guardarConsultarDB(true);
  };
  //CULTURA

  const VotarCulturaMas = () => {
    //obtener y sumar votos salud
    const totalCulturaMas = votos_cultura_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoCultura.includes(ip)) return;
    lanzarAplauso();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoCultura = [...haVotadoCultura, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_cultura_mas: totalCulturaMas,
      haVotadoCultura: nuevoHaVotadoCultura,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_cultura_mas: totalCulturaMas,
      haVotadoCultura: nuevoHaVotadoCultura,
    });
    guardarConsultarDB(true);
  };

  const VotarCulturaMenos = () => {
    //obtener y sumar votos Cultura
    const totalCulturaMenos = votos_cultura_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoCultura.includes(ip)) return;
    lanzarTomate();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoCultura = [...haVotadoCultura, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_cultura_menos: totalCulturaMenos,
      haVotadoCultura: nuevoHaVotadoCultura,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_cultura_menos: totalCulturaMenos,
      haVotadoCultura: nuevoHaVotadoCultura,
    });
    guardarConsultarDB(true);
  };

  //CORRUPCION

  const VotarCorrupcionMenos = () => {
    //obtener y sumar votos Corrupcion
    const totalCorrupcionMenos = votos_corrupcion_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoCorrupcion.includes(ip)) return;
    lanzarTomate();
    //Guardar el id del usuario que ha votado

    const nuevoHaVotadoCorrupcion = [...haVotadoCorrupcion, ip];

    //Actualizar en la BD
    firebase.db.collection("servidores").doc(id).update({
      votos_corrupcion_menos: totalCorrupcionMenos,
      haVotadoCorrupcion: nuevoHaVotadoCorrupcion,
    });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_corrupcion_menos: totalCorrupcionMenos,
      haVotadoCorrupcion: nuevoHaVotadoCorrupcion,
    });
    guardarConsultarDB(true);
  };

  function lanzarTomate() {
    scrollToRef(servidorAvatar);
    if (!AudioBooRef) {
      return;
    }
    AudioBooRef.current.currentTime = 0;
    AudioBooRef.current.play();
    setEjecutarGif({
      play: false,
      url: "",
    });
    setEjecutarGif({
      play: true,
      url: "/static/img/tomatogif.gif?a=" + Math.random(),
    });
  }

  function lanzarAplauso() {
    scrollToRef(servidorAvatar);
    if (!AudioAplausosRef) {
      return;
    }
    AudioAplausosRef.current.currentTime = 0;
    AudioAplausosRef.current.play();
    setEjecutarGif({
      play: false,
      url: "",
    });
    setEjecutarGif({
      play: true,
      url: "/static/img/aplausosgif.gif?a=" + Math.random(),
    });

    setTimeout(() => {
      setEjecutarGif({
        play: false,
        url: "",
      });
    }, 5000);
  }

  //Crear comentarios

  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //Identifica si el comentario pertenece al creador del producto

  const esCreador = (id) => {
    if (creador.id == id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    // Información extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    // Tomar copia de comentarios y agregarlos al arreglo

    const nuevosComentarios = [...comentarios, comentario];

    //Actualizar BD
    firebase.db.collection("servidores").doc(id).update({
      comentarios: nuevosComentarios,
    });

    //Actualizar State
    guardarServidor({ ...servidor, comentarios: nuevosComentarios });
    guardarConsultarDB(true);
  };

  //funcion que revisa que el creador del producto sea el mismo autenticado

  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) {
      return true;
    }
  };

  //elimina un servidor de la BD.

  const eliminarServidor = async () => {
    if (creador.id !== usuario.uid) {
      return router.push("/login");
    }
    try {
      await firebase.db.collection("servidores").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ip);

  return (
    <Layout>
      <audio ref={AudioBooRef} src="/static/sounds/boo.mp3"></audio>
      <audio ref={AudioAplausosRef} src="/static/sounds/aplausos.mp3"></audio>
      <>
        <div>
          {error ? (
            <Error404 />
          ) : (
            <div className="contenedor">
              <h1
                css={css`
                  text-align: center;
                  margin-top: 5rem;
                `}
              >
                {nombre}
              </h1>
              <h3
                css={css`
                  text-align: center;
                  margin-top: -2rem;
                `}
              >
                {tipo} {ciudad && ciudad} {departamento && departamento}
                {partido && " - " + partido}
              </h3>

              <ContenedorServidor>
                <div ref={servidorAvatar}>
                  <p>
                    Publicado hace:{" "}
                    {formatDistanceToNow(new Date(creado), { locale: es })}
                  </p>
                  <p>Por: {creador.nombre}</p>
                  <Avatar src={urlimagen} />
                  {ejecutarGif.play && <Gif src={ejecutarGif.url} />}
                  <p>{descripcion}</p>
                  <VotosContenedor>
                    <CategoryContainer>
                      <h4>Salud</h4>
                      <IconoVotacion
                        src="/static/img/salud.png"
                        alt="categoria"
                      />
                      <ContainerButtons>
                        <div>
                          <ConteoVotos color="green">
                            {votos_salud_mas}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarSaludMas}
                            icon={"/static/img/aplauso.png"}
                          ></BotonVotar>
                        </div>
                        <div>
                          <ConteoVotos color="red">
                            {votos_salud_menos}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarSaludMenos}
                            icon={"/static/img/tomate.png"}
                          ></BotonVotar>
                        </div>
                      </ContainerButtons>
                    </CategoryContainer>
                    <CategoryContainer>
                      <h4>Educación</h4>
                      <IconoVotacion
                        src="/static/img/educacion.png"
                        alt="categoria"
                      />
                      <ContainerButtons>
                        <div>
                          <ConteoVotos color="green">
                            {votos_educacion_mas}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarEducacionMas}
                            icon={"/static/img/aplauso.png"}
                          ></BotonVotar>
                        </div>
                        <div>
                          <ConteoVotos color="red">
                            {votos_educacion_menos}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarEducacionMenos}
                            icon={"/static/img/tomate.png"}
                          ></BotonVotar>
                        </div>
                      </ContainerButtons>
                    </CategoryContainer>
                    <CategoryContainer>
                      <h4>Infraestructura</h4>
                      <IconoVotacion
                        src="/static/img/infraestructura.png"
                        alt="categoria"
                      />
                      <ContainerButtons>
                        <div>
                          <ConteoVotos color="green">
                            {votos_infraestructura_mas}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarInfraestructuraMas}
                            icon={"/static/img/aplauso.png"}
                          ></BotonVotar>
                        </div>
                        <div>
                          <ConteoVotos color="red">
                            {votos_infraestructura_menos}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarInfraestructuraMenos}
                            icon={"/static/img/tomate.png"}
                          ></BotonVotar>
                        </div>
                      </ContainerButtons>
                    </CategoryContainer>
                    <CategoryContainer>
                      <h4>Vivienda</h4>
                      <IconoVotacion
                        src="/static/img/vivienda.png"
                        alt="categoria"
                      />
                      <ContainerButtons>
                        <div>
                          <ConteoVotos color="green">
                            {votos_vivienda_mas}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarViviendaMas}
                            icon={"/static/img/aplauso.png"}
                          ></BotonVotar>
                        </div>
                        <div>
                          <ConteoVotos color="red">
                            {votos_vivienda_menos}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarViviendaMenos}
                            icon={"/static/img/tomate.png"}
                          ></BotonVotar>
                        </div>
                      </ContainerButtons>
                    </CategoryContainer>
                    <CategoryContainer>
                      <h4>Cultura</h4>
                      <IconoVotacion
                        src="/static/img/cultura.png"
                        alt="categoria"
                      />
                      <ContainerButtons>
                        <div>
                          <ConteoVotos color="green">
                            {votos_cultura_mas}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarCulturaMas}
                            icon={"/static/img/aplauso.png"}
                          ></BotonVotar>
                        </div>
                        <div>
                          <ConteoVotos color="red">
                            {votos_cultura_menos}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarCulturaMenos}
                            icon={"/static/img/tomate.png"}
                          ></BotonVotar>
                        </div>
                      </ContainerButtons>
                    </CategoryContainer>
                    <CategoryContainer>
                      <h4>Corrupción</h4>
                      <IconoVotacion
                        src="/static/img/corrupcion.png"
                        alt="categoria"
                      />
                      <ContainerButtons>
                        <div>
                          <ConteoVotos color="red">
                            {votos_corrupcion_menos}
                          </ConteoVotos>
                          <BotonVotar
                            onClick={VotarCorrupcionMenos}
                            icon={"/static/img/tomate.png"}
                          ></BotonVotar>
                        </div>
                      </ContainerButtons>
                    </CategoryContainer>
                    {/* <button
                  css={css`
                    display: block;
                    width: 100%;
                  `}
                  onClick={lanzarTomate}
                >
                  TOMATE
                </button>
                <button
                  css={css`
                    display: block;
                    width: 100%;
                  `}
                  onClick={lanzarAplauso}
                >
                  APLAUSO
                </button> */}
                  </VotosContenedor>
                  <div
                    css={css`
                      margin-top: 30px;
                    `}
                  >
                    <Grafica servidor={servidor} />
                  </div>
                </div>
                <aside>
                  {url && (
                    <Boton target="_blank" bgColor="true" href={url}>
                      Visitar URL
                    </Boton>
                  )}
                  {usuario && (
                    <>
                      <h2
                        css={css`
                          margin-top: 40px;
                        `}
                      >
                        Agrega tu comentario
                      </h2>
                      <form onSubmit={agregarComentario}>
                        <Campo>
                          <input
                            type="text"
                            name="mensaje"
                            onChange={comentarioChange}
                          />
                        </Campo>
                        <InputSubmit type="submit" value="Agregar Comentario" />
                      </form>
                    </>
                  )}
                  <h2
                    css={css`
                      margin: 2rem 0;
                    `}
                  >
                    Comentarios
                  </h2>
                  {comentarios.length === 0 ? (
                    "Aún no hay comentarios"
                  ) : (
                    <ul>
                      {comentarios.map((comentario, i) => (
                        <li
                          key={`${comentario.usuarioId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                          `}
                        >
                          <p>{comentario.mensaje}</p>
                          <p>
                            Escrito por{" "}
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {comentario.usuarioNombre}
                            </span>
                          </p>
                          {esCreador(comentario.usuarioId) && (
                            <CreadorServidor>Administrador</CreadorServidor>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </aside>
              </ContenedorServidor>
              {puedeBorrar() && (
                <Boton onClick={eliminarServidor}>Eliminar Servidor</Boton>
              )}
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}

export default Servidor;
