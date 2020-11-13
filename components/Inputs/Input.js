import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

export default function Input({
  id,
  placeholder,
  type,
  icon,
  color,
  onChange,
  onInput,
  rows,
}) {
  useEffect(() => {
    const input = document.getElementById(id);

    const changeValue = (e) => {
      onChange && onChange(e.target.value);
    };
    const onFocus = (e) => {
      e.target.parentNode.style.boxShadow = "0px 0px 3px 1px #005c81bb";
      onInput(true);
    };
    const onBlur = (e) => {
      e.target.parentNode.style.boxShadow = "0px 0px 3px 1px #005c8155";
      onInput(false);
    };

    input.addEventListener("input", changeValue);
    input.addEventListener("focus", onFocus);
    input.addEventListener("blur", onBlur);
    return () => {
      input.removeEventListener("input", changeValue);
    };
  });
  return (
    <StyledInput color={color}>
      {type == "textarea" ? (
        <textarea name={id} id={id} rows={rows} placeholder={placeholder} />
      ) : (
        <input id={id} name={id} type={type} placeholder={placeholder} />
      )}
      <FontAwesomeIcon className="icon" icon={["fas", icon]} />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  background: #005c8122;
  padding: 5px;
  border-radius: 5px;
  color: ${(props) => props.color};
  box-shadow: 0px 0px 3px 1px #005c8155;
  input,
  textarea {
    padding: 5px;
    font-size: 1rem;
    width: 80%;
    resize: none;
    background: transparent;
    color: #4b4b4b;
    &:focus {
      outline: none;
    }
  }
  .icon {
    width: 17px;
    height: auto;
    margin-right: 10px;
  }
  @media screen and (min-width: 500px) and (orientation: landscape) {
    margin-bottom: 10px;
    padding: 2.5px;
    background: #ffffffdd;
    color: ${(props) => props.color};
    input,
    textarea {
      font-size: 0.8rem;
    }
  }
`;
