import styled from '@emotion/styled'
import router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BackStyle1({ color }) {
  return (
    <StyleBack onClick={() => router.back()} color={color}>
      <div className="btn">
        <FontAwesomeIcon icon={['fas', 'long-arrow-alt-left']} />
        <a>Back</a>
      </div>
    </StyleBack>
  )
}

const StyleBack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => props.color};
  .btn {
    cursor: pointer;
    a {
      margin-left: 5px;
    }
  }
`
