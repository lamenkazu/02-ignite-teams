import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { createGroup } from "@/storage/group/createGroup";

import { Container, Content, Icon } from "./styles";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";

export const NewGroup = () => {
  const [group, setGroup] = useState("");

  const { navigate } = useNavigation();

  const handleGroupCreation = async () => {
    try {
      await createGroup(group);
      navigate("players", { group });
      setGroup("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleGroupCreation}
        />
      </Content>
    </Container>
  );
};
