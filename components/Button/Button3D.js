import styled from '@emotion/styled'
import Link from 'next/link'

export default function Button3D({ url, scale }) {
  return (
    <StyledButton3D scale={scale}>
      <Link href={url}>
        <div className="btn3d">
          <div className="cube">
            <figure className="back "></figure>
            <figure className="left"></figure>
            <figure className="bottom"></figure>
            <figure className="front"></figure>
            <figure className="right"></figure>
            <figure className="top"></figure>
          </div>
          <div className="view">
            <p>view 3D</p>
          </div>
        </div>
      </Link>
    </StyledButton3D>
  )
}

const StyledButton3D = styled.div`
  .btn3d {
    position: relative;
    width: 15px;
    height: 15px;
    perspective: 400px;
    cursor: pointer;
    transform: scale(${(props) => props.scale});
    .cube {
      position: absolute;

      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: translateY(0px) rotateY(0deg) rotateX(45deg) rotateZ(45deg);
      transition: all 0.5s linear;

      figure {
        width: 100%;
        height: 100%;
        margin: 0;
        border: 1px solid #fff;
        position: absolute;
        background: transparent;
        transition: all 0.3s linear;
      }
      .back {
        transform: rotateX(0deg) translateZ(-7px);
      }
      .left {
        transform: rotateY(90deg) translateZ(-7px);
      }
      .bottom {
        transform: rotateX(90deg) translateZ(-7px);
      }
      .front {
        transform: rotateX(0deg) translateZ(7px);
      }
      .top {
        transform: rotateX(90deg) translateZ(7px);
      }
      .right {
        transform: rotateY(90deg) translateZ(7px);
      }
    }
    .view {
      position: absolute;
      font-size: 0.9rem;
      width: 70px;
      top: 60%;
      left: 50%;
      transform: translateX(-50%) scaleY(0);
      color: #fff;
      border-radius: 9999999px;
      padding: 0px 2px;
      text-align: center;
      opacity: 0;
      transition: all 0.3s ease-out;
      p {
        font-family: Raleway;
        font-weight: 500;
      }
    }
    &:hover .cube figure {
      background: #f07241 !important;
    }
  }
  &:hover .btn3d .cube {
    transform: translateY(-10px) rotate(0deg) rotateX(65deg) rotateZ(135deg);
    figure {
      background: #fff;
      border: 1px solid #384146;
    }
  }
  &:hover .btn3d {
    .view {
      opacity: 1;
      transform: translateX(-50%) scaleY(1);
    }
  }
`
