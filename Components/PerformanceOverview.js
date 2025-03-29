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

const PerformanceOverview = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [selectedMetric, setSelectedMetric] = useState('gpa');

    const performanceData = {
        gpa: {
            current: 3.75,
            trend: [3.5, 3.6, 3.7, 3.75],
            label: 'CGPA'
        },
        credits: {
            completed: 85,
            total: 130,
            trend: [65, 72, 78, 85],
            label: 'Credit Hours'
        }
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.performanceCard, { opacity: fadeAnim }]}>
            <View style={styles.performanceHeader}>
                <Text style={styles.performanceTitle}>Academic Performance</Text>
                <View style={styles.metricToggle}>
                    <TouchableOpacity
                        style={[
                            styles.metricButton,
                            selectedMetric === 'gpa' && styles.metricButtonActive
                        ]}
                        onPress={() => setSelectedMetric('gpa')}
                    >
                        <Text style={[
                            styles.metricButtonText,
                            selectedMetric === 'gpa' && styles.metricButtonTextActive
                        ]}>GPA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.metricButton,
                            selectedMetric === 'credits' && styles.metricButtonActive
                        ]}
                        onPress={() => setSelectedMetric('credits')}
                    >
                        <Text style={[
                            styles.metricButtonText,
                            selectedMetric === 'credits' && styles.metricButtonTextActive
                        ]}>Credits</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.performanceContent}>
                <View style={styles.performanceMetrics}>
                    <View style={styles.mainMetric}>
                        <Text style={styles.mainMetricValue}>
                            {selectedMetric === 'gpa'
                                ? performanceData.gpa.current
                                : `${performanceData.credits.completed}/${performanceData.credits.total}`
                            }
                        </Text>
                        <Text style={styles.mainMetricLabel}>
                            {performanceData[selectedMetric].label}
                        </Text>
                    </View>
                    <BarChart
                        data={{
                            labels: ['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                            datasets: [{
                                data: performanceData[selectedMetric].trend
                            }]
                        }}
                        width={200}
                        height={100}
                        chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            decimalPlaces: selectedMetric === 'gpa' ? 2 : 0,
                            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        style={styles.performanceChart}
                        showValuesOnTopOfBars
                        fromZero
                    />
                </View>
            </View>
        </Animated.View>
    );
};
export default PerformanceOverview;