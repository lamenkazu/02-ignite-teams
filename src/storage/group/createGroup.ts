import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { fetchGroups } from "./fetchGroups";

export const createGroup = async (newGroup: string) => {
  try {
    const storedGroups = await fetchGroups();

    const groupsList = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsList);
  } catch (error) {
    throw error;
  }
};
