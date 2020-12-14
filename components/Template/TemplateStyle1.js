import styled from '@emotion/styled'
import { useState, useRef, useEffect } from 'react'

import Header from 'components/Header/Header'
import SocialMedia from 'components/SocialMedia'
import Back from 'components/Button/BackStyle1'

export default function TemplateStyle1({
  links,
  linksSocial,
  loader,
  children,
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
      <Header
        links={links}
        first={2}
        onHandleClick={() => setActiveMenu(activeMenu === 1 ? 0 : 1)}
        active={activeMenu}
        load={load}
        white={true}
        pattern={true}
      />
      <SocialMedia linksSocial={linksSocial} color="#fff" />
      <StyledContent>
        <StyledContainer ref={container}>
          <StyledProject>
            <Back color="#fff" />
            {children}
          </StyledProject>
        </StyledContainer>
      </StyledContent>
    </>
  )
}

const StyledProject = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 50px 50px;
`

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
  }
`
const StyledContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 100px 50px;
`
