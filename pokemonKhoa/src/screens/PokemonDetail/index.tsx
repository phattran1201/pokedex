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
  Animated,
  Dimensions,
} from 'react-native';
// import Animated from 'react-native-reanimated';
import React, {useState, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {pokemon_Color} from '../../constants/pokeColors';
import styles from '../../../assets/styles';
import About from './About';
import Stats from './BaseStats';
import Moves from './Moves';
import {useAppSelector} from '../../hooks/reduxHook';
import {RootState} from '../../store';
import {SharedElement} from 'react-native-shared-element';
import {PokemonDetail} from '../../constants/types';
import {pokemon_Stats} from '../../constants/pokeStats';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AutoSizeText, ResizeTextMode} from 'react-native-auto-size-text';

const Detail = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const {pokemonId, pokemonDetail, pokemonName} = route.params;

  const [menu, setMenu] = useState('About');
  const typeBgColor = (type: string) => {
    for (let key in pokemon_Color) {
      if (type === key) {
        return pokemon_Color[key];
      }
    }
  };

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
  const formatStat = (stat: Stat) => {
    for (let item in pokemon_Stats) {
      if (item === stat.stat.name) {
        return {
          type: pokemon_Stats[item].key.toUpperCase(),
          maxStat: pokemon_Stats[item].max,
          color: pokemon_Stats[item].color,
        };
      }
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  //Image chinh
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100, 150, 200],
    outputRange: [1, 0.8, 0.6, 0.4, 0],
    extrapolate: 'clamp',
  });
  const imageScale = scrollY.interpolate({
    inputRange: [0, 50, 100, 150, 200],
    outputRange: [1, 0.9, 0.8, 0.7, 0.6],
    extrapolate: 'clamp',
  });
  const imageSize = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [40, 30, 20],
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, 50, 100, 150, 200],
    outputRange: [0, -5, -10, -15, -20],
    extrapolate: 'clamp',
  });
  const imageTranslateX = scrollY.interpolate({
    inputRange: [0, 50, 100, 150, 200],
    outputRange: [0, 70, 140, 210, 280],
    extrapolate: 'clamp',
  });

  //Image phu
  const imageOpacityHead = scrollY.interpolate({
    inputRange: [0, 100, 150, 200],
    outputRange: [0, 0.2, 0.4, 1],
    extrapolate: 'clamp',
  });
  const imageTranslateHead = scrollY.interpolate({
    inputRange: [-200, -100, 0],
    outputRange: [-10, -5, 0],
    extrapolate: 'clamp',
  });

  //Tieu de chinh
  const titleScale = scrollY.interpolate({
    inputRange: [0, 100, 150, 200],
    outputRange: [1, 1, 0.9, 0.8],
    extrapolate: 'clamp',
  });
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [0, -5, -10],
    extrapolate: 'clamp',
  });
  const text_herder_left = scrollY.interpolate({
    inputRange: [0, 100, 150, 200],
    outputRange: [0, 0, -20, -40],
    extrapolate: 'clamp',
  });

  //HeaderHeight
  const headScale = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [1, 1, 1],
    extrapolate: 'clamp',
  });
  const headTranslate = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [0, -5, -10],
    extrapolate: 'clamp',
  });

  return pokemonDetail ? (
    <SharedElement id={pokemonName} style={bgStyles}>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          // backgroundColor: 'black',
          // transform: [{translateY: headTranslate}, {scale: headScale}],
        }}>
        <TouchableOpacity
          style={{width: '80%', height: '100%'}}
          onPress={() => navigation.goBack()}>
          <Animated.Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={[
              {
                color: '#fff',
                fontSize: 40,
                fontWeight: 'bold',
                margin: 10,
                transform: [
                  {scale: titleScale},
                  // {fontSize: imageSize},
                  {translateY: titleTranslate},
                  {translateX: text_herder_left},
                ],
              },
            ]}>
            {'<'}{' '}
            <Animated.Text style={[styles.text__titleDetail, {marginTop: 0}]}>
              {pokemonDetail?.name}
            </Animated.Text>
          </Animated.Text>
        </TouchableOpacity>
        <Animated.Image
          style={{
            width: 80,
            height: 80,
            // backgroundColor: 'black',
            opacity: imageOpacityHead,
            transform: [{translateY: imageTranslateHead}],
          }}
          source={{uri: pokemonDetail?.imgUrl}}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <Animated.View
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
                      borderRadius: 20,
                      alignSelf: 'baseline',
                      margin: 5,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        padding: 5,
                        opacity: 0.8,
                        fontWeight: 'bold',
                        fontSize: 18,
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
                fontWeight: 'bold',
                fontSize: 36,
              }}>
              #{`${pokemonDetail?.id}`.padStart(3, '')}
            </Text>
          </View>
        </Animated.View>

        <SharedElement
          id={pokemonId}
          style={{
            alignItems: 'center',
            elevation: 5,
            zIndex: 5,
          }}>
          <Animated.Image
            style={[
              styles.detail__imagePokemon,
              {
                opacity: imageOpacity,
                transform: [
                  {translateY: imageTranslate},
                  {scale: imageScale},
                  {translateX: imageTranslateX},
                ],
              },
            ]}
            source={{uri: pokemonDetail?.imgUrl}}
          />
        </SharedElement>

        <Animated.View style={styles.container__moves}>
          {/* Thong tin pokemonDetail */}
          <SafeAreaView style={styles.detail__containerInfo}>
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
                        borderRadius: 20,
                        width: '35%',
                        marginTop: 15,
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
                  color: '#000',
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
                      marginHorizontal: 5,
                      width: '100%',
                      // backgroundColor: 'red',
                    }}>
                    <Text style={styles.stats__title}>
                      {formatStat(stat)?.type}
                    </Text>
                    <View
                      style={{
                        width: '80%',
                        alignContent: 'center',
                        backgroundColor: '#E6E6E6',
                        height: 25,
                        borderRadius: 20,
                        marginLeft: -20,
                        marginRight: 10,
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
                        }}></View>
                      <Text
                        style={{
                          // right:
                          //   (stat.base_stat / formatStat(stat)?.maxStat) *
                          //     100 <
                          //   20
                          //     ? -(
                          //         stat.base_stat / formatStat(stat)?.maxStat
                          //       ) * 800
                          //     : 0,
                          textAlign: 'center',
                          fontSize: 12,
                          // minWidth: 60,
                          fontWeight: '500',
                          color: '#000',
                          width: `100%`,
                        }}>
                        {stat.base_stat} / {formatStat(stat)?.maxStat}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: '#fff',
            // borderTopLeftRadius: 40,
            // borderTopRightRadius: 40,
            height: Dimensions.get('window').height * 2,
            paddingTop: 40,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 26,
              fontWeight: 'bold',
              marginBottom: 15,
              color: '#000',
            }}>
            Moves
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {pokemonDetail.moves.map((move, idx) => {
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
                  <Text style={{color: 'black', padding: 5}}>
                    {move.move.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SharedElement>
  ) : null;
};

const stylesDetail = StyleSheet.create({
  scaleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  measureUnit: {
    fontSize: 16,
    paddingTop: 10,
    textAlign: 'center',
    color: '#000',
  },
});

export default Detail;
