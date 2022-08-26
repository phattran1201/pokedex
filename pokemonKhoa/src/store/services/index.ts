import {createAsyncThunk} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {base_Url} from '../../constants/baseUrl';
import {ListPokemonRaw, Pokemon} from '../../constants/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: base_Url}),
  endpoints: builder => ({
    getPokemons: builder.query<any, string>({
      query: (next: string) => (next ? next : `${base_Url}/?offset=0&limit=10`),
      transformResponse: (response: ListPokemonRaw) => response,
    }),

    getPokemonDetail: builder.query<any, string>({
      query: (url: string) => url,
      transformResponse: (response: Pokemon) => response,
    }),
  }),
});

export const {useGetPokemonsQuery, useGetPokemonDetailQuery} = pokemonApi;
