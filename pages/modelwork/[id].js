import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "components/Header/Header";
import SocialMedia from "components/SocialMedia";

export default function PagesWorks({
  links,
  linksSocial,
  loader,
  dataProjects,
}) {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(1);
  const [load, setLoad] = useState(false);
  const [urlImg, setUrlImg] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(false);
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

  const handleClick = (e) => {
    setUrlImg(e.target.parentNode.parentNode.children[1].src);
    setActiveModal(true);
  };

  return (
    <>
      <Head>
        <title>Xibux Studio - Models</title>
      </Head>
      <Header
        links={links}
        first={1}
        onHandleClick={() => setActiveMenu(activeMenu == 1 ? 0 : 1)}
        active={activeMenu}
        load={load}
      />
      <SocialMedia linksSocial={linksSocial} />
      {dataProjects.map((item, key) => {
        if (item.titulo == router.query.id) {
          return (
            <StyledBanner key={key} banner={item.banner.url}>
              <h1>{item.titulo}</h1>
              <FontAwesomeIcon
                className="iconPlay"
                onClick={() => setActiveVideo(true)}
                icon={["fas", "play-circle"]}
              />
            </StyledBanner>
          );
        }
      })}
      {dataProjects.map((item, key) => {
        if (item.titulo == router.query.id) {
          return (
            <StyledModalVideo
              onClick={() => setActiveVideo(false)}
              active={activeVideo}
              key={key}
            >
              <iframe
                id="video"
                width="560"
                height="315"
                src={item.youtube_video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </StyledModalVideo>
          );
        }
      })}
      {dataProjects.map((item, key) => {
        if (item.titulo == router.query.id) {
          return (
            <StyledContainer ref={container} key={key}>
              <StyledMain>
                <p>{item.short_description}</p>
                <StyledGallery>
                  {item.gallery.map((item, key) => (
                    <div className="imGallery" key={key}>
                      <div className="expand">
                        <FontAwesomeIcon
                          className="iconExpand"
                          icon={["fas", "expand"]}
                          onClick={(e) => handleClick(e)}
                        />
                      </div>
                      <img src={item.url} alt="" />
                    </div>
                  ))}
                </StyledGallery>
              </StyledMain>
              <StyledContact>
                <div className="description">
                  <p>
                    We work tirelessly to make your animation just plain awesome
                  </p>
                  <div className="space"></div>
                  <p>
                    Feel free to ask any questions and we will find suitable
                    option
                    <br /> just for you. Are you ready to start?
                  </p>
                </div>
                <div onClick={() => router.push("/contact")} className="btn">
                  <p>Contact</p>
                </div>
              </StyledContact>
            </StyledContainer>
          );
        }
      })}
      <StyledModal onClick={() => setActiveModal(false)} active={activeModal}>
        <img src={urlImg} alt="" />
      </StyledModal>
    </>
  );
}

const StyledModalVideo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: #00000088;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: #00000088;
  img {
    width: 80%;
  }
`;

const StyledContact = styled.div`
  width: 100%;
  background: #f07241;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Raleway;
  .description {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-bottom: 30px;
    .space {
      width: 150px;
      height: 3px;
      background: #fff;
      margin: 15px;
    }
  }
  .btn {
    padding: 10px 20px;
    background: #2e3547;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 5px 0px #2e3547;
    cursor: pointer;
    &:hover {
      background: #2e3547ee;
    }
  }
  @media only screen and (min-width: 1000px) {
    padding: 60px 30px;
    .description {
      font-size: 2.5rem;
      max-width: 1280px;
      margin-bottom: 60px;
    }
    .btn {
      padding: 10px 40px;
      font-size: 1.5rem;
    }
  }
`;

const StyledGallery = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  .imGallery {
    width: 48%;
    overflow: hidden;
    margin: 0.5%;
    position: relative;
    &:hover .expand {
      opacity: 1;
    }
    .expand {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #00000088;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      .iconExpand {
        font-size: 2rem;
        cursor: pointer;
        &:hover {
          font-size: 2.5rem;
        }
      }
    }
    img {
      min-width: 100%;
      min-height: 100%;
    }
  }
`;

const StyledMain = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 60px 30px;
  background: #fff;
  p {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 60px;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBanner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
  background: url(${(props) => props.banner});
  background-position: center;
  background-size: cover;
  h1 {
    text-align: center;
    font-size: 6rem;
    color: #fff;
    text-shadow: 1px 1px 5px #000;
  }

  .iconPlay {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    color: #fff;
    filter: drop-shadow(1px 1px 5px #000);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.3, -0.13, 0.7, 1.13);
    &:hover {
      font-size: 3rem;
    }
  }
`;

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const resNav = await fetch(`${API_URL}/menu-links`);
  const resSocial = await fetch(`${API_URL}/social-medias`);
  const resProjects = await fetch(`${API_URL}/proyectos`);

  const dataNav = await resNav.json();
  const dataSocial = await resSocial.json();
  const dataProjects = await resProjects.json();

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      dataProjects: dataProjects,
    },
  };
}
