import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas";

interface Favorite {
  color: string;
  food: string;
  random_string: string;
  song: string;
}

export interface OompaLoompa {
  id: number;
  first_name: string;
  last_name: string;
  favorite: Favorite;
  gender: string;
  image: string;
  profession: string;
  email: string;
  age: number;
  country: string;
  height: number;
  description?: string | TrustedHTML;
  quota?: string;
}

export interface OompaLoompasState {
  allData: OompaLoompa[]; 
  data: OompaLoompa[]; 
  selectedOompaLoompa: OompaLoompa | null;
  currentPage: number;
  lastPage: number;
  status: "idle" | "loading" | "failed";
  lastFetched: number | null;
}

const initialState: OompaLoompasState = {
  allData: [],
  data: [],
  selectedOompaLoompa: null,
  currentPage: 1,
  lastPage: 20,
  status: "idle",
  lastFetched: null,
};

export const fetchOompaLoompas = createAsyncThunk(
  "oompaLoompas/fetchOompaLoompas",
  async (page: number) => {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return { results: response.data.results, totalPages: response.data.total };
  }
);

export const fetchOompaLoompaDetail = createAsyncThunk(
  "oompaLoompas/fetchOompaLoompaDetail",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

const oompaLoompasSlice = createSlice({
  name: "oompaLoompas",
  initialState,
  reducers: {
    filterOompaLoompas: (state, action) => {
      const { name, profession } = action.payload;
      const filtered = state.allData.filter(
        (oompa) =>
          oompa.first_name.toLowerCase().includes(name.toLowerCase()) &&
          oompa.profession.toLowerCase().includes(profession.toLowerCase())
      );
      state.data =
        filtered.length > 0 || name || profession ? filtered : state.allData;
    },
    clearSelectedOompaLoompa: (state) => {
      state.selectedOompaLoompa = null;
    },
    incrementPage: (state) => {
      if (state.currentPage < state.lastPage) {
        state.currentPage += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOompaLoompas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOompaLoompas.fulfilled, (state, action) => {
        state.status = "idle";

        const uniqueData = action.payload.results.filter(
          (oompa: OompaLoompa) =>
            !state.allData.some((existing) => existing.id === oompa.id)
        );

        state.allData = [...state.allData, ...uniqueData]; 
        state.data = [...state.allData]; 
        state.lastFetched = Date.now();
        state.lastPage = action.payload.totalPages;
      })
      .addCase(fetchOompaLoompas.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchOompaLoompaDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOompaLoompaDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedOompaLoompa = action.payload;
      })
      .addCase(fetchOompaLoompaDetail.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { filterOompaLoompas, clearSelectedOompaLoompa, incrementPage } =
  oompaLoompasSlice.actions;

export default oompaLoompasSlice.reducer;
