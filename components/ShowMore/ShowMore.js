import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import Point from '../Logos/Point'

export default function ShowMore() {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const showView = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 200) setActive(false)
      if (currentScrollY <= 200) setActive(true)
    }

    window.addEventListener('scroll', showView, { passive: true })
    return () => {
      window.removeEventListener('scroll', showView)
    }
  })

  return (
    <ShowMoreStyled active={active}>
      <Point
        active={true}
        onClickHandle={() => console.log('hola')}
        color={true}
      />
    </ShowMoreStyled>
  )
}

const translatePoint = keyframes`
  0%{
    transform: translateY(-50px) rotate(90deg);
  }
  50%{
    transform: translateY(0px) rotate(90deg);
  }
    100%{
    transform: translateY(-50px) rotate(90deg);
  }
`

const ShowMoreStyled = styled.div`
  opacity: ${(props) => (props.active ? '1' : '0')};
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px 20px;
  width: 70px;
  transform: rotate(90deg);
  z-index: 5;
  animation: ${translatePoint} infinite 0.5s linear;
  transition: opacity 0.3s ease;
`
