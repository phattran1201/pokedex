/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from '../../../assets/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGetPokemonsQuery} from '../../store/Services';
import PokemonCard from './components/PokemonCard';
import {ItemPokemon} from '../../constants/type';
import {useAppSelector} from '../../hooks/reduxHook';
import {RootState} from '../../store';

const Home = () => {
  const insets = useSafeAreaInsets();
  const [next, setNext] = React.useState('');

  const {isFetching, isLoading} = useGetPokemonsQuery(next);

  const nextSelector = useAppSelector(
    (state: RootState) => state.pokemonReducer.next,
  );

  const pokemon = useAppSelector(
    (state: RootState) => state.pokemonReducer.pokemons,
  );

  const _renderItem = ({item}: {item: ItemPokemon}) => {
    return <PokemonCard {...item} />;
  };
  const onShowMore = () => {
    if (isLoading || isFetching) {
      return;
    }
    setNext(nextSelector);
  };
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={styles.text__title}>Pokedex</Text>
      <FlatList
        data={pokemon}
        initialNumToRender={10}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.url)}
        renderItem={_renderItem}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={onShowMore}
        ListFooterComponent={() => {
          return isLoading || isFetching ? (
            <ActivityIndicator size={'large'} style={{marginBottom: 20}} />
          ) : null;
        }}
      />

      {/* <View style={{padding: 5, paddingVertical: 5}}>
        <Button title="Show More" color={'gray'} onPress={onShowMore} />
      </View> */}
    </View>
  );
};

export default Home;
