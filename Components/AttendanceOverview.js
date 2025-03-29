// Attendance Overview Component
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

const AttendanceOverview = ({ attendanceData }) => {
    const [chartVisible, setChartVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setChartVisible(true), 500);
    }, []);

    return (
        <View style={styles.attendanceCard}>
            <Text style={styles.attendanceTitle}>Attendance Overview</Text>

            <View style={styles.attendanceStats}>
                <View style={styles.attendanceStat}>
                    <Text style={styles.statValue}>{attendanceData.overallPercentage}%</Text>
                    <Text style={styles.statLabel}>Overall</Text>
                </View>
                <View style={styles.attendanceStat}>
                    <Text style={styles.statValue}>{attendanceData.presentDays}</Text>
                    <Text style={styles.statLabel}>Present</Text>
                </View>
                <View style={styles.attendanceStat}>
                    <Text style={styles.statValue}>{attendanceData.totalClasses}</Text>
                    <Text style={styles.statLabel}>Total Classes</Text>
                </View>
            </View>

            {chartVisible && (
                <LineChart
                    data={{
                        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        datasets: [{
                            data: attendanceData.weeklyTrend
                        }]
                    }}
                    width={Dimensions.get('window').width - 48}
                    height={180}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={styles.chart}
                />
            )}
        </View>
    );
};
export default AttendanceOverview;