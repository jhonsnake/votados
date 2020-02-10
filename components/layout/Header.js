import React from "react";
import Link from "next/link";
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
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

const Header = () => (
  <div>
    <header
      css={css`
        border-bottom: solid 2px var(--gris3);
        padding: 1rem 0;
        margin-top: 2rem;
      `}
    >
      <ContenedorHeader>
        <div>
          <Link href="/">
            <Logo>Votados</Logo>
          </Link>

          <Buscar />
          <Navegacion />
        </div>
        <div>
          <p>Hola: John</p>
          <button type="button">Cerrar sesión</button>
          <Link href="/">
            <a>Login </a>
          </Link>
          <Link href="/">
            <a>Crear cuenta </a>
          </Link>
        </div>
      </ContenedorHeader>
    </header>
  </div>
);

export default Header;
