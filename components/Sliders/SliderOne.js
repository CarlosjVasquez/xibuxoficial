import styled from "@emotion/styled";
import Point from "../Logos/Point";

export default function SliderOne({ category, active, onClickHandle }) {
  return (
    <StyledBtnSlider>
      {category.map((item, index) => {
        return (
          <Point
            key={index}
            active={index === active ? true : false}
            onClickHandle={() => onClickHandle(index)}
            fillstroke="#3b3b3b"
            fillmed="#021154"
          />
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
  svg {
    max-width: 35px;
    cursor: pointer;
    margin: 0 5px;
    user-select: none;
    border-radius: 50%;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }
`;
