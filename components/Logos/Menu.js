import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

function Menu(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        className="linefirst"
        fill={props.fill}
        d="M479.18 91.897 H32.821 C14.69 91.897 0 77.207 0 59.077 s14.69-32.821 32.821-32.821 H479.18 c18.13 0 32.82 14.69 32.82 32.821s-14.69 32.82-32.82 32.821z"
      />
      <path
        className="line"
        fill={props.fill}
        d="M280.385 288.821 H32.821 C14.69 288.821 0 274.13 0 256s14.69-32.821 32.821-32.821h 280.385c18.13 0 32.821 14.69 32.821 32.821s-14.691 32.821-32.821 32.821z"
      />
      <path
        className="invert"
        fill={props.fill}
        d="M479.18 288.821 H32.821 C160.69 288.821 130 288.821 130 256 s14.69-32.821 32.821-32.821 H479.18 c18.13 0 32.821 14.69 32.821 32.821s-14.691 32.821-32.821 32.821z"
      />
      <path
        fill={props.fillpoint}
        className="point"
        d="M479.18 288.821 h-52.513c-18.13 0-32.821-14.69-32.821-32.821s14.69-32.821 32.821-32.821 h52.513c18.13 0 32.82 14.69 32.82 32.821s-14.69 32.821-32.82 32.821z"
      />
      <path
        fill={props.fill}
        d="M479.18 485.744 H32.821 C14.69 485.744 0 471.053 0 452.923c0-18.13 14.69-32.821 32.821-32.821H479.18c18.13 0 32.82 14.69 32.82 32.821 0 18.13-14.69 32.821-32.82 32.821z"
      />
    </svg>
  );
}

const translatePoint = keyframes`
  0%{
    transform: translateX(-5%);
  }
  3%{
    transform: translatex(-85%);
  }
  6%,100%{
    transform: translatex(-5%);
  }
`;

const translateLine = keyframes`
  0%{
    transform: scaleX(1);
  }
  3%{
   transform: scaleX(0);
  }
  6%,100%{
    transform: scaleX(1);
  }
`;

const translateLineI = keyframes`
  0%{
    transform: scaleX(0);
  }
  3%{
   transform: scaleX(1);
  }
  6%,100%{
    transform: scaleX(0);
  }
`;

const LogoAnimated = styled(Menu)`
  width: auto;
  height: auto;
  cursor: pointer;
  .point {
    animation: ${translatePoint} infinite 10s linear;
  }
  .linefirst {
    transform: scaleX(0.3);
  }
  .line {
    animation: ${translateLine} infinite 10s linear;
  }
  .invert {
    animation: ${translateLineI} infinite 10s linear;
    transform-origin: right;
  }
  &:hover {
    .line,
    .invert,
    .point {
      animation-play-state: paused;
    }
  }
`;

export default LogoAnimated;
