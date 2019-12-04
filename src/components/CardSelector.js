/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';
import {snapPoint, verticalPanGestureHandler} from 'react-native-redash';

const {
  add,
  cond,
  diff,
  divide,
  eq,
  event,
  exp,
  lessThan,
  and,
  call,
  block,
  multiply,
  pow,
  set,
  abs,
  clockRunning,
  greaterOrEq,
  lessOrEq,
  sqrt,
  startClock,
  stopClock,
  sub,
  Clock,
  Value,
  useCode,
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

const withScroll = ({translationY, velocityY, state: gestureState}) => {
  const clock = new Clock();
  const offset = new Value();
  const state = {
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    finished: new Value(0),
  };

  return block([
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.position, add(offset, translationY))],
      [set(offset, state.position)],
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
