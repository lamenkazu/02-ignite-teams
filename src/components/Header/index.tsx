import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackIcon, BackButton } from "./styles";
import logoImg from "@/assets/logo.png";

type HeaderProps = {
  showBackButton?: Boolean;
};

export const Header = ({ showBackButton = false }: HeaderProps) => {
  const { navigate, goBack } = useNavigation();

  const handleGoBack = () => {
    //goBack();  Volta para a pagina exatamente anterior.
    navigate("groups"); // Quebra toda a pilha para voltar para groups.
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
};
