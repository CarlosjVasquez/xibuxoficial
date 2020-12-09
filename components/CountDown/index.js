import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Button3D from 'components/Button/Button3D'

export default function CountDown({
  target,
  title,
  modeloUrl,
  onChangeActive,
  premiere,
}) {
  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2/$3/$1')
  }

  const calculateTimeLeft = () => {
    let format

    if (premiere) {
      format = formato(target)
    } else {
      format = '1900/1/1'
    }

    const difference = +new Date(format) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      }
      onChangeActive(false)
    } else {
      onChangeActive(true)
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    )
  })

  return (
    <StyledButton active={timerComponents.length ? 0 : 1}>
      {timerComponents.length ? (
        <StyledCount>{timerComponents}</StyledCount>
      ) : (
        <>
          {modeloUrl !== '' && <Button3D url={modeloUrl} scale="1.5" />}

          <div className="des-item">
            <h1>{title}</h1>
          </div>
        </>
      )}
    </StyledButton>
  )
}

const StyledCount = styled.div`
  color: #fff;
`

const StyledButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #000000aa;
  opacity: 0;
  transition: all 1s ease;
  padding: 5%;
  .des-item {
    color: #fff;
    h1 {
      font-size: 2.5vw;
      font-weight: 500;
      border-bottom: solid 2px #fff;
    }
  }
  &:hover {
    opacity: 1;
  }
`
