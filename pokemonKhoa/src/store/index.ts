import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {pokemonApi} from './services';

const middlewares = [pokemonApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        ignoredPaths: ['pokemonApi.pokemons', 'pokemonApi.pokemonDetails'],
      },
    }).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
