import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Fetch all games
export const fetchGames = async (page = 1, query = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
        page,
        page_size: 40,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
};

// Fetch details of a specific game by ID
export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}`, {
      params: { key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

// Custom hook for using a game's data by slug
export const useGame = (slug) => {
  return useQuery(['game', slug], () => fetchGameDetails(slug), {
    enabled: !!slug,
  });
};
