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
  Dimensions,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {POKEMON_COLORS, STATS} from '../../constants/pokemonConstant';
import styles from '../../../assets/styles';

import {SharedElement} from 'react-navigation-shared-element';
import ICON from '../../../assets/icons';
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Stat} from '../../constants/type';

const Detail = ({navigation, route}: any) => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const POKEMON_WIDTH = 200;

  const {pokemonId, pokemonDetail, pokemonName} = route?.params;

  const pokemonWidth = useSharedValue(POKEMON_WIDTH);
  const pokemonImgOpacity = useSharedValue(1);
  const offsetX = useSharedValue((screenWidth - POKEMON_WIDTH) / 2);
  const offsetY = useSharedValue(-160);
  const fontSizeHeader = useSharedValue(50);
  const imgHeaderOpacity = useSharedValue(0);
  const animatedHeight = useSharedValue(200);

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSizeHeader.value,
    };
  });

  const headerImgStyle = useAnimatedStyle(() => {
    return {
      opacity: imgHeaderOpacity.value,
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: pokemonWidth.value,
      height: pokemonWidth.value,
      top: offsetY.value,
      right: offsetX.value,
      opacity: pokemonImgOpacity.value,
    };
  });

  const pokemonColor = POKEMON_COLORS[pokemonDetail.type];
  const bgStyles = {
    ...styles.container,
    backgroundColor: pokemonColor,
    paddingTop: insets.top,
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const {contentOffset} = event;
      pokemonWidth.value = withTiming(POKEMON_WIDTH - contentOffset.y);
      offsetY.value = withTiming(-160 - contentOffset.y);
      offsetX.value = withTiming(
        (screenWidth - POKEMON_WIDTH) / 2 - contentOffset.y * 2,
      );
      imgHeaderOpacity.value = withTiming(contentOffset.y / 94);
      fontSizeHeader.value = withTiming(contentOffset.y >= 40 ? 35 : 50);
    },

    onEndDrag: e => {},
  });

  const typeBgColor = (type: string) => {
    for (let key in POKEMON_COLORS) {
      if (type === key) {
        return POKEMON_COLORS[key];
      }
    }
  };

  return pokemonDetail ? (
    <SharedElement id={pokemonName} style={bgStyles}>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
          <Animated.Text
            style={[headerStyle, styles.text__titleDetail, {marginTop: 0}]}>
            {pokemonDetail?.name}
          </Animated.Text>
        </TouchableOpacity>
        <Animated.Image
          style={[headerImgStyle, {width: 60, height: 60}]}
          source={{uri: pokemonDetail?.imgUrl}}
        />
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={scrollHandler}>
        <Animated.View
          style={[
            heightStyle,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
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
        </Animated.View>

        <SharedElement
          id={pokemonId}
          style={{
            // alignItems: 'center',
            // elevation: 5,
            zIndex: 5,
          }}>
          <Animated.Image
            style={[styles.detail__imagePokemon, animatedStyles]}
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
                        height: 25,
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
                            right:
                              (stat.base_stat / formatStat(stat)?.maxStat) *
                                100 <
                              20
                                ? -(
                                    stat.base_stat / formatStat(stat)?.maxStat
                                  ) * 400
                                : 0,

                            minWidth: 50,
                            paddingEnd: 5,
                            fontSize: 12,
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
      </Animated.ScrollView>
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
