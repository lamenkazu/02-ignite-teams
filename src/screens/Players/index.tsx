import { ButtonIcon } from "@/components/ButtonIcon";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";

import { Container, Form } from "./styles";
import { Filter } from "@/components/Filter";

export const Players = () => {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false} // remove o auto correct do teclado
        />

        <ButtonIcon icon="home" />
      </Form>

      <Filter title="Time A" />
    </Container>
  );
};
