import { API_BASE_URL } from "../services/api";

export const getCharacterId = (url: string) => {
  const [_, id] = url.split(`${API_BASE_URL}/people/`);
  return parseInt(id);
};

export const getFromLS = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  } catch (e) {
    console.log(`No data with key ${key} in LS`);
    return null;
  }
};
