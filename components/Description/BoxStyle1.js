import styled from '@emotion/styled'

export default function BoxStyle1({ title, description }) {
  return (
    <StyledDescription>
      {description !== null && title !== null && (
        <>
          <h1>{title}</h1>
          <p>{description}</p>
        </>
      )}
    </StyledDescription>
  )
}

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 60px 0px;
  color: #fff;
  h1 {
    text-align: center;
    margin-bottom: 25px;
    border-bottom: solid 2px #3b3b3b;
    font-size: calc(1rem+1vw);
  }
  p {
    text-align: center;
    font-size: calc(1rem+1vw);
    font-weight: 400;
    margin-bottom: 60px;
  }
`
