import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { addPlayerByGroup } from "@/storage/player/addPlayerByGroup";
import { fetchPlayersByGroup } from "@/storage/player/fetchPlayersByGroup";
import { fetchTeamPlayersByGroup } from "@/storage/player/fetchTeamPlayersByGroup";
import { PlayerStorageDTO } from "@/storage/player/PlayerStorageDTO";
import { removePlayerFromGroup } from "@/storage/player/removePlayerFromGroup";
import { removeGroupByName } from "@/storage/group/removeGroupByName";

import { ButtonIcon } from "@/components/ButtonIcon";
import { Filter } from "@/components/Filter";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";
import { PlayerCard } from "@/components/PlayerCard";
import { EmptyList } from "@/components/EmptyList";
import { Button } from "@/components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { AppError } from "@/utils/AppError";

interface RouteParams {
  group: string;
}

export const Players = () => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const { navigate } = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

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
      setNewPlayerName("");

      newPlayerNameInputRef.current?.blur();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova Pessoa", error.message);
      }

      Alert.alert("Nova Pessoa", "Não foi possível adicionar.");
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await removePlayerFromGroup(playerName, group);
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Pessoa", "Não foi possível remover a pessoa.");
    }
  };

  const removeGroup = async () => {
    try {
      await removeGroupByName(group);
      navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Grupo", "Não foi possível remover o grupo.");
    }
  };

  const handleRemoveGroup = async () => {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeGroup() },
    ]);
  };

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      try {
        const teamPlayers = await fetchTeamPlayersByGroup(group, team);
        setPlayers(teamPlayers);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível carregar as pessoas do time.");
      }
    };

    fetchTeamPlayers();
  }, [team, players]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          value={newPlayerName}
          autoCorrect={false} // remove o auto correct do teclado
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddNewPlayer} // qual função deve ser executada quando clicar no enter do teclado
          returnKeyType="done" // O ícone do botão de enter do teclado
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
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Não há pessoas nesse time." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }, // Centraliza na tela caso players esteja vazio
        ]}
      />

      <Button
        title="Remover Turma"
        variant="secondary"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};
