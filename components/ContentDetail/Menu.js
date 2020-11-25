import styled from "@emotion/styled";
import Arrow from "../Logos/Arrow";
import { useRouter } from "next/router";

export default function Menu({ active, project, onClickHandle, item, index }) {
  const router = useRouter();

  const linkDetail = (e) => {
    const link = e.target.dataset.href;
    router.push(`/modelwork/${link}`);
  };

  const linkModel = (e) => {
    const link = e;
    router.push(`/modelsreview/${link}`);
  };

  return (
    <StyledSecondMenu zIndex={active}>
      <div
        className={
          index === active && project
            ? "content-menu active"
            : "content-menu inactive"
        }
      >
        <div className="cont">
          <div className="header">
            <div className="back">
              <Arrow onClick={onClickHandle} height="100%" fill="#ffffff" />
            </div>
            <div className="breadcrumbs">
              <p>
                Work <span>•</span> {item.titulo + " " + item.subtitulo}
              </p>
              <p>Projects</p>
            </div>
          </div>
          <div className="projects">
            <div className="content-project">
              {item.proyectos.map((item, index) => {
                return (
                  <div className="project-item" key={index}>
                    <a
                      data-href={item.titulo}
                      className="name"
                      onClick={(e) => linkDetail(e)}
                    >
                      {item.titulo}
                    </a>
                    {item.link_modelo && (
                      <a
                        onClick={(e) => linkModel(item.link_modelo)}
                        className="btn3d"
                      >
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
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="leyends">
          <p>Show 3d Scene</p>
          <a>btn</a>
        </div>
      </div>
    </StyledSecondMenu>
  );
}

const StyledSecondMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 300px;
  .active {
    box-shadow: -5px 0 5px 0 rgba(0, 0, 0, 1);
    transform: translateX(0);
    z-index: 20;
  }
  .inactive {
    box-shadow: none;
    transform: translateX(100%);
    z-index: -1;
  }
  .content-menu {
    background: #1b262c;
    width: 100%;
    height: 100%;
    padding: 25px;
    transition: 0.5s all cubic-bezier(0.42, 0, 0.6, 1);
    transform-origin: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .cont {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .header {
        width: 100%;
        height: auto;
        .back {
          width: 100%;
          svg {
            border-radius: 50%;
            padding: 4px;
            height: 25px;
            cursor: pointer;
            &:hover {
              background: rgba(255, 255, 255, 0.1);
            }
          }
        }
        .breadcrumbs {
          width: 100%;
          color: #fff;
          font-family: Raleway;
          font-size: 1rem;
          font-weight: 300;
          margin: 0;
          padding: 10px 0 5px 0;
          border-bottom: solid 2px #384146;
          p:nth-of-type(1) {
            margin-bottom: 20px;
          }
          p:nth-of-type(2) {
            text-transform: uppercase;
            color: #c6c6c6;
          }
        }
      }
      .projects {
        width: 100%;
        color: #fff;
        overflow-y: auto;
        .content-project {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          margin: 10px 0;
          .project-item {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: #384146;
            padding: 15px 20px;
            margin-bottom: 15px;
            border-left: solid 8px #cc6600;
            border-radius: 0 10px 10px 0;
            .name {
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            .btn3d {
              position: relative;
              width: 15px;
              height: 15px;
              perspective: 400px;
              margin-right: 20px;
              cursor: pointer;
              .cube {
                position: absolute;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
                transform: translateY(0px) rotateY(0deg) rotateX(45deg)
                  rotateZ(45deg);
                transition: all 0.5s linear;

                figure {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  border: 1px solid #fff;
                  position: absolute;
                  background: transparent;
                  transition: all 0.5s linear;
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
                transition: all 0.5s ease-out;
                p {
                  font-family: Raleway;
                  font-weight: 500;
                }
              }
            }
            &:hover .btn3d .cube {
              transform: translateY(-10px) rotate(0deg) rotateX(65deg)
                rotateZ(135deg);
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
          }
        }
      }
    }

    .leyends {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 0.8rem;
      border-top: solid 1px #fff;
      padding-top: 10px;
      p {
        color: #fff;
        padding: 0;
        margin: 0;
      }
    }
  }
  @media screen and (min-width: 900px) {
    .content-menu {
      .cont {
        .header {
          .breadcrumbs {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;
