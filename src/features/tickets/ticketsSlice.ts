import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchTicketsApi } from '../../api/ticketsApi';
import type { RootState } from '../../app/store';
import type { Ticket } from '../../types/ticket';

export const fetchTickets = createAsyncThunk<
  Ticket[],
  void,
  { rejectValue: string }
>('tickets/fetchTickets', async (_, thunkApi) => {
  try {
    return await fetchTicketsApi(thunkApi.signal);
  } catch (error) {
    if (thunkApi.signal.aborted) {
      throw error;
    }

    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось загрузить билеты',
    );
  }
});

const ticketsAdapter = createEntityAdapter<Ticket>();

const initialState = ticketsAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        ticketsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.payload ?? 'Не удалось загрузить билеты';
      });
  },
});

export const ticketsSelectors = ticketsAdapter.getSelectors<RootState>(
  (state) => state.tickets,
);

export default ticketsSlice.reducer;
