import Content from './Content'
import styled from '@emotion/styled'

export default function ContentDetail({ category, active, project }) {
  return (
    <>
      {category.map((item, index) => {
        if (item.active) {
          return (
            <StyledContentDetail key={index}>
              <Content
                active={active}
                project={project}
                index={index}
                item={item}
              />
              {/* <Menu
              active={active}
              project={project}
              onClickHandle={onClickHandle}
              index={index}
              item={item}
            /> */}
            </StyledContentDetail>
          )
        }
      })}
    </>
  )
}

const StyledContentDetail = styled.div`
  display: contents;
`
