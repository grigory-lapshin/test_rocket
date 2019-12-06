import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  cardDimensions,
  SCROLL_THRESHOLD,
  DEFAULT_PADDING,
} from '../dimensionsUtils';

const {interpolate} = Animated;

const textStyles = {
  position: 'absolute',
  color: 'hsl(0, 0%, 65%)',
  fontSize: 14,
  textAlign: 'center',
  width: cardDimensions.width,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: cardDimensions.height,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    top: 0,
    width: cardDimensions.width,
    height: cardDimensions.height,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  titleTop: {...textStyles, top: -DEFAULT_PADDING},
  titleBottom: {...textStyles, top: cardDimensions.height + DEFAULT_PADDING},
  captureText: {
    ...textStyles,
    top: cardDimensions.height + DEFAULT_PADDING,
  },
});

const Title = ({translateY, index, children}) => {
  const titleOffset = interpolate(translateY, {
    inputRange: [-SCROLL_THRESHOLD, 0],
    outputRange:
      index === 0
        ? [0, DEFAULT_PADDING]
        : [-DEFAULT_PADDING * 2, -DEFAULT_PADDING],
  });

  const titleOpacity = interpolate(translateY, {
    inputRange: [-SCROLL_THRESHOLD, 0],
    outputRange: index === 0 ? [1, 0] : [0, 1],
  });

  return (
    <Animated.Text
      style={[
        index !== 0 ? styles.titleTop : styles.titleBottom,
        {
          transform: [
            {
              translateY: titleOffset,
            },
          ],
          opacity: titleOpacity,
        },
      ]}>
      {children}
    </Animated.Text>
  );
};

const Capture = ({translateY, index, children}) => {
  const captureOffset = interpolate(translateY, {
    inputRange: [-SCROLL_THRESHOLD, 0],
    outputRange:
      index === 0 ? [-cardDimensions.height, 0] : [0, -cardDimensions.height],
  });

  const captureOpacity = interpolate(translateY, {
    inputRange: [-SCROLL_THRESHOLD / 8, 0],
    outputRange: index === 0 ? [0, 1] : [1, 0],
  });

  return (
    <Animated.Text
      style={[
        styles.captureText,

        {
          transform: [
            {
              translateY: captureOffset,
            },
          ],
          opacity: captureOpacity,
        },
      ]}>
      {children}
    </Animated.Text>
  );
};

const Card = ({card: {title, capture}, cardsOffsets, translateY, index}) => {
  const containerOffset = cardsOffsets[index];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: containerOffset,
            },
          ],
        },
      ]}>
      <Title translateY={translateY} index={index}>
        {title}
      </Title>
      <Capture translateY={translateY} index={index}>
        {capture}
      </Capture>
      <Image style={styles.card} source={require('../assets/card.png')} />
    </Animated.View>
  );
};

export default Card;
