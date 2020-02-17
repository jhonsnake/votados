import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";

const Servidor = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const DescripcionServidor = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Titulo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const TextoDescripcion = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;
const Imagen = styled.img`
  width: 200px;
`;

const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

function DetallesProducto({ servidor }) {
  const {
    id,
    nombre,
    ciudad,
    departamento,
    url,
    urlimagen,
    descripcion,
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
    creado
  } = servidor;

  return (
    <Servidor>
      <DescripcionServidor>
        <div>
          <Imagen src={urlimagen} alt={nombre} />
        </div>
        <div>
          <Link href="/servidores/[id]" as={`/servidores/${id}`}>
            <Titulo>{nombre}</Titulo>
          </Link>
          <p>{descripcion}</p>
          <div>
            <Comentarios>
              <img src="/static/img/comentario.png" alt="comentario" />
              <p>{comentarios.length} Comentarios</p>
            </Comentarios>
          </div>
          <p>
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </p>
        </div>
      </DescripcionServidor>
      <Votos>
        <div>&#9650;</div>
        <p>
          {votos_salud_mas +
            votos_salud_menos +
            votos_educacion_mas +
            votos_educacion_menos +
            votos_infraestructura_mas +
            votos_infraestructura_menos +
            votos_vivienda_mas +
            votos_vivienda_menos +
            votos_cultura_mas +
            votos_cultura_menos +
            votos_corrupcion_menos}
        </p>
      </Votos>
    </Servidor>
  );
}

export default DetallesProducto;
