import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './RootReducer';
import {pokemonApi} from './Services';
// ...

const middlewares = [pokemonApi.middleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

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

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
