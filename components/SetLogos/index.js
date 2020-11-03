import styled from "@emotion/styled";

export default function SectionLogo({ logo }) {
  const { API_URL } = process.env;
  return (
    <SectionStyle>
      <h1>{logo.Titulo}</h1>
      <p dangerouslySetInnerHTML={{ __html: logo.Description }} />
      <img src={API_URL + logo.Imagen.url} alt={logo.Titulo} />
      <video src={API_URL + logo.Video.url} autoPlay loop muted />
    </SectionStyle>
  );
}

const SectionStyle = styled.div``;
