import styled from "@emotion/styled";
import LogoMenutwo from "../Logos/Menutwo";
import LinkNav from "./LinkNav";

export default function Header({ links, first, onHandleClick, active }) {
  return (
    <>
      <HeaderStyled>
        <div className="cont-header">
          <div className="logo">
            <img src="/images/xibux-logo.png" alt="Xibux Logo" />
          </div>
          <div className={active == 1 ? "menu show-menu" : "menu hide-menu"}>
            <LinkNav links={links} first={first} />
          </div>
          <div className="btn">
            <LogoMenutwo
              height="40px"
              fill="#021154"
              fillpoint="#0DFF7C"
              fillsecond="#FF6200"
              onClick={onHandleClick}
              animated={active}
            />
          </div>
        </div>
      </HeaderStyled>
    </>
  );
}

const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  height: 80px;
  z-index: 15;
  .cont-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  @media screen and (min-width: 400px) {
    .cont-header {
      .logo {
        display: block;
        height: 50px;
      }
      .btn {
        display: flex;
      }
    }
  }
`;
