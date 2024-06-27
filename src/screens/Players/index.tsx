import { useState } from "react";
import { FlatList } from "react-native";

import { ButtonIcon } from "@/components/ButtonIcon";
import { Filter } from "@/components/Filter";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { Input } from "@/components/Input";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { PlayerCard } from "@/components/PlayerCard";
import { EmptyList } from "@/components/EmptyList";
import { Button } from "@/components/Button";

export const Players = () => {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([
    "Erick",
    "Tata",
    "Enzo",
    "Bart",
    "Marge",
    "Homer",
    "Moe",
    "Flanders",
  ]);

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
