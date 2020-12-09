import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'

import Card from 'components/Card/CardStyle1'
import Template from 'components/Template/TemplateStyle1'

export default function Projects({ links, linksSocial, loader, dataProjects }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Xibux Studio - {router.query.id}</title>
      </Head>
      <Template links={links} linksSocial={linksSocial} loader={loader}>
        {dataProjects.map((item, key) => {
          if (item.categoria != null) {
            if (item.categoria.titulo === router.query.id) {
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
                />
              )
            }
          }
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
