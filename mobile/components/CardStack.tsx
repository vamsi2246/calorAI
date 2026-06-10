// ====================================================
// CardStack Tinder-style Swipe deck implementation
// ====================================================

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  interpolate
} from "react-native-reanimated";
import { FoodItem } from "../constants/foods";
import FoodCard from "./FoodCard";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const SWIPE_THRESHOLD = screenWidth * 0.35;

interface CardStackProps {
  data: FoodItem[];
  onSwipe: (item: FoodItem, direction: "like" | "dislike" | "superlike" | "unsure") => void;
  onEmpty: () => void;
  // Expose swipe actions to parent for footer buttons
  ref?: React.RefObject<CardStackRef>;
}

export interface CardStackRef {
  swipe: (direction: "like" | "dislike" | "superlike" | "unsure") => void;
}

export const CardStack = React.forwardRef<CardStackRef, CardStackProps>(
  ({ data, onSwipe, onEmpty }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Expose ref actions to parent component
    React.useImperativeHandle(ref, () => ({
      swipe: (direction) => {
        triggerSwipe(direction);
      }
    }));

    useEffect(() => {
      if (currentIndex >= data.length) {
        onEmpty();
      }
    }, [currentIndex, data.length]);

    const activeItem = data[currentIndex];
    const nextItem = data[currentIndex + 1];

    const triggerSwipeJS = (direction: "like" | "dislike" | "superlike" | "unsure") => {
      if (currentIndex < data.length) {
        onSwipe(data[currentIndex], direction);
        setCurrentIndex((prev) => prev + 1);
      }
      translateX.value = 0;
      translateY.value = 0;
    };

    const triggerSwipe = (direction: "like" | "dislike" | "superlike" | "unsure") => {
      "worklet";
      if (direction === "like") {
        translateX.value = withTiming(screenWidth * 1.5, { duration: 250 }, () => {
          runOnJS(triggerSwipeJS)("like");
        });
      } else if (direction === "dislike") {
        translateX.value = withTiming(-screenWidth * 1.5, { duration: 250 }, () => {
          runOnJS(triggerSwipeJS)("dislike");
        });
      } else if (direction === "superlike") {
        translateY.value = withTiming(-screenHeight * 1.5, { duration: 250 }, () => {
          runOnJS(triggerSwipeJS)("superlike");
        });
      } else if (direction === "unsure") {
        translateY.value = withTiming(screenHeight * 1.5, { duration: 250 }, () => {
          runOnJS(triggerSwipeJS)("unsure");
        });
      }
    };

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY;
      },
      onEnd: (event) => {
        const absX = Math.abs(translateX.value);
        const absY = Math.abs(translateY.value);

        if (absX > SWIPE_THRESHOLD && absX > absY) {
          // Horizontal Swipe
          if (translateX.value > 0) {
            runOnJS(triggerSwipe)("like");
          } else {
            runOnJS(triggerSwipe)("dislike");
          }
        } else if (absY > SWIPE_THRESHOLD && absY > absX) {
          // Vertical Swipe
          if (translateY.value < 0) {
            runOnJS(triggerSwipe)("superlike");
          } else {
            runOnJS(triggerSwipe)("unsure");
          }
        } else {
          // Spring back to center
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      }
    });

    const activeCardStyle = useAnimatedStyle(() => {
      const rotate = interpolate(
        translateX.value,
        [-screenWidth / 2, 0, screenWidth / 2],
        [-10, 0, 10]
      );

      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { rotate: `${rotate}deg` }
        ]
      };
    });

    const nextCardStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        Math.max(Math.abs(translateX.value), Math.abs(translateY.value)),
        [0, SWIPE_THRESHOLD],
        [0.95, 1]
      );

      return {
        transform: [{ scale }]
      };
    });

    if (currentIndex >= data.length) {
      return null;
    }

    return (
      <View style={styles.stackContainer}>
        {/* Next Card Background depth */}
        {nextItem && (
          <Animated.View style={[styles.nextCardWrap, nextCardStyle]}>
            <FoodCard item={nextItem} />
          </Animated.View>
        )}

        {/* Active Card Foreground gesture controller */}
        {activeItem && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.activeCardWrap, activeCardStyle]}>
              <FoodCard item={activeItem} />
            </Animated.View>
          </PanGestureHandler>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  stackContainer: {
    width: "100%",
    height: 460,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  nextCardWrap: {
    position: "absolute",
    zIndex: 1,
    opacity: 0.7,
  },
  activeCardWrap: {
    position: "absolute",
    zIndex: 2,
  }
});
export default CardStack;
