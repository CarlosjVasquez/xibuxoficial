import styled from '@emotion/styled'
import StyledItem from './GalleryItemStyle1'

export default function GalleryStyle1({ gallery }) {
  return (
    <StyledGallery>
      {gallery.map((item, key) => {
        return <StyledItem key={key} url={item.url} />
      })}
    </StyledGallery>
  )
}

const StyledGallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`
