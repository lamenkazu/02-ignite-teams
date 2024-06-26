import { Container, Subtitle, Title } from "./styles";

interface HighlightProps {
  title: string;
  subtitle: string;
}

export const Highlight = ({ title, subtitle }: HighlightProps) => {
  return (
    <Container>
      <Title>{title}</Title>

      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};
