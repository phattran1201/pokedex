import {createSlice} from '@reduxjs/toolkit';
import {PokemonsState, ItemPokemon} from '../../constants';
import {pokemonApi} from '../services';
import {RootState} from '..';

const initialState: PokemonsState = {
  pokemons: [],
  next: '',
  loading: false,
  pokemonbag: [],
  pokemonDetails: [],
};

const pokemonSlice = createSlice({
  name: 'pokemonReducer',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addMatcher(
      pokemonApi.endpoints.getPokemons.matchFulfilled,
      (state, action) => {
        state.pokemons = [...state.pokemons, ...action.payload.results];
        state.next = action.payload.next;
        state.loading = false;
      },
    );

    builder.addMatcher(
      pokemonApi.endpoints.getPokemonDetail.matchFulfilled,
      (state, action) => {
        const pokemonDetail = action.payload;
        const newPokemonList = {
          id: pokemonDetail.id,
          name:
            pokemonDetail.name[0].toUpperCase() +
            pokemonDetail.name.substring(1),
          type: pokemonDetail.types[0].type.name,
          types: pokemonDetail.types,
          moves: pokemonDetail.moves,
          order: pokemonDetail.order,
          imgUrl: pokemonDetail.sprites.other['official-artwork'].front_default,
          species: pokemonDetail.species.name,
          height: pokemonDetail.height,
          weight: pokemonDetail.weight,
          abilities: pokemonDetail.abilities,
          stats: pokemonDetail.stats,
        };

        state.pokemonDetails = [...state.pokemonDetails, newPokemonList];
      },
    );
  },
});
export const selectPokemon = (state: RootState) => state;
const pokemonReducer = pokemonSlice.reducer;
export default pokemonReducer;
