import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "components/Header/Header";
import SocialMedia from "components/SocialMedia";

export default function Projects({ links, linksSocial, loader, dataProjects }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [load, setLoad] = useState(false);
  const container = useRef();
  const router = useRouter();

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
        backActive={true}
      />
      <SocialMedia linksSocial={linksSocial} />
      <StyledContainer ref={container}>
        <StyledProject>
          {dataProjects.map((item, key) => {
            if (item.categoria.titulo === router.query.id) {
              return (
                <StyledItem key={key}>
                  <Link
                    href={{
                      pathname: "/modelwork",
                      query: { id: item.titulo, cd: item.id },
                    }}
                  >
                    <a>
                      <div className="img-back">
                        <img src={item.banner.url} alt="" />
                      </div>
                      <div className="des-item">
                        <h1>{item.titulo}</h1>
                      </div>
                    </a>
                  </Link>
                  {item.link_modelo != "" && (
                    <Link href={`/modelsreview/${item.link_modelo}`}>
                      <a className="linkModel">
                        <div className="btn3d">
                          <div className="cube">
                            <figure className="back "></figure>
                            <figure className="left"></figure>
                            <figure className="bottom"></figure>
                            <figure className="front"></figure>
                            <figure className="right"></figure>
                            <figure className="top"></figure>
                          </div>
                          <div className="view">
                            <p>view 3D</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  )}
                </StyledItem>
              );
            }
          })}
        </StyledProject>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://res.cloudinary.com/carlosvv18/image/upload/v1606778391/omsehxeqyavoeivrmrbe.png");
    background-size: 80px 80px;
  }
`;

const StyledProject = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1280px;
  width: 100%;
  padding: 100px 50px;
`;

const StyledItem = styled.div`
  position: relative;
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 0px 2px 0px #00000055;
  &:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 56.25%;
  }
  .img-back {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 100%;
    height: 100%;
    transition: all 1s ease;
    img {
      min-height: 100%;
    }
  }
  .des-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000aa;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 1s ease;
    h1 {
      font-size: 2.5vw;
      font-weight: 500;
      border-bottom: solid 2px #fff;
    }
  }
  &:hover {
    .img-back {
      transform: translate(-50%, -50%) scale(1.2);
    }
    .des-item {
      opacity: 1;
    }
  }
  .linkModel {
    position: absolute;
    top: 25px;
    left: 25px;
  }
  .btn3d {
    position: relative;
    width: 15px;
    height: 15px;
    perspective: 400px;
    margin-right: 20px;
    cursor: pointer;
    .cube {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: translateY(0px) rotateY(0deg) rotateX(45deg) rotateZ(45deg);
      transition: all 0.5s linear;

      figure {
        width: 100%;
        height: 100%;
        margin: 0;
        border: 1px solid #fff;
        position: absolute;
        background: transparent;
        transition: all 0.3s linear;
      }
      .back {
        transform: rotateX(0deg) translateZ(-7px);
      }
      .left {
        transform: rotateY(90deg) translateZ(-7px);
      }
      .bottom {
        transform: rotateX(90deg) translateZ(-7px);
      }
      .front {
        transform: rotateX(0deg) translateZ(7px);
      }
      .top {
        transform: rotateX(90deg) translateZ(7px);
      }
      .right {
        transform: rotateY(90deg) translateZ(7px);
      }
    }
    .view {
      position: absolute;
      font-size: 0.9rem;
      width: 70px;
      top: 60%;
      left: 50%;
      transform: translateX(-50%) scaleY(0);
      color: #fff;
      border-radius: 9999999px;
      padding: 0px 2px;
      text-align: center;
      opacity: 0;
      transition: all 0.3s ease-out;
      p {
        font-family: Raleway;
        font-weight: 500;
      }
    }
    &:hover .cube figure {
      background: #f07241 !important;
    }
  }
  &:hover .btn3d .cube {
    transform: translateY(-10px) rotate(0deg) rotateX(65deg) rotateZ(135deg);
    figure {
      background: #fff;
      border: 1px solid #384146;
    }
  }
  &:hover .btn3d {
    .view {
      opacity: 1;
      transform: translateX(-50%) scaleY(1);
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
