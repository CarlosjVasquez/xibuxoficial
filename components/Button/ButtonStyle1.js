import styled from '@emotion/styled'
import Link from 'next/link'

export default function ButtonStyle1({ url, margin, radius, title }) {
  return (
    <StyleButton margin={margin} radius={radius}>
      <Link href={url}>
        <div className="btn">
          <a>{title}</a>
        </div>
      </Link>
    </StyleButton>
  )
}

const StyleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${(props) => props.margin};
  .btn {
    text-align: center;
    padding: 15px 25px;
    border-radius: 5px;
    background: #2e3547;
    color: #fff;
    font-size: 1.5rem;
    font-family: Raleway;
    font-weight: 400;
    cursor: pointer;
  }
`
