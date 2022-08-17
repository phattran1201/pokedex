/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {pokemon_Color} from '../../constants/pokeColors';
import styles from '../../../assets/styles';
import About from './About';
import Stats from './BaseStats';
import Moves from './Moves';
import {useAppSelector} from '../../hooks/reduxHook';
import {RootState} from '../../store';
import {SharedElement} from 'react-navigation-shared-element';
import {PokemonDetail} from '../../constants/type';

const Detail = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const {pokemonId, pokemonDetail} = route.params;

  const [menu, setMenu] = useState('About');

  const pokemonColor = pokemon_Color[pokemonDetail.type];
  console.log({pokemonColor});
  const bgStyles = {
    ...styles.container,
    backgroundColor: pokemonColor,
    paddingTop: insets.top,
  };
  const btnActive = {
    color: pokemonColor,
  };

  const listMenuInfo = [
    {
      option: 'About',
    },
    {
      option: 'Base Stats',
    },
    {
      option: 'Moves',
    },
  ];

  const setMenuOption = (p: string) => {
    return setMenu(p);
  };

  return pokemonDetail ? (
    <View style={bgStyles}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            numberOfLines={1}
            allowFontScaling
            adjustsFontSizeToFit
            style={[
              styles.text__title,
              {color: 'white', marginBottom: 0, flex: 1},
            ]}>
            {'<'}{' '}
            <Text style={[styles.text__titleDetail, {marginTop: 0}]}>
              {pokemonDetail?.name}
            </Text>
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginLeft: 20,
              marginRight: 30,
            }}>
            {pokemonDetail?.types ? (
              pokemonDetail?.types.map((type: any, idx: number) => {
                return (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: '#fff',
                      opacity: 0.2,
                      borderRadius: 15,
                      alignSelf: 'baseline',
                      margin: 5,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        padding: 5,
                        opacity: 1,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginLeft: 10,
                        marginRight: 10,
                      }}>
                      {type.type.name}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View />
            )}
          </View>
          <View style={{paddingRight: 20}}>
            <Text
              style={{
                color: '#fff',
                opacity: 0.8,
                fontWeight: 'bold',
                fontSize: 40,
              }}>
              #{`${pokemonDetail?.id}`.padStart(3, '')}
            </Text>
          </View>
        </View>
        <SharedElement
          id={pokemonId}
          style={{
            alignItems: 'center',
            elevation: 5,
            zIndex: 5,
          }}>
          <Image
            style={styles.detail__imagePokemon}
            source={{uri: pokemonDetail?.imgUrl}}
          />
        </SharedElement>
        <View style={styles.container__moves}>
          <SafeAreaView style={styles.detail__containerInfo}>
            <View style={styles.detail__listTab}>
              {listMenuInfo.map(e => {
                return (
                  <TouchableOpacity
                    key={e.option}
                    style={[
                      menu === e.option && {
                        borderBottomWidth: 1,
                        borderBottomColor: pokemonColor,
                      },
                      styles.detail__btnTab,
                    ]}
                    onPress={() => setMenuOption(e.option)}>
                    <Text
                      style={[
                        menu === e.option && btnActive,
                        styles.detail__textTab,
                      ]}>
                      {e.option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View>
              <View style={{paddingBottom: 80}}>
                {menu === 'Moves' && <Moves item={pokemonDetail} />}

                {menu === 'About' && <About item={pokemonDetail} />}

                {menu === 'Base Stats' && <Stats item={pokemonDetail} />}
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  ) : null;
};

export default Detail;
