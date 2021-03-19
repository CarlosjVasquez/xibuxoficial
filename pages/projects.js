import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

import Template from 'components/Template/TemplateStyle1'
import Card from 'components/Card/CardStyle1'

export default function Projects({ links, linksSocial, loader, dataProjects }) {
  return (
    <>
      <Head>
        <title>Xibux Studio - Projects</title>
      </Head>
      <Template links={links} linksSocial={linksSocial} loader={loader}>
        {dataProjects.map((item, key) => {
          return (
            <Card
              key={key}
              pathname="/modelwork"
              titulo={item.titulo}
              cd={item.id}
              bannerUrl={item.banner.url}
              modeloUrl={
                item.link_modelo !== null
                  ? `/modelsreview/${item.link_modelo}`
                  : ''
              }
              youtubeOnly={item.only_youtube}
              youtubeUrl={item.youtube_video}
              premiere={item.premiere}
              releaseDate={item.release_date}
              order={item.order}
            />
          )
        })}
      </Template>
    </>
  )
}

export async function getServerSideProps() {
  const { API_URL } = process.env

  const resNav = await fetch(`${API_URL}/menu-links`)
  const resSocial = await fetch(`${API_URL}/social-medias`)
  const resProjects = await fetch(`${API_URL}/proyectos`)

  const dataNav = await resNav.json()
  const dataSocial = await resSocial.json()
  const dataProjects = await resProjects.json()
  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      dataProjects: dataProjects,
    },
  }
}
