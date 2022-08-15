/* eslint-disable no-undef */
interface ListPokemonRaw {
  count?: number;
  next?: string;
  previous?: null;
  results?: ItemPokemon[];
}

interface ItemPokemon {
  name: string;
  url: string;
}

interface Pokemon {
  abilities?: any;
  baseExperience?: number;
  forms?: any;
  gameIndices?: any;
  height?: number;
  heldItems?: any[];
  id?: number;
  isDefault?: boolean;
  locationAreaEncounters?: string;
  moves?: any[];
  name?: string;
  order?: number;
  pastTypes?: any[];
  species?: any;
  sprites?: any;
  stats?: any;
  types?: any[];
  weight?: number;
}

interface PokemonsState {
  pokemons: ItemPokemon[];
  next: string;
  loading: boolean;
  pokemonbag: any[];
  pokemonDetails: PokemonDetail[];
}
interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface Moves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: [];
}
interface Abilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonDetail {
  name: string;
  id: number;
  type: string;
  types: Types[];
  moves: Moves[];
  order: number;
  imgUrl: string;
  species: string;
  height: number;
  weight: number;
  abilities: Abilities[];
  stats: any;
}
export {
  Abilities,
  ItemPokemon,
  ListPokemonRaw,
  Pokemon,
  PokemonDetail,
  PokemonsState,
  Types,
  Moves,
};
