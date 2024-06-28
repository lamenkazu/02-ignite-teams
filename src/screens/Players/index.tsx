import { useState } from "react";
import { Alert, FlatList } from "react-native";

import { ButtonIcon } from "@/components/ButtonIcon";
import { Filter } from "@/components/Filter";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { PlayerCard } from "@/components/PlayerCard";
import { EmptyList } from "@/components/EmptyList";
import { Button } from "@/components/Button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@/utils/AppError";
import { addPlayerByGroup } from "@/storage/player/addPlayerByGroup";
import { fetchPlayersByGroup } from "@/storage/player/fetchPlayersByGroup";

interface RouteParams {
  group: string;
}

export const Players = () => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const handleAddNewPlayer = async () => {
    if (newPlayerName.trim() === "") {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      const players = await fetchPlayersByGroup(group);
      console.log(players);
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova Pessoa", error.message);
      }

      Alert.alert("Nova Pessoa", "Não foi possível adicionar.");
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false} // remove o auto correct do teclado
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon icon="add" onPress={handleAddNewPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Não há pessoas nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }, // Centraliza na tela caso players esteja vazio
        ]}
      />

      <Button title="Remover Turma" variant="secondary" />
    </Container>
  );
};
