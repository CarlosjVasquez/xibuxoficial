import styled from '@emotion/styled'

export default function YoutubeVideo({ url }) {
  return (
    <StyledYoutubeVideo>
      <iframe
        id="video"
        src={`https://www.youtube.com/embed/${url}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </StyledYoutubeVideo>
  )
}

const StyledYoutubeVideo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 56.25%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
