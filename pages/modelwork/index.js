import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'

import Header from 'components/Header/Header'
import SocialMedia from 'components/SocialMedia'
import YoutubeVideo from 'components/YoutubeVideo'
import Description from 'components/Description/BoxStyle1'
import Gallery from 'components/Gallery/GalleryStyle1'
import Button from 'components/Button/ButtonStyle1'
import Contact from 'components/Description/BoxStyle2'
import Template from 'components/Template/TemplateStyle1'
import ShowMore from 'components/ShowMore/ShowMore'

export default function PagesWorks({
  links,
  linksSocial,
  loader,
  dataProject,
  infoContact,
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
      <ShowMore />
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
        <>
          <Template links={links} linksSocial={linksSocial} loader={loader}>
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
          </Template>
          <Contact text1={infoContact.Title} text2={infoContact.Description} />
        </>
      )}
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { API_URL } = process.env

  const resNav = await fetch(`${API_URL}/menu-links`)
  const resSocial = await fetch(`${API_URL}/social-medias`)
  const resProject = await fetch(`${API_URL}/proyectos/${query.cd}`)
  const resContact = await fetch(`${API_URL}/contact-dir`)

  const dataNav = await resNav.json()
  const dataSocial = await resSocial.json()
  const dataProject = await resProject.json()
  const dataContact = await resContact.json()

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      dataProject: dataProject,
      infoContact: dataContact,
    },
  }
}
