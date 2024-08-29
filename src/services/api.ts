import axios from "axios";
import { CharacterResponse, Character } from "../types";

export const API_BASE_URL = "https://swapi.dev/api";

export const fetchCharacters = async (
  page: number = 1,
  search: string = ""
): Promise<CharacterResponse> => {
  const response = await axios.get<CharacterResponse>(
    `${API_BASE_URL}/people/`,
    {
      params: { page, search },
    }
  );
  return response.data;
};

export const fetchCharacterDetail = async (id: string): Promise<Character> => {
  const response = await axios.get<Character>(`${API_BASE_URL}/people/${id}/`);
  return response.data;
};
