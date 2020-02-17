import React from "react";
import { css } from "@emotion/core";

function Error404() {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      La página que busca no se puede mostrar.
    </h1>
  );
}

export default Error404;
