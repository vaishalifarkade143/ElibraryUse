import React, { Fragment, ReactNode, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const HEIGHT = 300;
const CLAMP = 20;

const BottomSheet = (props) => {
  const offset = useSharedValue(0);

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: offset.value } }],
    { useNativeDriver: false }
  );

  const onPanGestureStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
      const offsetDelta = event.nativeEvent.translationY + offset.value;
      const clamp = Math.max(-CLAMP, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    }
  };

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  });

  useEffect(() => {
    function onOpen() {
      if (props.isOpen) {
        offset.value = 0;
      }
    }

    onOpen();
  }, [props.isOpen]);

  if (!props.isOpen) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <Pressable onPress={props.backdropOnPress} style={styles.backdrop} />
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanGestureStateChange}
      >
        <Animated.View style={[styles.view, translateY]}>
          {props.children}
        </Animated.View>
      </PanGestureHandler>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1,
  },
  view: {
    backgroundColor: 'white',
    height: HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: -CLAMP * 1.1,
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default BottomSheet;
