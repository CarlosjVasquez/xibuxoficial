import styled from '@emotion/styled'

export default function GalleryItemStyle1({ url }) {
  return (
    <StyledItem>
      <div className="img-back">
        <img src={url} alt="" />
      </div>
    </StyledItem>
  )
}

const StyledItem = styled.div`
  position: relative;
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 10px;
  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-top: 56.25%;
  }
  .img-back {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 100%;
    height: 100%;
    transition: all 1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      min-height: 100%;
    }
  }
`
