import type { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

export const GroupCard = ({ title, ...props }: GroupCardProps) => {
  return (
    <Container {...props}>
      <Icon />

      <Title>{title}</Title>
    </Container>
  );
};
