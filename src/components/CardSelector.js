/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';
import {snapPoint, verticalPanGestureHandler} from 'react-native-redash';

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
  call,
  neq,
  diff,
  pow,
  min,
} = Animated;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 100,
    backgroundColor: 'pink',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const scrollSpringConfig = {
  ...SpringUtils.makeDefaultConfig(),
  damping: new Value(50),
  toValue: new Value(0),
};

const {height} = Dimensions.get('window');

const friction = ratio => multiply(0.52, pow(sub(1, ratio), 2));

const UPPER_BOUND = 0;
const LOWER_BOUND = -1 * height * 0.33;

const withScroll = ({translationY, velocityY, state: gestureState}) => {
  const clock = new Clock();
  const delta = new Value(0);
  const isSpringing = new Value(0);

  //   const isSpringing = new Value(0);
  const state = {
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    finished: new Value(0),
  };

  // I need to check bounds to restrict srolling
  const isInBound = and(
    lessOrEq(state.position, UPPER_BOUND),
    greaterOrEq(state.position, LOWER_BOUND),
  );

  const overscroll = sub(
    state.position,
    cond(greaterOrEq(state.position, 0), UPPER_BOUND, LOWER_BOUND),
  );

  return block([
    startClock(clock),
    set(delta, diff(translationY)),

    cond(
      eq(gestureState, State.ACTIVE),
      // When dragging
      [
        set(isSpringing, 0),
        set(
          state.position,
          add(
            state.position,
            cond(
              isInBound,
              delta,
              multiply(
                delta,
                friction(min(divide(abs(overscroll), height), 1)),
              ),
            ),
          ),
        ),
        set(state.velocity, velocityY),
        set(state.time, 0),
      ],
      // When dragging is over
      [
        set(translationY, 0),
        cond(
          and(isInBound, not(isSpringing)),
          // decay make scroll to have inertia
          [
            decay(clock, state, {deceleration: 0.997}),
            set(isSpringing, 1),
            set(
              scrollSpringConfig.toValue,
              snapPoint(state.position, state.velocity, [
                LOWER_BOUND,
                UPPER_BOUND,
              ]),
            ),
            spring(clock, state, scrollSpringConfig),
          ],
          [
            set(isSpringing, 1),
            set(
              scrollSpringConfig.toValue,
              snapPoint(state.position, state.velocity, [
                LOWER_BOUND,
                UPPER_BOUND,
              ]),
            ),
            spring(clock, state, scrollSpringConfig),
          ],
        ),
      ],
    ),
    state.position,
  ]);
};

const CardSelector = ({children}) => {
  const {gestureHandler, translationY, velocityY, state} = useMemoOne(
    () => verticalPanGestureHandler(),
    [],
  );

  const translateY = withScroll({translationY, velocityY, state});

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
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CardSelector;
