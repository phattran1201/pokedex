/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {pokemon_Color} from '../../constants/pokeColors';
import {PokemonDetail} from '../../constants/type';

function Moves({item}: {item: PokemonDetail}) {
  const pokemonColor = pokemon_Color[item.type];

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingBottom: 80,
          paddingHorizontal: 10,
        }}>
        {item.moves.map((move, idx) => {
          return (
            <View
              key={idx}
              style={{
                backgroundColor: pokemonColor,
                borderRadius: 5,
                alignSelf: 'baseline',
                margin: 5,
                opacity: 0.4,
              }}>
              <Text style={{color: 'black', padding: 5}}>{move.move.name}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
export default memo(Moves);
