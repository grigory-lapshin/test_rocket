import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const cardWidth = width * 0.66;
const cardHeigh = width * 0.66 * 0.628;

const verticalPadding = height * 0.33 - cardHeigh;

const cardDimensions = {width: cardWidth, height: cardHeigh};

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
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

const Capture = () => <Text style={styles.capture}>Виртуальная карта</Text>;

const Card = () => (
  <View style={styles.cardContainer}>
    <View style={styles.card} />
    <Capture>Test</Capture>
  </View>
);

export default Card;
