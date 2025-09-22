import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScreenDefinition, ScreenTemplate, ScreenState } from '../../types';

const initialState: ScreenState = {
  screens: [],
  currentScreen: undefined,
  templates: [],
  loading: false,
  error: undefined,
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setScreens: (state, action: PayloadAction<ScreenDefinition[]>) => {
      state.screens = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setCurrentScreen: (state, action: PayloadAction<ScreenDefinition | undefined>) => {
      state.currentScreen = action.payload;
    },
    setTemplates: (state, action: PayloadAction<ScreenTemplate[]>) => {
      state.templates = action.payload;
    },
    addScreen: (state, action: PayloadAction<ScreenDefinition>) => {
      state.screens.push(action.payload);
    },
    updateScreen: (state, action: PayloadAction<ScreenDefinition>) => {
      const index = state.screens.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.screens[index] = action.payload;
      }
      if (state.currentScreen?.id === action.payload.id) {
        state.currentScreen = action.payload;
      }
    },
    removeScreen: (state, action: PayloadAction<string>) => {
      state.screens = state.screens.filter(s => s.id !== action.payload);
      if (state.currentScreen?.id === action.payload) {
        state.currentScreen = undefined;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setScreens,
  setCurrentScreen,
  setTemplates,
  addScreen,
  updateScreen,
  removeScreen,
} = screenSlice.actions;

export default screenSlice.reducer;

