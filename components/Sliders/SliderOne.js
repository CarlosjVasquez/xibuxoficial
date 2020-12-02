import styled from "@emotion/styled";
import Point from "../Logos/Point";

export default function SliderOne({ category, active, onClickHandle }) {
  return (
    <StyledBtnSlider>
      {category.map((item, key) => {
        return (
          <StyledItem key={key}>
            <Point
              active={key === active ? false : true}
              onClickHandle={() => onClickHandle(key)}
              fillstroke="#3b3b3b"
              fillmed="#021154"
            />
            <StyledLabel>{item.titulo + " " + item.subtitulo}</StyledLabel>
          </StyledItem>
        );
      })}
    </StyledBtnSlider>
  );
}

const StyledBtnSlider = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 5;
  display: flex;
  flex-direction: row;
  user-select: none;
`;

const StyledItem = styled.div`
  position: relative;
  svg {
    max-width: 50px;
    cursor: pointer;
    margin: 0 5px;
    user-select: none;
    border-radius: 50%;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }
  &:hover h1 {
    opacity: 1;
  }
`;

const StyledLabel = styled.h1`
  position: absolute;
  top: -75%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 1rem;
  opacity: 0;
  color: #021154;
`;
