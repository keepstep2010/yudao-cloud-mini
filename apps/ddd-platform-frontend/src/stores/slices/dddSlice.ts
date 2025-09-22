import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Domain, BoundedContext, Aggregate, Entity, DDDState } from '../../types';

const initialState: DDDState = {
  domains: [],
  boundedContexts: [],
  aggregates: [],
  entities: [],
  currentAggregate: undefined,
  loading: false,
  error: undefined,
};

const dddSlice = createSlice({
  name: 'ddd',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setDomains: (state, action: PayloadAction<Domain[]>) => {
      state.domains = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    setBoundedContexts: (state, action: PayloadAction<BoundedContext[]>) => {
      state.boundedContexts = action.payload;
    },
    setAggregates: (state, action: PayloadAction<Aggregate[]>) => {
      state.aggregates = action.payload;
    },
    setEntities: (state, action: PayloadAction<Entity[]>) => {
      state.entities = action.payload;
    },
    setCurrentAggregate: (state, action: PayloadAction<Aggregate | undefined>) => {
      state.currentAggregate = action.payload;
    },
    addDomain: (state, action: PayloadAction<Domain>) => {
      state.domains.push(action.payload);
    },
    addBoundedContext: (state, action: PayloadAction<BoundedContext>) => {
      state.boundedContexts.push(action.payload);
    },
    addAggregate: (state, action: PayloadAction<Aggregate>) => {
      state.aggregates.push(action.payload);
    },
    addEntity: (state, action: PayloadAction<Entity>) => {
      state.entities.push(action.payload);
    },
    updateDomain: (state, action: PayloadAction<Domain>) => {
      const index = state.domains.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.domains[index] = action.payload;
      }
    },
    updateBoundedContext: (state, action: PayloadAction<BoundedContext>) => {
      const index = state.boundedContexts.findIndex(bc => bc.id === action.payload.id);
      if (index !== -1) {
        state.boundedContexts[index] = action.payload;
      }
    },
    updateAggregate: (state, action: PayloadAction<Aggregate>) => {
      const index = state.aggregates.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.aggregates[index] = action.payload;
      }
      if (state.currentAggregate?.id === action.payload.id) {
        state.currentAggregate = action.payload;
      }
    },
    updateEntity: (state, action: PayloadAction<Entity>) => {
      const index = state.entities.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.entities[index] = action.payload;
      }
    },
    removeDomain: (state, action: PayloadAction<string>) => {
      state.domains = state.domains.filter(d => d.id !== action.payload);
    },
    removeBoundedContext: (state, action: PayloadAction<string>) => {
      state.boundedContexts = state.boundedContexts.filter(bc => bc.id !== action.payload);
    },
    removeAggregate: (state, action: PayloadAction<string>) => {
      state.aggregates = state.aggregates.filter(a => a.id !== action.payload);
      if (state.currentAggregate?.id === action.payload) {
        state.currentAggregate = undefined;
      }
    },
    removeEntity: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter(e => e.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setDomains,
  setBoundedContexts,
  setAggregates,
  setEntities,
  setCurrentAggregate,
  addDomain,
  addBoundedContext,
  addAggregate,
  addEntity,
  updateDomain,
  updateBoundedContext,
  updateAggregate,
  updateEntity,
  removeDomain,
  removeBoundedContext,
  removeAggregate,
  removeEntity,
} = dddSlice.actions;

export default dddSlice.reducer;

