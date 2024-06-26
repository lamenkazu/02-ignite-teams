import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonStyleVariants = "primary" | "secondary";

interface ButtonStyleProps {
  variant: ButtonStyleVariants;
}

export const Container = styled(TouchableOpacity)<ButtonStyleProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, variant }) =>
    variant === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
