import React, { useRef } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../Screens/StudentDashboardScreen';

export const QuickActionButton = ({ icon, label, onPress, color }) => {
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
            style={styles.quickActionWrapper}
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

export const QuickActionsGrid = ({ actions }) => {
    return (
        <View style={styles.quickActionsContainer}>
            {actions.map((action, index) => (
                <QuickActionButton
                    key={index}
                    icon={action.icon}
                    label={action.label}
                    onPress={() => console.log(`${action.label} pressed`)}
                    color={action.color}
                />
            ))}
        </View>
    );
};

