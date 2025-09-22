import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenerationTask, GenerationState } from '../../types';

const initialState: GenerationState = {
  tasks: [],
  currentTask: undefined,
  loading: false,
  error: undefined,
};

const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setTasks: (state, action: PayloadAction<GenerationTask[]>) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setCurrentTask: (state, action: PayloadAction<GenerationTask | undefined>) => {
      state.currentTask = action.payload;
    },
    addTask: (state, action: PayloadAction<GenerationTask>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<GenerationTask>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      if (state.currentTask?.id === action.payload.id) {
        state.currentTask = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (state.currentTask?.id === action.payload) {
        state.currentTask = undefined;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setTasks,
  setCurrentTask,
  addTask,
  updateTask,
  removeTask,
} = generationSlice.actions;

export default generationSlice.reducer;

