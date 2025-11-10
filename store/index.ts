// /store/index.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Status = 'New pairs' | 'Final Stretch' | 'Migrated';
type SortKey = 'price' | 'change1h' | 'change24h' | 'volume24h' | 'liquidity';
type SortDir = 'asc' | 'desc';

const ui = createSlice({
  name: 'ui',
  initialState: {
    status: 'New pairs' as Status,
    q: '',
    sort: { key: 'volume24h' as SortKey, dir: 'desc' as SortDir },
  },
  reducers: {
    setStatus: (s, a: PayloadAction<Status>) => { s.status = a.payload; },
    setQuery:  (s, a: PayloadAction<string>) => { s.q = a.payload; },
    setSort:   (s, a: PayloadAction<{ key: SortKey; dir: SortDir }>) => { s.sort = a.payload; },
  },
});

export const { setStatus, setQuery, setSort } = ui.actions;

export const store = configureStore({
  reducer: { ui: ui.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
