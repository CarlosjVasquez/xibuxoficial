import { useState } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinkSocial from './LinkSocial'

export default function SocialMedia({ linksSocial, color }) {
  const [socialActive, setSocialActive] = useState(0)

  const onClickHandle = () => {
    socialActive === 1 ? setSocialActive(0) : setSocialActive(1)
  }

  return (
    <StyledSocialMedia color={color !== '' ? color : '#021154'}>
      <LinkSocial linksSocial={linksSocial} socialActive={socialActive} />
      <FontAwesomeIcon
        onClick={onClickHandle}
        className="icon-plus"
        icon={['fas', 'plus-circle']}
      />
    </StyledSocialMedia>
  )
}

const StyledSocialMedia = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  .icon-plus,
  .icon {
    color: ${(props) => (props.color ? '#fff' : '#021154')};
    font-size: 1.5rem;
    margin-top: 20px;
  }
  .icon-plus {
    cursor: pointer;
  }
`
