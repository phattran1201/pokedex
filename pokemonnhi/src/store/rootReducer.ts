import {combineReducers} from 'redux';
import {pokemonApi} from './Services';
import pokemonReducer from './Reducer';

export const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
