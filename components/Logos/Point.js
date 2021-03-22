import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

function Point(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill={props.fillmed}
        d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
      />
      {/* <path
        fill="transparent"
        stroke="#3b3b3b"
        strokeWidth="2"
        className={props.animated}
        d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
      /> */}

      {/* <circle
        className={props.animated}
        fill="transparent"
        stroke={props.fillstroke}
        strokeWidth="2"
        cx="256"
        cy="256"
        r="20"
      />
      <circle cx="256" cy="256" r="50" fill={props.fillmed} /> */}
    </svg>
  )
}

function LogoAnimated({
  active,
  onClickHandle,
  fillstroke,
  fillmed,
  color,
  invert,
}) {
  return (
    <LogoAnimatedstyled
      className={active ? 'btn-slider' : 'btn-slider-null'}
      onClick={onClickHandle}
    >
      <Point
        className={invert ? 'svg invert' : 'svg'}
        fillstroke={color ? '#fff' : fillstroke}
        fillmed={color ? '#fff' : fillmed}
        animated={active ? 'stroke animated' : 'animated-null'}
      />
    </LogoAnimatedstyled>
  )
}

const translatePoint = keyframes`
  0%{
      opacity: 1;
    transform: scale(1);
  }
  80%,100%{
    opacity: 0;
    transform: scale(7);
  }
`

const LogoAnimatedstyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .invert {
    transform: rotate(180deg);
  }
  .svg {
    width: 80%;
  }
  .svg .stroke {
    animation: ${translatePoint} infinite 1.5s linear;
    transform-origin: center;
  }
  .animated {
    animation-play-state: running;
  }
  .animated-null {
    animation-play-state: paused;
  }
`

export default LogoAnimated
