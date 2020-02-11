import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: "PT Sans", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

function Navegacion() {
  return (
    <Nav>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/populares">
        <a>Populares</a>
      </Link>
      <Link href="/agregar-servidor">
        <a>Agregar servidor</a>
      </Link>
    </Nav>
  );
}

export default Navegacion;