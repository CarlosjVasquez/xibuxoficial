import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import CountDown from 'components/CountDown'
import LinkNew from 'components/LinkNew'

export default function CardStyle1({
  pathname,
  titulo,
  cd,
  bannerUrl,
  modeloUrl,
  youtubeOnly,
  youtubeUrl,
  premiere,
  releaseDate,
  order,
}) {
  const [query, setQuery] = useState()
  const [path, setPath] = useState()
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (youtubeOnly) {
      setQuery({ v: youtubeUrl })
      setPath('https://www.youtube.com/watch')
    } else {
      setQuery({ id: titulo, cd: cd })
      setPath(pathname)
    }
  }, [youtubeOnly])

  return (
    <StyledCard order={order}>
      <LinkNew active={active} path={path} query={query}>
        <a target={youtubeOnly ? '_blank' : '_self'}>
          <div className="img-back">
            {bannerUrl !== null && <img src={bannerUrl} alt="" />}
          </div>
          <CountDown
            target={releaseDate}
            title={titulo}
            modeloUrl={modeloUrl}
            onChangeActive={(props) => setActive(props)}
            premiere={premiere}
          />
        </a>
      </LinkNew>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  position: relative;
  width: 49%;
  min-width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 1%;
  box-shadow: 0px 0px 5px #ffffff77;
  order: ${({ order }) => order};
  &:before {
    content: '';
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
  &:hover {
    .img-back {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
`
