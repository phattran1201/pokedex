/* eslint-disable @typescript-eslint/no-unused-vars */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../constants/baseUrl';
import {ListPokemonRaw, Pokemon} from '../../constants/type';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getPokemons: builder.query<any, string>({
      query: (next: string) => (next ? next : `${BASE_URL}/?offset=0&limit=10`),
      transformResponse: (response: ListPokemonRaw) => response,
    }),
    getPokemonDetail: builder.query<any, string>({
      query: (url: string) => url,
      transformResponse: (response: Pokemon) => response,
    }),
  }),
});

export const {useGetPokemonsQuery, useGetPokemonDetailQuery} = pokemonApi;
