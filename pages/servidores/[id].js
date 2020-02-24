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

const Avatar = styled.img`
  margin: 0 auto;
  display: block;
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
  color: ${props => props.color};
`;
const BotonVotar = styled.button`
  width: 4rem;
  height: 4rem;
  background: none;
  margin: 0 10px;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    width: 5rem;
    height: 5rem;
  }
`;

function Servidor() {
  //state del componente
  const [servidor, guardarServidor] = useState({});
  const [error, guardarError] = useState(false);

  //context del firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  const router = useRouter();
  const {
    query: { id }
  } = router;
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
  const servidorAvatar = useRef();
  const AudioBooRef = useRef();
  useEffect(() => {
    if (id) {
      const obtenerServidor = async () => {
        const productoQuery = await firebase.db
          .collection("servidores")
          .doc(id);
        const servidor = await productoQuery.get();
        if (servidor.exists) {
          guardarServidor(servidor.data());
        } else {
          guardarError(true);
        }
      };
      obtenerServidor();
    }
  }, [id, servidor]);

  if (Object.keys(servidor).length === 0) return <p>Cargando...</p>;
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
    haVotadoCorrupcion
  } = servidor;

  //Administrar y validar los votos

  //SALUD
  const VotarSaludMas = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos salud
    const totalSaludMas = votos_salud_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoSalud.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoSalud = [...haVotadoSalud, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_salud_mas: totalSaludMas,
        haVotadoSalud: nuevoHaVotadoSalud
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_salud_mas: totalSaludMas
    });
  };

  const VotarSaludMenos = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos salud
    const totalSaludMenos = votos_salud_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoSalud.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoSalud = [...haVotadoSalud, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_salud_menos: totalSaludMenos,
        haVotadoSalud: nuevoHaVotadoSalud
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_salud_menos: totalSaludMenos
    });
  };

  //EDUCACIÓN

  const VotarEducacionMas = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos salud
    const totalEducacionMas = votos_educacion_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoEducacion.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoEducacion = [...haVotadoEducacion, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_educacion_mas: totalEducacionMas,
        haVotadoEducacion: nuevoHaVotadoEducacion
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_educacion_mas: totalEducacionMas
    });
  };

  const VotarEducacionMenos = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos Educacion
    const totalEducacionMenos = votos_educacion_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoEducacion.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoEducacion = [...haVotadoEducacion, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_educacion_menos: totalEducacionMenos,
        haVotadoEducacion: nuevoHaVotadoEducacion
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_educacion_menos: totalEducacionMenos
    });
  };

  //INFRAESTRUCTURA

  const VotarInfraestructuraMas = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos salud
    const totalInfraestructuraMas = votos_infraestructura_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoInfraestructura.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoInfraestructura = [
      ...haVotadoInfraestructura,
      usuario.uid
    ];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_infraestructura_mas: totalInfraestructuraMas,
        haVotadoInfraestructura: nuevoHaVotadoInfraestructura
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_infraestructura_mas: totalInfraestructuraMas
    });
  };

  const VotarInfraestructuraMenos = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos Infraestructura
    const totalInfraestructuraMenos = votos_infraestructura_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoInfraestructura.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoInfraestructura = [
      ...haVotadoInfraestructura,
      usuario.uid
    ];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_infraestructura_menos: totalInfraestructuraMenos,
        haVotadoInfraestructura: nuevoHaVotadoInfraestructura
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_infraestructura_menos: totalInfraestructuraMenos
    });
  };
  //VIVIENDA

  const VotarViviendaMas = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos salud
    const totalViviendaMas = votos_vivienda_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoVivienda.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoVivienda = [...haVotadoVivienda, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_vivienda_mas: totalViviendaMas,
        haVotadoVivienda: nuevoHaVotadoVivienda
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_vivienda_mas: totalViviendaMas
    });
  };

  const VotarViviendaMenos = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos Vivienda
    const totalViviendaMenos = votos_vivienda_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoVivienda.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoVivienda = [...haVotadoVivienda, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_vivienda_menos: totalViviendaMenos,
        haVotadoVivienda: nuevoHaVotadoVivienda
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_vivienda_menos: totalViviendaMenos
    });
  };
  //CULTURA

  const VotarCulturaMas = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos salud
    const totalCulturaMas = votos_cultura_mas + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoCultura.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoCultura = [...haVotadoCultura, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_cultura_mas: totalCulturaMas,
        haVotadoCultura: nuevoHaVotadoCultura
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_cultura_mas: totalCulturaMas
    });
  };

  const VotarCulturaMenos = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos Cultura
    const totalCulturaMenos = votos_cultura_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoCultura.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoCultura = [...haVotadoCultura, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_cultura_menos: totalCulturaMenos,
        haVotadoCultura: nuevoHaVotadoCultura
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_cultura_menos: totalCulturaMenos
    });
  };

  //CORRUPCION

  const VotarCorrupcionMenos = () => {
    if (!usuario) {
      return router.push("/login");
    }
    //obtener y sumar votos Corrupcion
    const totalCorrupcionMenos = votos_corrupcion_menos + 1;

    //Verificar si el usuario actual ha votado
    if (haVotadoCorrupcion.includes(usuario.uid)) return;
    //Guardar el id del usuario que ha votado
    const nuevoHaVotadoCorrupcion = [...haVotadoCorrupcion, usuario.uid];

    //Actualizar en la BD
    firebase.db
      .collection("servidores")
      .doc(id)
      .update({
        votos_corrupcion_menos: totalCorrupcionMenos,
        haVotadoCorrupcion: nuevoHaVotadoCorrupcion
      });
    //Actualizar el State
    guardarServidor({
      ...servidor,
      votos_corrupcion_menos: totalCorrupcionMenos
    });
  };

  function setScroll() {
    scrollToRef(servidorAvatar);
    if (!AudioBooRef) {
      return;
    }
    AudioBooRef.current.currentTime = 0;
    AudioBooRef.current.play();
  }

  return (
    <Layout>
      <audio ref={AudioBooRef} src="/static/sounds/boo.mp3"></audio>
      <>
        <h1>{error && <Error404 />}</h1>
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
              <p>{descripcion}</p>

              <VotosContenedor>
                <CategoryContainer>
                  <h4>Salud</h4>
                  <IconoVotacion src="/static/img/salud.png" alt="categoria" />
                  <ContainerButtons>
                    <div>
                      <ConteoVotos color="green">{votos_salud_mas}</ConteoVotos>
                      <BotonVotar
                        onClick={VotarSaludMas}
                        icon={"/static/img/aplauso.png"}
                      ></BotonVotar>
                    </div>
                    <div>
                      <ConteoVotos color="red">{votos_salud_menos}</ConteoVotos>
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
                <button
                  css={css`
                    display: block;
                    width: 100%;
                  `}
                  onClick={setScroll}
                >
                  TEST
                </button>
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
                  <form>
                    <Campo>
                      <input type="text" name="mensaje" />
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
              {comentarios.map(comentario => (
                <li>
                  <p>{comentario.nombre}</p>
                  <p>Escrito por {comentario.usuarioNombre}</p>
                </li>
              ))}
            </aside>
          </ContenedorServidor>
        </div>
      </>
    </Layout>
  );
}

export default Servidor;
