import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

function Point(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <circle
        className={props.animated}
        fill="transparent"
        stroke={props.fillstroke}
        strokeWidth="2"
        cx="256"
        cy="256"
        r="20"
      />
      <circle cx="256" cy="256" r="50" fill={props.fillmed} />
    </svg>
  );
}

function LogoAnimated({ active, onClickHandle, fillstroke, fillmed }) {
  return (
    <LogoAnimatedstyled
      className={active ? "btn-slider" : "btn-slider-null"}
      onClick={onClickHandle}
    >
      <Point
        className="svg"
        fillstroke={fillstroke}
        fillmed={fillmed}
        animated={active ? "stroke animated" : "animated-null"}
      />
    </LogoAnimatedstyled>
  );
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
`;

const LogoAnimatedstyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .svg {
    width: 100%;
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
`;

export default LogoAnimated;
