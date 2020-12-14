import Head from 'next/head'
import Header from '../components/Header/Header'
import SocialMedia from '../components/SocialMedia'
import styled from '@emotion/styled'
import Contact from 'components/Description/BoxStyle2'

import { useEffect, useRef, useState } from 'react'

export default function About({
  links,
  linksSocial,
  infoAbout,
  loader,
  infoContact,
}) {
  const [activeMenu, setActiveMenu] = useState(1)
  const [load, setLoad] = useState(false)
  const [showTeam, setShowTeam] = useState(false)
  const [usersTeam, setUsersTeam] = useState(false)
  const [imgUno, setImgUno] = useState(false)
  const [imgDos, setImgDos] = useState(false)
  const [imgBanner, setImgBanner] = useState(false)

  const banner = useRef()
  const des = useRef()
  const team = useRef()

  useEffect(() => {
    const scrollTeam = () => {
      const top = team.current.getBoundingClientRect().y
      if (top <= 520) {
        !showTeam && setShowTeam(true)
      }
      if (top <= 250) {
        !usersTeam && setUsersTeam(true)
      }
    }

    window.addEventListener('scroll', scrollTeam)

    return () => {
      window.removeEventListener('scroll', scrollTeam)
    }
  })

  useEffect(() => {
    if (
      team.current &&
      des.current &&
      banner.current &&
      imgUno &&
      imgDos &&
      imgBanner &&
      !loader
    ) {
      setTimeout(() => {
        setLoad(true)
      }, 500)
    } else if (loader) {
      setLoad(false)
    }
  })

  return (
    <>
      <Head>
        <title>Xibux Studio - About</title>
      </Head>
      <Header
        links={links}
        first={0}
        onHandleClick={() => setActiveMenu(activeMenu === 1 ? 0 : 1)}
        active={activeMenu}
        white={true}
        load={load}
        scrollActive={true}
      />
      <SocialMedia linksSocial={linksSocial} />
      <StyledBanner ref={banner}>
        <div className={load ? 'logo active' : 'logo'}>
          <img id="img" src="./images/logo.svg" alt="" />
        </div>
        <div className={load ? 'title active' : 'title'}>
          <div className="imgback">
            <img
              onLoad={() => setImgBanner(true)}
              src={infoAbout[0].img_banner.url}
              alt=""
            />
          </div>
          <p>{infoAbout[0].titulo}</p>
        </div>
      </StyledBanner>
      <StyledDescription ref={des}>
        <div className={load ? 'content active' : 'content'}>
          <p>{infoAbout[0].des_principal}</p>
        </div>
        <div className="gallery">
          <div className={load ? 'img active' : 'img'}>
            <img
              onLoad={() => setImgUno(true)}
              src={infoAbout[0].img_description1.url}
              alt=""
            />
          </div>
          <div className={load ? 'img active' : 'img'}>
            <img
              onLoad={() => setImgDos(true)}
              src={infoAbout[0].img_description2.url}
              alt=""
            />
          </div>
        </div>
      </StyledDescription>
      <StyledTeam
        ref={team}
        title={showTeam ? 'scale(1)' : 'scale(0)'}
        des={showTeam ? 'scale(1)' : 'scale(0)'}
        users={usersTeam ? 'translateY(0)' : 'translateY(50%)'}
        load={load ? 'translateX(0)' : 'translateX(100%)'}
      >
        <div className="contentTeam">
          <div className="title">
            <h1>{infoAbout[0].titulo_team}</h1>
            <div className="space"></div>
          </div>
          <div className="description">
            <p>{infoAbout[0].des_team}</p>
          </div>
          <div className="team">
            {infoAbout[0].teams.map((item, key) => (
              <div key={key} className="user-team" title={item.name}>
                <div className="avatar">
                  <img src={item.avatar.url} alt={item.name} />
                </div>
                <div className="space"></div>
                <div className="data-user">
                  <h1>
                    {item.name} {item.last_name}
                  </h1>
                  <h3>{item.position}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StyledTeam>
      <Contact text1={infoContact.Title} text2={infoContact.Description} />
    </>
  )
}

const StyledTeam = styled.div`
  width: 100%;
  overflow: hidden;
  .contentTeam {
    width: 100%;
    padding: 60px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Raleway;
    background: #fff;
    transition: transform 0.5s ease;
    transform: ${(props) => props.load};
  }
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #3b3b3b;
    font-size: 1.5rem;
    transform: ${(props) => props.title};
    transition: all 0.5s 0.5s cubic-bezier(0.5, 0, 0.59, 1.3);
    .space {
      width: 150%;
      height: 3px;
      background: #bd7245;
    }
  }
  .description {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    padding: 30px 0;
    margin-bottom: 60px;
    transform: ${(props) => props.des};
    transition: all 0.5s 0.5s cubic-bezier(0.5, 0, 0.59, 1.3);
  }
  .team {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    transform: ${(props) => props.users};
    transition: all 0.5s 0.5s ease;
    .user-team {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 60px;
      width: 100%;
      .data-user {
        text-align: center;
        h1 {
          font-size: 1.5rem;
          font-weight: 500;
        }
        h3 {
          font-size: 1rem;
          font-weight: 400;
        }
      }
      .space {
        width: 100%;
        height: 3px;
        background: #bd7245;
        margin: 15px 0;
      }
      .avatar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 80%;
        }
      }
    }
  }

  @media only screen and (min-width: 500px) {
    .team {
      .user-team {
        width: 40%;
      }
    }
  }
  @media only screen and (min-width: 1000px) {
    .description {
      font-size: 2rem;
      width: 90%;
      max-width: 1280px;
    }
    .team {
      max-width: 1280px;
      .user-team {
        width: 30%;
        align-items: flex-start;
        .data-user {
          text-align: left;
          h1 {
            font-size: 2rem;
          }
          h3 {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1280px) {
    .description {
      font-size: 2.5rem;
    }
  }
`

const StyledDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-family: Raleway;
  overflow: hidden;
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    text-align: center;
    font-size: 1.5rem;
    background: #f7e8dc;
    transform: translateX(-100%);
    transition: all 0.5s ease;
  }
  .gallery {
    display: none;
  }
  .active {
    transform: translateX(0);
  }
  @media only screen and (min-width: 1000px) {
    .content {
      width: 65%;
      font-size: 2rem;
      padding: 60px;
    }
    .gallery {
      width: 35%;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.5s ease;
      .img {
        width: 100%;
        height: 50%;
        overflow: hidden;
        transition: all 0.5s ease;
        &:nth-of-type(1) {
          transform: translateY(-100%);
        }
        &:nth-of-type(2) {
          transform: translateY(100%);
        }
        img {
          min-width: 100%;
          min-height: 100%;
        }
      }
      .active {
        &:nth-of-type(1),
        &:nth-of-type(2) {
          transform: translateY(0);
        }
      }
    }
  }

  @media only screen and (min-width: 1280px) {
    .content {
      font-size: 3rem;
    }
  }
`

const StyledBanner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: content-box;
  font-family: Raleway;
  overflow: hidden;
  .logo {
    display: none;
    transform: translateX(-100%);
    transition: all 0.5s ease;
  }
  .title {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15rem;
    font-style: oblique;
    font-weight: 600;
    color: #fff;
    padding: 80px 0 60px 0;
    text-transform: uppercase;
    transform: translateX(100%);
    transition: all 0.5s ease;
    .imgback {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      img {
        min-height: 100%;
        min-width: 100%;
      }
    }
  }
  .active {
    transform: translateX(0);
  }
  @media only screen and (min-width: 1000px) {
    .logo {
      width: 40%;
      background: #f07241;
      justify-content: center;
      align-items: center;
      display: flex;
      img {
        min-height: 60%;
        min-width: 60%;
        max-width: 70%;
        max-height: 70%;
        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.7));
      }
    }
    .title {
      width: 60%;
      font-size: 20rem;
    }
  }
`

export async function getServerSideProps() {
  const { API_URL } = process.env

  const resNav = await fetch(`${API_URL}/menu-links`)
  const resSocial = await fetch(`${API_URL}/social-medias`)
  const resAbout = await fetch(`${API_URL}/abouts`)
  const resContact = await fetch(`${API_URL}/contact-dir`)

  const dataNav = await resNav.json()
  const dataSocial = await resSocial.json()
  const dataAbout = await resAbout.json()
  const dataContact = await resContact.json()

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      infoAbout: dataAbout,
      infoContact: dataContact,
    },
  }
}
