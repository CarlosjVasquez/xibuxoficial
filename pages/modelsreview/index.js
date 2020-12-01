import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";

import Header from "components/Header/Header";
import SocialMedia from "components/SocialMedia";

const Scene1 = dynamic(() => import(`components/ModelsReview/DeptOld`), {
  ssr: false,
});
const Scene2 = dynamic(() => import(`components/ModelsReview/FragOld`), {
  ssr: false,
});
const Scene3 = dynamic(() => import(`components/ModelsReview/WineOld`), {
  ssr: false,
});

export default function Home({ links, linksSocial, loader, model }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [load, setLoad] = useState(false);
  const [modelo, setModelo] = useState(model);
  const container = useRef();
  console.log(model);

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
    <StyledIndex>
      <Head>
        <title>Xibux Studio - Models Xibux</title>
      </Head>
      <Header
        links={links}
        first={1}
        onHandleClick={() => setActiveMenu(activeMenu == 1 ? 0 : 1)}
        active={activeMenu}
        load={load}
      />
      <SocialMedia linksSocial={linksSocial} />
      <StyledContainer ref={container} load={load}>
        {modelo == "DeptOld" ? (
          <Scene1 />
        ) : modelo == "FragOld" ? (
          <Scene2 />
        ) : modelo == "WineOld" ? (
          <Scene3 />
        ) : (
          <h1>error</h1>
        )}
      </StyledContainer>
    </StyledIndex>
  );
}

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  transform: translateY(${(props) => (props.load ? "0" : "-100%")});
`;

const StyledIndex = styled.div`
  overflow: hidden;
`;

export async function getServerSideProps({ query }) {
  const { API_URL } = process.env;

  const resNav = await fetch(`${API_URL}/menu-links`);
  const resSocial = await fetch(`${API_URL}/social-medias`);

  const dataNav = await resNav.json();
  const dataSocial = await resSocial.json();

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      model: query.id,
    },
  };
}
