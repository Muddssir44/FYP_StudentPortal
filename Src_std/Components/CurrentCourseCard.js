import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,

} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import CircularProgress from '../Components/CircularProgress';
import { styles } from '../Screens/MyCoursesScreen';

const CurrentCourseCard = ({ course, onPress }) => {
    const [expanded, setExpanded] = useState(false);
    const rotateAnim = useState(new Animated.Value(0))[0];
    const heightAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.parallel([
            Animated.spring(rotateAnim, {
                toValue: expanded ? 1 : 0,
                useNativeDriver: true
            }),
            Animated.spring(heightAnim, {
                toValue: expanded ? 1 : 0,
                useNativeDriver: false
            })
        ]).start();
    }, [expanded]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return (
        <Animated.View style={styles.currentCourseCard}>
            <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.courseBasicInfo}>
                    <View style={styles.codeContainer}>
                        <Text style={styles.courseCode}>{course.code}</Text>
                        {course.type.includes('Lab') && (
                            <View style={styles.labBadge}>
                                <FontAwesome5 name="flask" size={12} color="#6C63FF" />
                                <Text style={styles.labText}>+Lab</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <View style={styles.instructorContainer}>
                        <FontAwesome5 name="chalkboard-teacher" size={14} color="#6B7280" />
                        <Text style={styles.instructorName}>{course.instructor}</Text>
                    </View>
                </View>

                <View style={styles.rightContent}>
                    <CircularProgress
                        value={course.progress}
                        size={48}  
                        strokeWidth={4}
                        duration={1000}  
                        label={course.label} 
                        scale={1}  
                        color="#6C63FF"
                    />

                    <Animated.View style={{ transform: [{ rotate }] }}>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color="#6B7280"
                        />
                    </Animated.View>
                </View>
            </TouchableOpacity>

            <Animated.View style={[
                styles.scheduleContainer,
                {
                    maxHeight: heightAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 300]
                    }),
                    opacity: heightAnim
                }
            ]}>
                <View style={styles.scheduleSection}>
                    <Text style={styles.scheduleTitle}>Theory Classes</Text>
                    <View style={styles.scheduleDetails}>
                        <View style={styles.scheduleItem}>
                            <FontAwesome5 name="calendar-alt" size={14} color="#6C63FF" />
                            <Text style={styles.scheduleText}>
                                {course.schedule.theory.days.join(', ')}
                            </Text>
                        </View>
                        <View style={styles.scheduleItem}>
                            <FontAwesome5 name="clock" size={14} color="#6C63FF" />
                            <Text style={styles.scheduleText}>
                                {course.schedule.theory.time}
                            </Text>
                        </View>
                        <View style={styles.scheduleItem}>
                            <FontAwesome5 name="door-open" size={14} color="#6C63FF" />
                            <Text style={styles.scheduleText}>
                                {course.schedule.theory.room}
                            </Text>
                        </View>
                    </View>
                </View>

                {course.schedule.lab && (
                    <View style={styles.scheduleSection}>
                        <Text style={styles.scheduleTitle}>Lab Sessions</Text>
                        <View style={styles.scheduleDetails}>
                            <View style={styles.scheduleItem}>
                                <FontAwesome5 name="calendar-alt" size={14} color="#6C63FF" />
                                <Text style={styles.scheduleText}>
                                    {course.schedule.lab.day}
                                </Text>
                            </View>
                            <View style={styles.scheduleItem}>
                                <FontAwesome5 name="clock" size={14} color="#6C63FF" />
                                <Text style={styles.scheduleText}>
                                    {course.schedule.lab.time}
                                </Text>
                            </View>
                            <View style={styles.scheduleItem}>
                                <FontAwesome5 name="flask" size={14} color="#6C63FF" />
                                <Text style={styles.scheduleText}>
                                    {course.schedule.lab.room}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </Animated.View>
        </Animated.View>
    );
};
 export default CurrentCourseCard;