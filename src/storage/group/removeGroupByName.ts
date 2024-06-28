import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchGroups } from "./fetchGroups";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";

export const removeGroupByName = async (deletedGroup: string) => {
  try {
    const storedGroups = await fetchGroups();

    const resultantGroups = JSON.stringify(
      storedGroups.filter((group) => group !== deletedGroup)
    );

    await AsyncStorage.setItem(GROUP_COLLECTION, resultantGroups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroup}`);
  } catch (error) {
    throw error;
  }
};
