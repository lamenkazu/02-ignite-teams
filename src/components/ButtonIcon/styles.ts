import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

export type ButtonIconVariantStyleProps = "primary" | "secondary";

interface ButtonIconProps {
  variant: ButtonIconVariantStyleProps;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  align-items: center;
  justify-content: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconProps>(
  ({ theme, variant }) => ({
    size: 24,
    color: variant === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
  })
)``;
