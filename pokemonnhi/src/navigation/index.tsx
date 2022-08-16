import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Detail from '../screens/PokemonDetail';
import React from 'react';
import {ROUTE_NAME} from './routeName';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const SharedStack = createSharedElementStackNavigator();

const AppNavigation = () => {
  const DetailTransitionSpecs = {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  };
  return (
    <NavigationContainer>
      <SharedStack.Navigator screenOptions={{headerShown: false}}>
        <SharedStack.Screen name={ROUTE_NAME.HOME} component={Home} />
        <SharedStack.Screen
          name={ROUTE_NAME.POKEMON_DETAILS}
          component={Detail}
          options={{
            headerShown: false,
            gestureEnabled: false,
            transitionSpec: DetailTransitionSpecs,
            cardStyle: {backgroundColor: 'transparent'},
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          }}
          sharedElementsConfig={route => {
            const {pokemonId, pokemonName} = route?.params;
            return [
              {
                id: pokemonId || '',
                animation: 'move',
              },
              {
                id: pokemonName || '',
                animation: 'move',
              },
            ];
          }}
        />
      </SharedStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
