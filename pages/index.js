import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";

const Home = () => (
  <div>
    <Head>
      <title>Inicio</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Heading>Inicio</Heading>
  </div>
);

const Heading = styled.h1`
  color: red;
`;

export default Home;
