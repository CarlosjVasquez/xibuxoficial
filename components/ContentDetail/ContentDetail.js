import Content from "./Content";
import Menu from "./Menu";
import styled from "@emotion/styled";

export default function ContentDetail({
  category,
  active,
  project,
  onClickHandle,
}) {
  return (
    <>
      {category.map((item, index) => {
        return (
          <StyledContentDetail key={index}>
            <Content
              active={active}
              project={project}
              onClickHandle={onClickHandle}
              index={index}
              item={item}
            />
            <Menu
              active={active}
              project={project}
              onClickHandle={onClickHandle}
              index={index}
              item={item}
            />
          </StyledContentDetail>
        );
      })}
    </>
  );
}

const StyledContentDetail = styled.div`
  display: contents;
`;
