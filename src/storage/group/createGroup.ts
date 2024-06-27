import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { fetchGroups } from "./fetchGroups";
import { AppError } from "@/utils/AppError";

export const createGroup = async (newGroup: string) => {
  try {
    const storedGroups = await fetchGroups();

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("Já existe uma turma cadastrada com esse nome");
    }

    const groupsList = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsList);
  } catch (error) {
    throw error;
  }
};
