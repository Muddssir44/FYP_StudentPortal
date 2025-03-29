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

const ProgressInsights = () => {
    const [activeInsight, setActiveInsight] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const insights = [
        {
            title: "Course Completion",
            value: "65%",
            description: "You've completed 85 out of 130 required credit hours",
            trend: "up",
            trendValue: "+5% from last semester"
        },
        {
            title: "Learning Goals",
            value: "8/10",
            description: "You've achieved 8 out of your 10 learning objectives",
            trend: "up",
            trendValue: "2 remaining goals"
        },
        {
            title: "Skills Development",
            value: "4",
            description: "New technical skills acquired this semester",
            trend: "up",
            trendValue: "Above average progress"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();

            setActiveInsight((prev) => (prev + 1) % insights.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>Progress Insights</Text>

            <Animated.View style={[styles.insightContent, { opacity: fadeAnim }]}>
                <Text style={styles.insightMainValue}>
                    {insights[activeInsight].value}
                </Text>
                <Text style={styles.insightTitle}>
                    {insights[activeInsight].title}
                </Text>
                <Text style={styles.insightDescription}>
                    {insights[activeInsight].description}
                </Text>
                <View style={styles.trendContainer}>
                    <FontAwesome5
                        name={`trend-${insights[activeInsight].trend}`}
                        size={14}
                        color={insights[activeInsight].trend === 'up' ? '#22C55E' : '#EF4444'}
                    />
                    <Text style={[
                        styles.trendText,
                        { color: insights[activeInsight].trend === 'up' ? '#22C55E' : '#EF4444' }
                    ]}>
                        {insights[activeInsight].trendValue}
                    </Text>
                </View>
            </Animated.View>

            <View style={styles.insightIndicators}>
                {insights.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            index === activeInsight && styles.indicatorActive
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};
export default ProgressInsights;