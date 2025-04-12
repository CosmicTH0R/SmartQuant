import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  return stored === "dark";
};

const initialState = {
  darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
