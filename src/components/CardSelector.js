import React from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {snapPoint, verticalPanGestureHandler} from 'react-native-redash';
import Card from './Card';
import {
  OFFSET_BASIS,
  SCROLL_THRESHOLD,
  SCREEN_HEIGHT,
  UPPER_SCROLL_BOUND,
  LOWER_SCROLL_BOUND,
} from '../dimensionsUtils';
import cards from './cards';

const {
  SpringUtils,
  Value,
  Clock,
  eq,
  startClock,
  set,
  add,
  and,
  greaterOrEq,
  lessOrEq,
  cond,
  decay,
  block,
  not,
  spring,
  abs,
  multiply,
  divide,
  sub,
  useCode,
  diff,
  pow,
  min,
  interpolate,
} = Animated;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const scrollSpringConfig = {
  ...SpringUtils.makeDefaultConfig(),
  damping: new Value(1050),
  toValue: new Value(0),
};

// For rubbery effect of overscroll pull 0.01 * (1 - ratio)^2
const friction = ratio => multiply(0.01, pow(sub(1, ratio), 2));

// Helper to translate pan gesture translation to y-axis offset of the container view
// Recreate iOS native scroll inertia and rubberyness of around boundaries
const withScroll = ({translationY, velocityY, state: gestureState}) => {
  const clock = new Clock();
  const delta = new Value(0);
  const isSpringing = new Value(0);

  const state = {
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    finished: new Value(0),
  };

  // I need to check bounds to restrict srolling
  const isInBound = and(
    lessOrEq(state.position, UPPER_SCROLL_BOUND),
    greaterOrEq(state.position, LOWER_SCROLL_BOUND),
  );

  const overscroll = sub(
    state.position,
    cond(
      greaterOrEq(state.position, 0),
      UPPER_SCROLL_BOUND,
      LOWER_SCROLL_BOUND,
    ),
  );

  // Create nice effect of stickennes of overscroll, like iOS scroll do
  const overscrollIncrement = cond(
    isInBound,
    delta,
    multiply(delta, friction(min(divide(abs(overscroll), SCREEN_HEIGHT), 1))),
  );

  return block([
    startClock(clock),
    set(delta, diff(translationY)),
    cond(
      eq(gestureState, State.ACTIVE),
      // When dragging
      [
        set(isSpringing, 0),
        set(state.position, add(state.position, overscrollIncrement)),
        set(state.velocity, velocityY),
        set(state.time, 0),
      ],
      // When dragging is over
      [
        set(translationY, 0),
        // decay make scroll to have inertia.
        cond(and(isInBound, not(isSpringing)), [
          decay(clock, state, {deceleration: 0.997}),
        ]),
        [
          set(isSpringing, 1),
          set(
            scrollSpringConfig.toValue,
            snapPoint(state.position, state.velocity, [
              LOWER_SCROLL_BOUND,
              UPPER_SCROLL_BOUND,
            ]),
          ),
          spring(clock, state, scrollSpringConfig),
        ],
      ],
    ),
    state.position,
  ]);
};

const CardSelector = () => {
  const {
    gestureHandler,
    translationY,
    velocityY,
    state,
  } = verticalPanGestureHandler();
  const translateY = new Value(0);

  const cardsOffsets = cards.map(() => new Value(0));

  useCode(
    () =>
      block([
        set(translateY, withScroll({translationY, velocityY, state})),
        // calc offsets for every card
        cardsOffsets.map((offset, index) =>
          set(
            offset,
            interpolate(translateY, {
              inputRange: [-SCROLL_THRESHOLD, 0],
              outputRange: [
                (SCROLL_THRESHOLD + index * OFFSET_BASIS) / 2,
                (index + 1) * OFFSET_BASIS,
              ],
            }),
          ),
        ),
      ]),
    [],
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY,
              },
            ],
          },
        ]}>
        {cards.map((card, index) => (
          <Card
            key={String(index)}
            index={index}
            card={card}
            cardsOffsets={cardsOffsets}
            translateY={translateY}
          />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CardSelector;
