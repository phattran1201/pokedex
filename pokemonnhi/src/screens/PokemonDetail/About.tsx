/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, memo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from '../../../assets/styles';
import {Abilities, PokemonDetail} from '../../constants/type';

function About({item}: {item: PokemonDetail}) {
  const [abilities, setAbilities] = useState<any>([]);

  useEffect(() => {
    const abilityList = item.abilities.map((ability: Abilities) => {
      return ability.ability.name;
    });
    setAbilities(abilityList);
  }, [item]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text style={styles.about__title}>Species</Text>
        <Text style={styles.about__text}>{item.species}</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text style={styles.about__title}>Height</Text>
        <Text style={styles.about__text}>{item.height} ''</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text style={styles.about__title}>Weight</Text>
        <Text style={styles.about__text}>{item.weight} lbs</Text>
      </View>

      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text style={styles.about__title}>Abilities</Text>
        <Text style={styles.about__text}>{abilities.join(', ')}</Text>
      </View>
    </ScrollView>
  );
}
export default memo(About);
