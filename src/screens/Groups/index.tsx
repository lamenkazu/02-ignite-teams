import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { fetchGroups } from "@/storage/group/fetchGroups";

import { Container } from "./styles";

import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { GroupCard } from "@/components/GroupCard";
import { EmptyList } from "@/components/EmptyList";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";

export const Groups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();

  const handleNewGroup = () => {
    navigate("new");
  };

  const handleOpenGroup = (group: string) => {
    navigate("players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      const getAllGroups = async () => {
        try {
          setIsLoading(true);
          const data = await fetchGroups();

          setGroups(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      getAllGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <EmptyList message="Que tal cadastrar a primeira turma?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }} // Centraliza na tela caso groups esteja vazio
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
