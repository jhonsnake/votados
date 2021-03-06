import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Boton from "../ui/Boton";
import { FirebaseContext } from "../../firebase/";

const ContenedorHeader = styled.div`
  display: flex;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  align-items: center;
  margin-top: 30px;
`;

const ContenedorUsuario = styled.div`
  display: flex;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  margin-top: 30px;
`;

const Logo = styled.a`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const { firebase, usuario } = useContext(FirebaseContext);

  const checkUser = () => {
    if (usuario && usuario.emailVerified) {
      return (
        <>
          <p
            css={css`
              margin-right: 2rem;
            `}
          >
            Hola: {usuario.displayName}
          </p>
          <Link href="/">
            <Boton bgColor="true" onClick={() => firebase.cerrarSesion()}>
              Cerrar Sesión
            </Boton>
          </Link>
        </>
      );
    } else if (usuario && !usuario.emailVerified) {
      return <p>Por favor verifique su correo para votar</p>;
    }

    if (!usuario) {
      return (
        <>
          <Link href="/login">
            <Boton bgColor="true">Login </Boton>
          </Link>
          <Link href="/crear-cuenta">
            <Boton>Crear cuenta </Boton>
          </Link>
        </>
      );
    }
  };

  return (
    <div>
      <header
        css={css`
          border-bottom: solid 2px var(--gris3);
          padding: 1rem 0;
          margin-top: 2rem;
        `}
      >
        <ContenedorHeader>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Link href="/">
              <Logo>Califica</Logo>
            </Link>

            <Navegacion />
          </div>
        </ContenedorHeader>
        <ContenedorHeader>
          <Buscar />
        </ContenedorHeader>
        <ContenedorUsuario>
          <div
            css={css`
              display: flex;
              align-items: end;
            `}
          >
            {checkUser()}
          </div>
        </ContenedorUsuario>
      </header>
    </div>
  );
};

export default Header;
