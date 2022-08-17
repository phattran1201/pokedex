import {combineReducers} from 'redux';
import {pokemonApi} from './services';
import pokemonReducer from './reducer';

export const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
