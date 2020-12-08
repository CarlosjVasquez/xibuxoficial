import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import LogoMenutwo from '../Logos/Menutwo'
import LinkNav from './LinkNav'

export default function Header({
  links,
  first,
  onHandleClick,
  active,
  white,
  load,
  project,
  scrollActive,
  backActive,
  pattern,
}) {
  const [mode, setMode] = useState(white)
  const [back, setBack] = useState(
    backActive === undefined ? false : backActive
  )
  useEffect(() => {
    if (scrollActive) {
      const scroll = () => {
        if (window.scrollY >= 250) {
          setMode(false)
          setBack(true)
        } else {
          setMode(true)
          setBack(false)
        }
      }

      window.addEventListener('scroll', scroll)
    }

    return () => {
      if (scrollActive) {
        window.removeEventListener('scroll', scroll)
      }
    }
  })

  return (
    <>
      <HeaderStyled
        back={back ? '#fff' : 'transparent'}
        box={back ? '0px 0px 4px 0px #3b3b3b99' : 'none'}
        load={load}
        project={project}
        pattern={
          pattern
            ? 'https://res.cloudinary.com/carlosvv18/image/upload/v1607394910/g1vb0bafp8pbkm7hesed.jpg'
            : ''
        }
      >
        <div className="cont-header">
          <div className="logo">
            {mode ? (
              <img src="/images/xibux.png" alt="Xibux Logo" />
            ) : (
              <img src="/images/xibux-logo.png" alt="Xibux Logo" />
            )}
          </div>
          <div className={active === 1 ? 'menu show-menu' : 'menu hide-menu'}>
            <LinkNav links={links} first={first} color={mode ? '1' : 0} />
          </div>
          <div className="btn">
            <LogoMenutwo
              height="40px"
              fill={mode ? '#fff' : '#021154'}
              fillpoint="#0DFF7C"
              fillsecond="#FF6200"
              onClick={onHandleClick}
              animated={active}
            />
          </div>
        </div>
      </HeaderStyled>
    </>
  )
}

const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  height: 80px;
  z-index: ${(props) => (props.project ? 0 : 15)};
  background: ${(props) => props.back};
  background-image: url(${(props) => props.pattern});
  box-shadow: ${(props) => props.box};
  transform: translateY(${(props) => (props.load ? '0' : '-100%')});
  transition: all 0.3s linear;

  .cont-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    .logo {
      display: none;
      align-items: center;
      justify-content: center;
      height: 100%;
      user-select: none;
      img {
        height: 100%;
      }
    }
    .menu {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      transition: 0.5s cubic-bezier(0.5, -0.5, 0.5, 1.5);
    }
    .show-menu {
      transform: translateY(0%);
    }
    .hide-menu {
      transform: translateY(-100%);
    }
    .btn {
      height: 100%;
      justify-content: center;
      align-items: center;
      display: none;
    }
  }
  @media screen and (min-width: 500px) {
    .cont-header {
      justify-content: space-between;
      .logo {
        display: block;
        height: 50px;
      }
      .btn {
        display: flex;
      }
    }
  }
`
