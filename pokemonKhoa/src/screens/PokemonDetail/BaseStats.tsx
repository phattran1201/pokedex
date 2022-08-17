/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from '../../../assets/styles';
import {ProgressBar, Colors} from 'react-native-paper';
import {PokemonDetail} from '../../constants/type';

interface Stat {
  base_stat: number;
  effort: number;
  stat: StatObj;
}
interface StatObj {
  name: string;
  url: string;
}

function Stats({item}: {item: PokemonDetail}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      {item.stats.map((stat: Stat, idx: number) => {
        return (
          <View key={idx} style={{flexDirection: 'row', marginBottom: 30}}>
            <Text style={styles.stats__title}>
              {stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1)}
            </Text>
            <Text style={styles.stats__text}>{stat.base_stat}</Text>
            <View style={{width: 130, alignContent: 'center', paddingTop: 10}}>
              <ProgressBar
                progress={stat.base_stat / 100}
                color={Colors.grey800}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
export default memo(Stats);
