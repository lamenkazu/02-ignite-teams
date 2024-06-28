import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";
import { RefObject } from "react";

interface InputProps extends TextInputProps {
  inputRef?: RefObject<TextInput>;
}

export const Input = ({ inputRef, ...props }: InputProps) => {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...props}
    />
  );
};
