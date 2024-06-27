import { TouchableOpacityProps } from "react-native";
import type { FilterStyleProps } from "./styles";
import { Container, Title } from "./styles";

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
  title: string;
}

export const Filter = ({ title, isActive = false, ...props }: FilterProps) => {
  return (
    <Container {...props} isActive={isActive}>
      <Title>{title}</Title>
    </Container>
  );
};
