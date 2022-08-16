/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {POKEMON_COLORS, STATS} from '../../constants/pokemonConstant';
import styles from '../../../assets/styles';

import {useAppSelector} from '../../hooks/reduxHook';
import {RootState} from '../../store';
import {SharedElement} from 'react-navigation-shared-element';
import ICON from '../../../assets/icons';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {Stat} from '../../constants/type';
import {ProgressBar} from 'react-native-paper';

const Detail = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const {pokemonId, pokemonDetail, pokemonName} = route?.params;

  const [menu, setMenu] = useState('Base Stats');

  const pokemonColor = POKEMON_COLORS[pokemonDetail.type];
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
  const formatStat = (stat: Stat) => {
    for (let item in STATS) {
      if (item === stat.stat.name) {
        return {
          type: STATS[item].key.toUpperCase(),
          maxStat: STATS[item].max,
          color: STATS[item].color,
        };
      }
    }
  };

  const typeBgColor = (type: string) => {
    for (let key in POKEMON_COLORS) {
      if (type === key) {
        return POKEMON_COLORS[key];
      }
    }
  };

  return pokemonDetail ? (
    <SharedElement id={pokemonName} style={bgStyles}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Image
            source={ICON.back}
            style={{
              tintColor: 'white',
              width: 30,
              height: 40,
              marginEnd: -10,
              marginBottom: 5,
            }}
          />

          <Text style={[styles.text__titleDetail, {marginTop: 0}]}>
            {pokemonDetail?.name}
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
        <Animated.View
          entering={FadeInDown.delay(500).duration(500)}
          exiting={FadeOutDown.duration(100)}
          style={[
            styles.container__moves,
            {
              shadowOffset: {width: 0, height: -8},
              shadowColor: '#fff',
              shadowOpacity: 0.2,
            },
          ]}>
          <SafeAreaView style={styles.detail__containerInfo}>
            {/* <View style={styles.detail__listTab}>
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

                {menu === 'Base Stats' && (
                  <Stats item={pokemonDetail} pokemonColor={pokemonColor} />
                )}
              </View>
            </View> */}
            <Text
              style={{
                fontSize: 26,
                fontWeight: 'bold',
                textAlign: 'center',
                marginVertical: 15,
              }}>
              {pokemonName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {pokemonDetail?.types ? (
                pokemonDetail?.types.map((type: any, idx: number) => {
                  return (
                    <View
                      key={idx}
                      style={{
                        backgroundColor: typeBgColor(type.type.name),
                        borderRadius: 15,
                        width: '35%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          padding: 5,
                          opacity: 1,
                          fontWeight: 'bold',
                          fontSize: 20,
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 30,
              }}>
              <View>
                <Text style={stylesDetail.scaleText}>
                  {pokemonDetail.weight / 10} KG
                </Text>
                <Text style={stylesDetail.measureUnit}>Weight</Text>
              </View>
              <View>
                <Text style={stylesDetail.scaleText}>
                  {(pokemonDetail.height / 10).toFixed(1)} M
                </Text>
                <Text style={stylesDetail.measureUnit}>Height</Text>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 26,
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}>
                Base Stats
              </Text>
              {pokemonDetail.stats.map((stat: Stat, idx: number) => {
                return (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 5,
                    }}>
                    <Text style={styles.stats__title}>
                      {formatStat(stat)?.type}
                    </Text>
                    <View
                      style={{
                        width: '80%',
                        alignContent: 'center',
                        backgroundColor: '#E6E6E6',
                        height: 20,
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          width: `${
                            (stat.base_stat / formatStat(stat)?.maxStat) * 100
                          }%`,
                          position: 'absolute',
                          height: '100%',
                          backgroundColor: formatStat(stat)?.color,
                          borderRadius: 20,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'right',
                            paddingEnd: 5,
                            fontSize: 10,
                            fontWeight: '500',
                          }}>
                          {stat.base_stat} / {formatStat(stat)?.maxStat}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </ScrollView>
    </SharedElement>
  ) : null;
};

const stylesDetail = StyleSheet.create({
  scaleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  measureUnit: {
    fontSize: 16,
    paddingTop: 10,
    textAlign: 'center',
  },
});
export default Detail;
