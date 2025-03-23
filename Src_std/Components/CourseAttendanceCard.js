// Course Attendance Card Component

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,

} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../Screens/StudentAttendanceScreen';



const CourseAttendanceCard = ({ course, onPress }) => {
    const scaleAnim = useState(new Animated.Value(0))[0];
    const progressAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true
        }).start();

        Animated.timing(progressAnim, {
            toValue: course.percentage / 100,
            duration: 1500,
            useNativeDriver: false
        }).start();
    }, []);

    const getStatusColor = (percentage) => {
        if (percentage >= 90) return '#22C55E';
        if (percentage >= 75) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <Animated.View style={[
            styles.courseCard,
            { transform: [{ scale: scaleAnim }] }
        ]}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.courseHeader}>
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseCode}>{course.code}</Text>
                        <Text style={styles.courseName}>{course.name}</Text>
                    </View>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(course.percentage)}20` }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: getStatusColor(course.percentage) }
                        ]}>
                            {course.percentage}% Present
                        </Text>
                    </View>
                </View>

                <View style={styles.attendanceStats}>
                    <Animated.View style={[
                        styles.progressBar,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            }),
                            backgroundColor: getStatusColor(course.percentage)
                        }
                    ]} />
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <FontAwesome5 name="check-circle" size={16} color="#22C55E" />
                            <Text style={styles.statText}>
                                {course.attendedClasses} Classes Attended
                            </Text>
                        </View>
                        <View style={styles.statItem}>
                            <FontAwesome5 name="calendar-alt" size={16} color="#6C63FF" />
                            <Text style={styles.statText}>
                                {course.totalClasses} Total Classes
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};
export default CourseAttendanceCard;