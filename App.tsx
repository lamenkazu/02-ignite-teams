import { StatusBar } from "react-native";

import { Loading } from "@/components/Loading";
import { Groups } from "@/screens/Groups";
import { NewGroup } from "@/screens/NewGroup";
import { Players } from "@/screens/Players";
import theme from "@/theme";

import { ThemeProvider } from "styled-components/native";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  );
}
