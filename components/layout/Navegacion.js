import React from "react";
import Link from "next/link";

function Navegacion() {
  return (
    <div>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/">
        <a>Populares</a>
      </Link>
      <Link href="/">
        <a>Nuevo servidor</a>
      </Link>
    </div>
  );
}

export default Navegacion;
