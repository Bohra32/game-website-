import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedGames: [],
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const game = action.payload;
      if (!game?.id) return; 

      const index = state.savedGames.findIndex((g) => g.id === game.id);
      if (index >= 0) {
        state.savedGames.splice(index, 1); 
      } else {
        state.savedGames.push(game); 
      }
    },
    setSavedGames: (state, action) => {
      state.savedGames = action.payload;
    },
    removeGame: (state, action) => {
      state.savedGames = state.savedGames.filter((game) => game.id !== action.payload);
    },
  },
});


export const { toggleFavorite, setSavedGames, removeGame } = gameSlice.actions;
export default gameSlice.reducer;
