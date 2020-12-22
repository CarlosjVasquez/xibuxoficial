import styled from '@emotion/styled'

export default function SliderTwo({ category, active, onClickHandle }) {
  return (
    <StyledBtnSlider>
      <ul>
        {category.map((item, key) => {
          if (item.active) {
            return (
              <StyledItem key={key}>
                <StyledLabel
                  active={active === key ? true : false}
                  onClick={() => onClickHandle(key)}
                >
                  {item.titulo}
                </StyledLabel>
              </StyledItem>
            )
          }
        })}
      </ul>
    </StyledBtnSlider>
  )
}
const StyledBtnSlider = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  z-index: 5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  user-select: none;
  ul {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    top: 60px;
  }
`

const StyledItem = styled.li`
  position: relative;
  margin: 0 10px;
`

const StyledLabel = styled.h1`
  font-family: Raleway;
  font-weight: 400;
  text-align: center;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? 'solid 2px #021154' : 'none')};
`
