import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import Header from "../components/Header/Header";
import SocialMedia from "../components/SocialMedia";

export default function Projects({ links, linksSocial, loader }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [load, setLoad] = useState(false);
  const container = useRef();

  useEffect(() => {
    if (container.current && !loader) {
      setTimeout(() => {
        setLoad(true);
      }, 500);
    } else if (loader) {
      setLoad(false);
    }
  });

  return (
    <>
      <Head>
        <title>Xibux Studio - Home</title>
      </Head>
      <Header
        links={links}
        first={1}
        onHandleClick={() => setActiveMenu(activeMenu == 1 ? 0 : 1)}
        active={activeMenu}
        load={load}
      />
      <SocialMedia linksSocial={linksSocial} />
      <StyledProject ref={container}>
        <h1>Hola</h1>
      </StyledProject>
    </>
  );
}

const StyledProject = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1280px;
  width: 100%;
`;

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const resNav = await fetch(`${API_URL}/menu-links`);
  const resSocial = await fetch(`${API_URL}/social-medias`);

  const dataNav = await resNav.json();
  const dataSocial = await resSocial.json();

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
    },
  };
}
