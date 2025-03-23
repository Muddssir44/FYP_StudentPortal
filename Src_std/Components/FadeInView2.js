// FilterBar Component
import React, {useEffect, useRef } from 'react';
import {

    Animated,

} from 'react-native';



const FadeInView2 = ({ children, delay = 0, duration = 500 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: duration,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: duration,
                delay: delay,
                useNativeDriver: true,
            })
        ]).start();
    }, [delay, duration]);

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY }]
        }}>
            {children}
        </Animated.View>
    );
};
export default FadeInView2;