import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function LinkSocial({ linksSocial, socialActive }) {
  const SocialLink = linksSocial.map((item, index) => {
    if (item.Active) {
      return (
        <div
          key={index}
          className={
            socialActive === 1
              ? `socialLinkShow socialLink-${index}`
              : `socialLink-${index} socialLinkHide`
          }
        >
          <Link href={item.Link}>
            <a>
              <FontAwesomeIcon
                className={socialActive === 1 ? ' icon' : ' icon'}
                icon={['fab', String(item.Name).toLowerCase()]}
              />
            </a>
          </Link>
        </div>
      )
    }
  })
  return (
    <StyledLinkSocial links={linksSocial.length}>{SocialLink}</StyledLinkSocial>
  )
}

function SocialLinks(links) {
  let styles = ''
  let second = 0
  for (let i = 0; i < links; i += 1) {
    styles += `
      .socialLink-${i} {
        transform: translateX(-250%);
        transition: 0.5s cubic-bezier(0.51, -0.77, 0.51, 1.77);
        transition-delay: ${second}s;
      }
    `
    second += 0.05
  }
  return styles
}

const StyledLinkSocial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) => SocialLinks(props.links)};
  .socialLinkShow {
    transform: translateX(0);
  }
  .socialLinkHide {
    transform: translateX(-250%);
  }
`
