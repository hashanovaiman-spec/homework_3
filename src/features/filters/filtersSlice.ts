import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortMode } from '../../types/ticket';

export const AVAILABLE_COMPANIES = ['Победа', 'Red Wings', 'S7 Airlines'] as const;
export const AVAILABLE_CONNECTIONS = [0, 1, 2, 3] as const;

interface FiltersState {
  sortMode: SortMode;
  companies: string[];
  connections: number[];
}

const initialState: FiltersState = {
  sortMode: 'price',
  companies: [...AVAILABLE_COMPANIES],
  connections: [...AVAILABLE_CONNECTIONS],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortMode: (state, action: PayloadAction<SortMode>) => {
      state.sortMode = action.payload;
    },
    toggleCompany: (state, action: PayloadAction<string>) => {
      const company = action.payload;
      state.companies = state.companies.includes(company)
        ? state.companies.filter((item) => item !== company)
        : [...state.companies, company];
    },
    toggleConnection: (state, action: PayloadAction<number>) => {
      const connection = action.payload;
      state.connections = state.connections.includes(connection)
        ? state.connections.filter((item) => item !== connection)
        : [...state.connections, connection];
    },
    resetFilters: (state) => {
      state.companies = [...AVAILABLE_COMPANIES];
      state.connections = [...AVAILABLE_CONNECTIONS];
    },
  },
});

export const { setSortMode, toggleCompany, toggleConnection, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
