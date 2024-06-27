import { useState } from "react";
import { FlatList } from "react-native";

import { Container } from "./styles";

import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { GroupCard } from "@/components/GroupCard";
import { EmptyList } from "@/components/EmptyList";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  const handleNewGroup = () => {
    navigate("new");
  };

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }} // Centraliza na tela caso groups esteja vazio
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
