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

const SemesterProgressCard = ({ semesterInfo }) => {
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: semesterInfo.progress / 100,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <View style={styles.semesterCard}>
            <View style={styles.semesterHeader}>
                <View>
                    <Text style={styles.semesterTitle}>Current Semester</Text>
                    <Text style={styles.semesterSubtitle}>
                        Semester {semesterInfo.semester} • {semesterInfo.year}
                    </Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>In Progress</Text>
                </View>
            </View>

            <View style={styles.progressSection}>
                <CircularProgress
                    value={semesterInfo.progress}
                    size={60}
                    strokeWidth={6}
                    duration={1500}
                    color="#6C63FF"
                />
                <View style={styles.progressInfo}>
                    <Text style={styles.progressTitle}>Semester Progress</Text>
                    <Text style={styles.progressStats}>
                        {semesterInfo.completedCredits} / {semesterInfo.totalCredits} Credits Completed
                    </Text>
                </View>
            </View>

            <View style={styles.coursesContainer}>
                {semesterInfo.courses.map((course, index) => (
                    <View key={index} style={styles.courseItem}>
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseCode}>{course.code}</Text>
                            <Text style={styles.courseName}>{course.name}</Text>
                        </View>
                        <View style={[
                            styles.courseStatus,
                            { backgroundColor: course.status === 'On Track' ? '#DCFCE7' : '#FEF3C7' }
                        ]}>
                            <Text style={[
                                styles.courseStatusText,
                                { color: course.status === 'On Track' ? '#22C55E' : '#F59E0B' }
                            ]}>
                                {course.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};
export default SemesterProgressCard;