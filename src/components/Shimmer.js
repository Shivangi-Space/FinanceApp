import React, { useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    Animated,
} from "react-native";

const Shimmer = ({ width, height, borradius = 10 }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
        style = {[{ 
            width,
            height,
            borradius,
            backgroundColor: '#E1E9EE',
            opacity,
         }]}
    />
  );
};

export default Shimmer;