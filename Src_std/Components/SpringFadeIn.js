import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';
const SpringFadeIn = ({ children, delay = 0, duration = 500 }) => {
    const springAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;
    const searchTimeout = useRef(null);

    useEffect(() => {
        Animated.parallel([
            Animated.spring(springAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                delay,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                tension: 30,
                friction: 7,
                delay,
                useNativeDriver: true,
            })
        ]).start();
    }, [delay]);

    return (
        <Animated.View style={{
            opacity: springAnim,
            transform: [{ translateY }]
        }}>
            {children}
        </Animated.View>
    );
};
export default SpringFadeIn;