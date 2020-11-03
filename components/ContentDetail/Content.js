import styled from "@emotion/styled";

export default function Content({
  active,
  project,
  onClickHandle,
  index,
  item,
}) {
  return (
    <StyledContent>
      <div className={index === active ? "content active" : "content inactive"}>
        <h1 className={index === active && !project ? "visible" : "invisible"}>
          {item.titulo}
        </h1>
        <h4 className={index === active && !project ? "visible" : "invisible"}>
          {item.subtitulo}
        </h4>
        <p className={index === active && !project ? "visible" : "invisible"}>
          {item.descripcion}
        </p>
        <div
          onClick={onClickHandle}
          className={
            index === active && !project ? "btn visible " : "btn invisible "
          }
        >
          <a>projects</a>
        </div>
      </div>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  text-align: center;
  .active {
    z-index: 5;
  }
  .inactive {
    z-index: -1;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    padding: 0;
    font-family: Raleway;
    color: #021154;
    perspective: 1000px;
    box-sizing: content-box;
    h1 {
      font-size: 4rem;
      font-weight: 400;
      margin: 0;
      padding: 0;
      line-height: 3.5rem;
      transition: all 0.5s cubic-bezier(0.44, -0.51, 0.54, 1.48);
      transform-origin: left;
    }
    h4 {
      font-size: 1.5rem;
      font-weight: 300;
      margin: 0 0 0.5rem 0;
      padding: 0;
      line-height: 1.5rem;
      transition: all 0.5s cubic-bezier(0.44, -0.51, 0.54, 1.48);
      transition-delay: 0.1s;
      transform-origin: left;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.5rem;
      margin: 0 0 1rem 0;
      transition: all 0.5s cubic-bezier(0.44, -0.51, 0.54, 1.48);
      transition-delay: 0.2s;
      transform-origin: left;
    }
    .btn {
      width: 25%;
      background: linear-gradient(
        -45deg,
        #3b69ff 0 calc(50% - 10px),
        #ffffff55 50%,
        #cc6600 calc(50% + 10px) 100%
      );
      background-size: 250% 100%;
      background-position: 100% 50%;
      color: #fff;
      border-radius: 99999px;
      overflow: hidden;
      padding: 0.5rem 2rem;
      transition: all 0.5s cubic-bezier(0.44, -0.51, 0.54, 1.48),
        0.3s background-position linear;
      transition-delay: 0.3s;
      transform-origin: left;
      cursor: pointer;
      text-align: center;
      &:hover {
        background-position: 0% 50%;
        transition: all 0.5s cubic-bezier(0.44, -0.51, 0.54, 1.48),
          0.3s background-position linear;
        transition-delay: 0.3s;
      }
    }
    .visible {
      opacity: 1;
      transform: rotateY(0);
    }
    .invisible {
      opacity: 0;
      transform: rotateY(180deg);
    }
  }
  @media screen and (min-width: 500px) {
    .content {
      h1 {
        font-size: 5.5rem;
        line-height: 4rem;
      }
      h4 {
        font-size: 2.5rem;
        line-height: 2rem;
        margin-bottom: 50px;
      }
      p {
        font-size: 2rem;
        line-height: 2rem;
      }
      .btn {
        font-size: 2rem;
      }
    }
  }
  @media screen and (min-width: 500px) and (orientation: landscape) {
    width: 60%;
    height: 100%;
    top: 0;
    .content {
      align-items: flex-start;
      text-align: left;

      h1 {
        font-size: 4rem;
        line-height: 3.5rem;
      }
      h4 {
        font-size: 1.5rem;
        line-height: 1.5rem;
        margin: 0;
      }
      p {
        font-size: 1rem;
        line-height: 1rem;
      }
      .btn {
        font-size: 1rem;
      }
    }
  }
  @media screen and (min-width: 900px) {
    .content {
      h1 {
        font-size: 7rem;
        line-height: 5.5rem;
      }
      h4 {
        font-size: 4rem;
        line-height: 3rem;
      }
      p {
        font-size: 1.5rem;
        line-height: 2rem;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    .content {
      width: 80%;
      h1 {
        font-size: 10rem;
        line-height: 7.5rem;
        font-weight: 500;
      }
      h4 {
        font-size: 6rem;
        line-height: 5rem;
        font-weight: 200;
        margin: 0 0 2rem 0;
      }
      p {
        font-size: 2.5rem;
        line-height: 3rem;
        font-weight: 200;
        margin: 0 0 2.5rem 0;
      }
      .btn {
        font-size: 2rem;
      }
    }
  }
`;
