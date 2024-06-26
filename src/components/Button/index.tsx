import { TouchableOpacityProps } from "react-native";

import { ButtonStyleVariants, Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonStyleVariants;
}

export const Button = ({
  title,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <Container variant={variant} {...props}>
      <Title>{title}</Title>
    </Container>
  );
};
