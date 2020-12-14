import styled from '@emotion/styled'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function RedirectModels({ pathname, audioUrl, id, cd }) {
  const [play, setPlay] = useState(false)
  const [icon, setIcon] = useState('volume-mute')

  const audioPlay = () => {
    const audio = document.getElementById('audio')

    if (!play) {
      audio.play()
      setPlay(true)
      setIcon('volume-up')
    } else {
      audio.pause()
      setPlay(false)
      setIcon('volume-mute')
    }
  }

  return (
    <>
      {audioUrl !== '' && (
        <audio
          id="audio"
          src={audioUrl}
          preload="auto"
          crossOrigin="anonymous"
          loop
        ></audio>
      )}
      <StyledRedirect>
        <Link
          href={{
            pathname: pathname,
            query: { id: id, cd: cd },
          }}
        >
          <a>
            <FontAwesomeIcon className="icon-plus" icon={['fas', 'file-alt']} />
          </a>
        </Link>

        {audioUrl !== '' && (
          <FontAwesomeIcon
            onClick={() => audioPlay()}
            className="icon-plus"
            icon={['fas', icon]}
          />
        )}
      </StyledRedirect>
    </>
  )
}

const StyledRedirect = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  .icon-plus {
    color: #fff;
    font-size: 1.5rem;
    margin-top: 20px;
  }
`
