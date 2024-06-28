import { fetchPlayersByGroup } from "./fetchPlayersByGroup";

export const fetchTeamPlayersByGroup = async (group: string, team: string) => {
  try {
    const playersByGroup = await fetchPlayersByGroup(group);
    const teamPlayers = playersByGroup.filter((player) => player.team === team);

    return teamPlayers;
  } catch (error) {
    throw error;
  }
};
