import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { useState } from "react";
import dynamic from "next/dynamic";

import Header from "../components/Header/Header";
import SocialMedia from "../components/SocialMedia";
import Slider from "../components/Sliders/SliderOne";
import ContentDetail from "../components/ContentDetail/ContentDetail";

const SceneOne = dynamic(() => import("../components/Scenes/SceneThree"), {
  ssr: false,
});

export default function Home({ links, linksSocial, category }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [modelActive, setModelActive] = useState(1);
  const [project, setProject] = useState(false);

  const onHandleContent = () => {
    setProject(!project);
    setActiveMenu(() => (activeMenu == 1 ? 0 : !project ? 0 : 1));
  };

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
        project={project}
      />
      <SocialMedia linksSocial={linksSocial} />
      <SceneOne category={category} active={modelActive} project={project} />
      <ContentDetail
        category={category}
        active={modelActive}
        project={project}
        onClickHandle={onHandleContent}
      />
      <Slider
        category={category}
        active={modelActive}
        onClickHandle={(index) => setModelActive(index)}
      />
    </>
  );
}

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const resNav = await fetch(`${API_URL}/menu-links`);
  const resSocial = await fetch(`${API_URL}/social-medias`);
  const resCategory = await fetch(`${API_URL}/categorias`);

  const dataNav = await resNav.json();
  const dataSocial = await resSocial.json();
  const dataCategory = await resCategory.json();

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      category: dataCategory,
    },
  };
}
