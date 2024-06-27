import { Text, TouchableOpacityProps } from "react-native";

import type { ButtonIconVariantStyleProps } from "./styles";
import { Container, Icon } from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: ButtonIconVariantStyleProps;
}

export const ButtonIcon = ({
  icon,
  variant = "primary",
  ...props
}: ButtonIconProps) => {
  return (
    <Container {...props}>
      <Icon variant={variant} name={icon} />
    </Container>
  );
};
