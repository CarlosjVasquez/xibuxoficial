import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Point from "../Logos/Point";

export default function LinkNav({ links, first, color }) {
  const [active, setActive] = useState(first);

  const LinkItems = () => {
    var items = [];
    var mayor = active + 2;
    var menor = active - 2;

    var a = [];
    links.map((link, index) => {
      a.push([index, link.Link, link.Titulo, link.order]);
    });
    a.sort((a, b) => {
      return a[3] - b[3];
    });

    a.map((link, index) => {
      items.push(
        <li
          key={index}
          className={
            index < mayor && index > menor
              ? index == active
                ? "item active"
                : index < active
                ? "item active-left"
                : "item active-right"
              : index >= mayor
              ? "item item-null-right"
              : "item item-null-left"
          }
        >
          <Link href={link[1]}>
            <a>{link[2]}</a>
          </Link>
        </li>
      );
    });

    return items;
  };

  const ClickRight = () => {
    active < links.length - 1 && setActive(active + 1);
  };

  const ClickLeft = () => {
    active > 0 && setActive(active - 1);
  };

  return (
    <StyledLinkNav color={color}>
      <Point
        active={active <= 0 ? false : true}
        onClickHandle={ClickLeft}
        color={color == "1" ? true : false}
        fillstroke="#3b3b3b"
        fillmed="#021154"
      />
      <ul>{LinkItems()}</ul>
      <Point
        active={active >= links.length - 1 ? false : true}
        onClickHandle={ClickRight}
        color={color == "1" ? true : false}
        fillstroke="#3b3b3b"
        fillmed="#021154"
      />
    </StyledLinkNav>
  );
}

const StyledLinkNav = styled.div`
  font-family: "Raleway", sans-serif;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .order {
    display: none;
  }
  ul {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 40px;
    margin: 0;
    padding: 0;
    list-style: none;
    .item {
      position: absolute;
      width: 33%;
      text-align: center;
      transition: all 0.2s linear;
      user-select: none;
      a {
        text-transform: uppercase;
        text-decoration: none;
        color: ${(props) => (props.color ? "#fff" : "#3b3b3b")};
        font-weight: 300;
      }
    }
    .active-left {
      font-size: 0.8rem;
      left: 0;
      opacity: 1;
    }
    .active {
      font-size: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;
    }
    .active-right {
      font-size: 0.8rem;
      right: 0;
      opacity: 1;
    }
    .item-null-right {
      font-size: 0rem;
      right: -10%;
      transform: translateX(-10%);
      opacity: 0;
    }
    .item-null-left {
      font-size: 0rem;
      left: -10%;
      transform: translateX(10%);
      opacity: 0;
    }
  }
  .btn-slider {
    width: 5%;
    cursor: pointer;
  }
  .btn-slider-null {
    width: 5%;
    opacity: 0.2;
    user-select: none;
  }
  @media screen and (min-width: 400px) {
    width: 350px;
    ul {
      .active {
        font-size: 1.5rem;
      }
      .active-left {
        font-size: 1rem;
      }
      .active-right {
        font-size: 1rem;
      }
    }
  }
  @media screen and (min-width: 900px) {
    width: 500px;
  }
`;
