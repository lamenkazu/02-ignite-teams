import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPlayersByGroup } from "./fetchPlayersByGroup";
import { PLAYER_COLLECTION } from "../storageConfig";

export const removePlayerFromGroup = async (
  playerName: string,
  group: string
) => {
  try {
    const storedPlayers = await fetchPlayersByGroup(group);

    const filteredPlayer = storedPlayers.filter(
      (player) => player.name !== playerName
    );

    const resultPlayers = JSON.stringify(filteredPlayer);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, resultPlayers);
  } catch (error) {
    throw error;
  }
};
