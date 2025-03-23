import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    RefreshControl
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { LineChart } from 'react-native-chart-kit';
import { Calendar } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import CircularProgress from '../Components/CircularProgress';
import { styles } from '../Screens/StudentDashboardScreen';


const QuickActionButton = ({ icon, label, onPress, color }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Animated.View style={[
                styles.quickActionButton,
                { transform: [{ scale: scaleAnim }] }
            ]}>
                <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                    <FontAwesome5 name={icon} size={20} color={color} />
                </View>
                <Text style={styles.quickActionLabel}>{label}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};
export default QuickActionButton;