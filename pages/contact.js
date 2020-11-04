import Head from "next/head";
import Header from "../components/Header/Header";
import SocialMedia from "../components/SocialMedia";

import styled from "@emotion/styled";

import { useState } from "react";

export default function Contact({ links, linksSocial, contact }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [videoActive, setVideoActive] = useState(1);

  const handleClick = () => {
    var finale = document.getElementById("final");
    setVideoActive(
      videoActive == 1 ? 2 : videoActive == 2 ? 3 : videoActive == 3 && 1
    );
    videoActive == 2 && finale.play();
  };

  return (
    <>
      <Head>
        <title>Xibux Studio - Contact</title>
      </Head>
      <Header
        links={links}
        first={2}
        onHandleClick={() => setActiveMenu(activeMenu == 1 ? 0 : 1)}
        active={activeMenu}
      />
      <SocialMedia linksSocial={linksSocial} />
      {contact.map((item, index) => {
        return (
          <div key={index}>
            <StyledBackVideo>
              <video
                id="final"
                className={
                  videoActive == 3
                    ? "videoactive showvideo"
                    : "videoactive hidevideo"
                }
                src={item.video3[0].url}
                muted
              />
              <video
                className={
                  videoActive == 2
                    ? "videoactive showvideo"
                    : "videoactive hidevideo"
                }
                src={item.video2[0].url}
                autoPlay
                loop
                muted
              />
              <video
                className={
                  videoActive == 1
                    ? "videoactive showvideo"
                    : "videoactive hidevideo"
                }
                src={item.video1[0].url}
                autoPlay
                loop
                muted
              />
            </StyledBackVideo>
          </div>
        );
      })}
      <StlBtn onClick={handleClick}>btn</StlBtn>
    </>
  );
}

const StlBtn = styled.a`
  position: absolute;
  bottom: 10px;
  left: 50%;
  cursor: pointer;
`;

const StyledBackVideo = styled.div`
  .videoactive {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    background-size: cover;
    transition: all 0.2s linear;
  }
  .hidevideo {
    opacity: 0;
  }
  .showvideo {
    opacity: 1;
  }
`;

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const resNav = await fetch(`${API_URL}/menu-links`);
  const resSocial = await fetch(`${API_URL}/social-medias`);
  const resContact = await fetch(`${API_URL}/contactos`);

  const dataNav = await resNav.json();
  const dataSocial = await resSocial.json();
  const dataContact = await resContact.json();

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      contact: dataContact,
    },
  };
}
