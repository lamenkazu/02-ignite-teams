import { Groups } from "@/screens/Groups";
import theme from "@/theme";

import { ThemeProvider } from "styled-components/native";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { ActivityIndicator } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      {!fontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
