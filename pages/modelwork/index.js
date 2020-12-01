import styled from "@emotion/styled";
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import Header from "components/Header/Header";
import SocialMedia from "components/SocialMedia";

export default function PagesWorks({
  links,
  linksSocial,
  loader,
  dataProject,
}) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [load, setLoad] = useState(false);
  const container = useRef();

  useEffect(() => {
    if (container.current && !loader) {
      setTimeout(() => {
        setLoad(true);
        console.log(dataProject);
      }, 500);
    } else if (loader) {
      setLoad(false);
    }
  });

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
        backActive={true}
      />
      <SocialMedia linksSocial={linksSocial} />
      {dataProject && (
        <>
          <StyledContainer ref={container}>
            <StyledBanner>
              <iframe
                id="video"
                src={dataProject.youtube_video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </StyledBanner>
            <StyledMain>
              <h1>{dataProject.titulo}</h1>
              <p>{dataProject.short_description}</p>
            </StyledMain>
            <StyledGallery>
              {dataProject.gallery &&
                dataProject.gallery.map((item, key) => {
                  return (
                    <StyledItem key={key}>
                      <div className="img-back">
                        <img src={item.url} alt="" />
                      </div>
                    </StyledItem>
                  );
                })}
            </StyledGallery>
          </StyledContainer>
          <StyledContact>
            <div className="cont">
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
              <Link href="/contact">
                <div className="btn">
                  <a>Contact</a>
                </div>
              </Link>
            </div>
          </StyledContact>
        </>
      )}
    </>
  );
}

const StyledContact = styled.div`
  position: relative;
  .cont {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #f07241;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Raleway;
    z-index: 1;
  }

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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1280px;
  width: 100%;
`;

const StyledItem = styled.div`
  position: relative;
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 10px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      min-height: 100%;
    }
  }
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding: 60px 0px;
  color: #3b3b3b;
  z-index: 1;
  h1 {
    text-align: center;
    margin-bottom: 25px;
    border-bottom: solid 2px #3b3b3b;
    font-size: calc(1rem+1vw);
  }
  p {
    text-align: center;
    font-size: calc(1rem+1vw);
    font-weight: 400;
    margin-bottom: 60px;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 100px 50px;
  overflow: hidden;
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

const StyledBanner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding-top: 56.25%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export async function getServerSideProps({ query }) {
  const { API_URL } = process.env;

  console.log(query.cd);

  const resNav = await fetch(`${API_URL}/menu-links`);
  const resSocial = await fetch(`${API_URL}/social-medias`);
  const resProject = await fetch(`${API_URL}/proyectos/${query.cd}`);

  const dataNav = await resNav.json();
  const dataSocial = await resSocial.json();
  const dataProject = await resProject.json();

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      dataProject: dataProject,
    },
  };
}
