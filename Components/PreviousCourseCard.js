import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated,

} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../Screens/MyCoursesScreen';


const PreviousCourseCard = ({ course }) => {
    const scaleAnim = useState(new Animated.Value(0.95))[0];

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={[
            styles.previousCourseCard,
            { transform: [{ scale: scaleAnim }] }
        ]}>
            <View style={styles.previousCourseHeader}>
                <Text style={styles.courseCode}>{course.code}</Text>
                <View style={[
                    styles.gradeBadge,
                    { backgroundColor: course.grade === 'A' ? '#DCFCE7' : '#FEF9C3' }
                ]}>
                    <Text style={[
                        styles.gradeText,
                        { color: course.grade === 'A' ? '#22C55E' : '#CA8A04' }
                    ]}>
                        Grade: {course.grade}
                    </Text>
                </View>
            </View>
            <Text style={styles.courseName}>{course.name}</Text>
            <View style={styles.courseDetails}>
                <View style={styles.detailItem}>
                    <FontAwesome5 name="user-tie" size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{course.instructor}</Text>
                </View>
                <View style={styles.detailItem}>
                    <FontAwesome5 name="graduation-cap" size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{course.creditHours} Credit Hours</Text>
                </View>
            </View>
        </Animated.View>
    );
};
export default PreviousCourseCard;