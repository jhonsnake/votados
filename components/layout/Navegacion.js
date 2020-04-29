import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase/";

const Nav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
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
  const { usuario } = useContext(FirebaseContext);

  const checkUserAdmin = () => {
    if (usuario) {
      if (
        usuario.uid == "OvrGmqU16aMSh25fVBH3DRhQMND2" ||
        usuario.uid == "Dmpw0yxeszdkaqradIRgdOLRviu2"
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <Nav>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/populares">
        <a>Mas tomates</a>
      </Link>

      {checkUserAdmin() && (
        <Link href="/agregar-servidor">
          <a>+</a>
        </Link>
      )}
    </Nav>
  );
}

export default Navegacion;
