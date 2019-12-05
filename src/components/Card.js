import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {SCREEN_HEIGHT, cardDimensions} from '../dimensionsUtils';

const {Extrapolate, interpolate, log, useCode, multiply} = Animated;

const THRESHOLD = SCREEN_HEIGHT * 0.25;

const containerHeight = cardDimensions.height * 2.5;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  card: {
    width: cardDimensions.width,
    height: cardDimensions.height,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  capture: {
    color: 'hsl(0, 0%, 46%)',
    fontSize: 20,
    textAlign: 'center',
  },
});

const Capture = ({children}) => <Text style={styles.capture}>{children}</Text>;

const Card = ({card, cardsOffsets, index}) => {
  const {title, capture} = card;
  console.log(card);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: cardsOffsets[index],
            },
          ],
        },
      ]}>
      <Capture>{title}</Capture>
      <View style={styles.card} />
      <Capture>{capture}</Capture>
    </Animated.View>
  );
};

export default Card;
