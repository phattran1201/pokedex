/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback} from 'react';
import {
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  LayoutAnimation,
  View,
} from 'react-native';
import styles from '../../../../assets/styles';
import {useNavigation} from '@react-navigation/native';
// import {pokemonColors} from '../../store/action';
import {ROUTE_NAME} from '../../../navigation/routeName';
import {useGetPokemonDetailQuery} from '../../../store/services';
import {pokemon_Color} from '../../../constants/pokeColors';
import {ItemPokemon, PokemonDetail} from '../../../constants/type';
import {SharedElement} from 'react-navigation-shared-element';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHook';
import {RootState} from '../../../store';

function PokemonCard({url, name}: ItemPokemon) {
  useGetPokemonDetailQuery(url);

  const {navigate}: any = useNavigation();

  const pokemonDetailListSelector = useAppSelector(
    (state: RootState) => state.pokemonReducer.pokemonDetails,
  );
  const pokemonDetail = pokemonDetailListSelector.find(
    (item: PokemonDetail) => {
      return item.name.toLocaleLowerCase() === name;
    },
  );

  const pokemonColor = pokemon_Color[pokemonDetail ? pokemonDetail.type : ''];

  const bgStyles = {backgroundColor: pokemonColor, ...styles.bgStyles};

  const onPressItem = useCallback(() => {
    navigate(ROUTE_NAME.POKEMON_DETAILS, {
      pokemonDetail,
      pokemonId: pokemonDetail?.id,
    });
  }, [navigate, pokemonDetail]);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

  return pokemonDetail ? (
    <SharedElement id={url}>
      <TouchableWithoutFeedback onPress={onPressItem}>
        <View style={styles.card}>
          <View style={styles.card__spacing}>
            <View style={bgStyles}>
              <SharedElement
                id={String(pokemonDetail.id)}
                style={styles.card__imagePokemon}>
                <Image
                  style={{width: 90, height: 90}}
                  source={{
                    uri: pokemonDetail?.imgUrl,
                  }}
                />
              </SharedElement>
              <Text style={styles.card__name}>{pokemonDetail?.name}</Text>
              {pokemonDetail?.types?.map((type: any, idx: number) => {
                return (
                  <View key={idx} style={styles.card__typeContainer}>
                    <Text style={styles.card__typeText}>{type.type.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SharedElement>
  ) : (
    <View style={styles.card}>
      <View style={styles.card__spacing}>
        <View
          style={[
            bgStyles,
            {
              backgroundColor: 'gray',
            },
          ]}>
          <Text style={styles.card__name}>{name}</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(PokemonCard);
