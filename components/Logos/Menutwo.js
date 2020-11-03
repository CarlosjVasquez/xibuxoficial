import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

function MenuTwo(props) {
  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        id="top"
        className="top"
        fill={props.fill}
        d="M236.8,118.4H96.9c-10.6,0-19.2,8.7-19.2,19.2v0c0,10.6,8.7,19.2,19.2,19.2h139.9c10.6,0,19.2-8.7,19.2-19.2v0
	C256,127.1,247.3,118.4,236.8,118.4z"
      />
      <path
        id="middleleft"
        className={
          props.animated == 1
            ? "middleleft middleleft-anim-show"
            : "middleleft middleleft-anim-hide"
        }
        fill={props.fillpoint}
        d="M178.6,238.1H96.9c-10.6,0-19.2,8.7-19.2,19.2v0c0,10.6,8.7,19.2,19.2,19.2h81.7c10.6,0,19.2-8.7,19.2-19.2
	v0C197.9,246.7,189.2,238.1,178.6,238.1z"
      />
      <path
        id="middleright"
        className={
          props.animated == 1
            ? "middleright middleright-anim-show"
            : "middleright middleright-anim-hide"
        }
        fill={props.fillsecond}
        d="M415.1,238.1h-81.7c-10.6,0-19.2,8.7-19.2,19.2v0c0,10.6,8.7,19.2,19.2,19.2h81.7
	c10.6,0,19.2-8.7,19.2-19.2v0C434.3,246.7,425.7,238.1,415.1,238.1z"
      />
      <path
        id="point"
        className={
          props.animated == 1
            ? "point point-anim-show"
            : "point point-anim-hide"
        }
        fill={props.fill}
        d="M275,232.1H237c-13.9,0-25.2,11.3-25.2,25.2v0c0,13.9,11.3,25.2,25.2,25.2H275c13.9,0,25.2-11.3,25.2-25.2v0
	C300.2,243.5,288.9,232.1,275,232.1z"
      />
      <path
        id="bottom"
        className="bottom"
        fill={props.fill}
        d="M415.1,357.8H96.9c-10.6,0-19.2,8.7-19.2,19.2v0c0,10.6,8.7,19.2,19.2,19.2h318.2c10.6,0,19.2-8.7,19.2-19.2v0
	C434.3,366.4,425.7,357.8,415.1,357.8z"
      />
    </svg>
  );
}

const translatePointShow = keyframes`
  0%{
   transform: translateX(-150%);
  }
  100%{
    transform: translateX(130%);
  }
`;

const translatePointHide = keyframes`
  0%{
   transform: translateX(130%);
  }
  100%{
    transform: translateX(-150%);
  }
`;

const translateMiddleLeftShow = keyframes`
  0%{
   transform: scaleX(0) translateX(0);
  }
  100%{
    transform: scaleX(1.8) translateX(0);
  }
`;

const translateMiddleLeftHide = keyframes`
  0%{
   transform: scaleX(1.8) translateX(0);
  }
  100%{
    transform: scaleX(0) translateX(0);
  }
`;

const translateMiddleRightShow = keyframes`
  0%{
   transform: scaleX(1.8) translateX(0);
  }
  100%{
    transform: scaleX(0) translateX(0);
  }
`;

const translateMiddleRightHide = keyframes`
  0%{
   transform: scaleX(0) translateX(0);
  }
  100%{
    transform: scaleX(1.8) translateX(0);
  }
`;

const LogoAnimated = styled(MenuTwo)`
  width: auto;
  height: auto;
  cursor: pointer;
  .middleleft {
    transform: scaleX(1.8) translateX(0);
    transform-origin: left;
    transform-box: fill-box;
  }
  .middleleft-anim-show {
    animation: ${translateMiddleLeftShow} 1 0.25s linear forwards;
  }
  .middleleft-anim-hide {
    animation: ${translateMiddleLeftHide} 1 0.25s linear forwards;
  }
  .middleright {
    transform: scaleX(0) translateX(0);
    transform-origin: right;
    transform-box: fill-box;
  }
  .middleright-anim-show {
    animation: ${translateMiddleRightShow} 1 0.25s linear forwards;
  }
  .middleright-anim-hide {
    animation: ${translateMiddleRightHide} 1 0.25s linear forwards;
  }
  .point {
    transform: translateX(150%);
    transform-box: fill-box;
  }
  .point-anim-show {
    animation: ${translatePointShow} 1 0.25s linear forwards;
  }
  .point-anim-hide {
    animation: ${translatePointHide} 1 0.25s linear forwards;
  }
`;

export default LogoAnimated;
