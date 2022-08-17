import {combineReducers} from 'redux';
import pokemonReducer from './Reducer';
import {pokemonApi} from './Services';

export const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
