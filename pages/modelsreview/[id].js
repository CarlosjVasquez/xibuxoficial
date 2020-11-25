import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";

import Header from "components/Header/Header";
import SocialMedia from "components/SocialMedia";

export default function Home({ links, linksSocial, loader }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [load, setLoad] = useState(false);
  const container = useRef();
  const router = useRouter();

  const Scene = dynamic(
    () => import(`components/ModelsReview/${router.query.id}`),
    {
      ssr: false,
    }
  );

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
        <Scene />
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