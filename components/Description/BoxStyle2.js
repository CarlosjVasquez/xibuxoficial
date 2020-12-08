import styled from '@emotion/styled'
import Button from 'components/Button/ButtonStyle1'

export default function BoxStyled2() {
  return (
    <StyledBox>
      <div className="description">
        <p>We work tirelessly to make your animation just plain awesome</p>
        <div className="space"></div>
        <p>
          Feel free to ask any questions and we will find suitable option
          <br /> just for you. Are you ready to start?
        </p>
      </div>
      <Button url="/contact" title="Contact" margin="40px" />
    </StyledBox>
  )
}

const StyledBox = styled.div`
  width: 100%;
  background: #f07241;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Raleway;
  .description {
    width: 100%;
    max-width: 1280px;
    text-align: center;
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-bottom: 30px;
    .space {
      width: 150px;
      height: 3px;
      background: #fff;
      margin: 15px;
    }
  }
  @media only screen and (min-width: 1000px) {
    .cont {
      padding: 60px 30px;
    }
    .description {
      font-size: 2.5rem;
      margin-bottom: 60px;
    }
  }
`
