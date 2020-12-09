import styled from '@emotion/styled'
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'

import Back from 'components/Button/BackStyle1'
import Header from 'components/Header/Header'
import SocialMedia from 'components/SocialMedia'
import YoutubeVideo from 'components/YoutubeVideo'
import Description from 'components/Description/BoxStyle1'
import Gallery from 'components/Gallery/GalleryStyle1'
import Button from 'components/Button/ButtonStyle1'
import Contact from 'components/Description/BoxStyle2'

export default function PagesWorks({
  links,
  linksSocial,
  loader,
  dataProject,
}) {
  const [activeMenu, setActiveMenu] = useState(1)
  const [load, setLoad] = useState(false)
  const container = useRef()

  useEffect(() => {
    if (container.current && !loader) {
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
        <title>Xibux Studio - Models</title>
      </Head>
      <Header
        links={links}
        first={1}
        onHandleClick={() => setActiveMenu(activeMenu === 1 ? 0 : 1)}
        active={activeMenu}
        load={load}
        white={true}
        pattern={true}
      />
      <SocialMedia linksSocial={linksSocial} color="#fff" />
      {dataProject && (
        <StyledContent>
          <StyledContainer ref={container}>
            <Back color="#fff" />
            <YoutubeVideo url={dataProject.youtube_video} />
            {dataProject.titulo !== null && (
              <Description
                title={dataProject.titulo}
                description={dataProject.short_description}
              />
            )}
            {dataProject.gallery !== null && (
              <Gallery gallery={dataProject.gallery} />
            )}
            {dataProject.link_modelo !== null && (
              <Button
                url={`/modelsreview/${dataProject.link_modelo}`}
                title="View Model 3D"
                margin="80px"
              />
            )}
          </StyledContainer>
          <Contact />
        </StyledContent>
      )}
    </>
  )
}

const StyledContent = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://res.cloudinary.com/carlosvv18/image/upload/v1607394910/g1vb0bafp8pbkm7hesed.jpg');
    background-size: 200px 200px;
    z-index: -1;
  }
`
const StyledContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 100px 50px;
`

export async function getServerSideProps({ query }) {
  const { API_URL } = process.env

  const resNav = await fetch(`${API_URL}/menu-links`)
  const resSocial = await fetch(`${API_URL}/social-medias`)
  const resProject = await fetch(`${API_URL}/proyectos/${query.cd}`)

  const dataNav = await resNav.json()
  const dataSocial = await resSocial.json()
  const dataProject = await resProject.json()

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      dataProject: dataProject,
    },
  }
}
