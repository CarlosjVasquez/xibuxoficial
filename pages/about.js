import Head from "next/head";
import Header from "../components/Header/Header";
import SocialMedia from "../components/SocialMedia";

import { useState } from "react";

export default function About({ links, linksSocial }) {
  const [activeMenu, setActiveMenu] = useState(1);
  return (
    <>
      <Head>
        <title>Xibux Studio - About</title>
      </Head>
      <Header
        links={links}
        first={0}
        onHandleClick={() => setActiveMenu(activeMenu == 1 ? 0 : 1)}
        active={activeMenu}
      />
      <SocialMedia linksSocial={linksSocial} />
      <h1>Hola About</h1>
    </>
  );
}

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
