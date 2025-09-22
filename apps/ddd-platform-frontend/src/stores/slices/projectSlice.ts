import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectMetadata, ProjectState } from '../../types';

const initialState: ProjectState = {
  currentProject: undefined,
  projects: [],
  loading: false,
  error: undefined,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setProjects: (state, action: PayloadAction<ProjectMetadata[]>) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setCurrentProject: (state, action: PayloadAction<ProjectMetadata | undefined>) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectMetadata>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<ProjectMetadata>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
      if (state.currentProject?.id === action.payload.id) {
        state.currentProject = action.payload;
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = undefined;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setProjects,
  setCurrentProject,
  addProject,
  updateProject,
  removeProject,
} = projectSlice.actions;

export default projectSlice.reducer;

