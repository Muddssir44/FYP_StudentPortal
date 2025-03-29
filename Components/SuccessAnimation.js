

import React, {  useRef, useEffect } from 'react';
import {
    View,
    Animated,
} from 'react-native';

export const SuccessAnimation = () => {
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            })
        ]).start();
    }, []);
    
    // Simple checkmark SVG-like component
    return (
        <Animated.View style={{
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#6C63FF',
            marginBottom: 24
        }}>
            <View style={{
                width: 40,
                height: 20,
                borderBottomWidth: 6,
                borderLeftWidth: 6,
                borderColor: 'white',
                transform: [{ rotate: '-45deg' }],
                marginTop: -10
            }} />
        </Animated.View>
    );
};