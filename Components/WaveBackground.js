// Animated Wave Background Component
import React, { useState, useEffect } from 'react';
import {
    View,
    Animated,

} from 'react-native';
import { styles } from '../Screens/StudentAttendanceScreen';

const WaveBackground = ({ percentage }) => {
    const animation = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.waveContainer,
                {
                    transform: [{
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        })
                    }]
                }
            ]}
        >
            <View style={[
                styles.wave,
                { height: `${100 - percentage}%` }
            ]} />
        </Animated.View>
    );
};
export default WaveBackground;