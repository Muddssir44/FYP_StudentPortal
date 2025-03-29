
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import CircularProgress from '../Components/CircularProgress';
import { styles } from '../Screens/StudentAcademicsView';



const getGradeColor = (grade, background = false) => {
    const gradeColors = {
        A: "#4CAF50",  // Green
        "A-": "#66BB6A",
        B: "#FFEB3B",  // Yellow
        "B-": "#FDD835",
        C: "#FF9800",  // Orange
        "C-": "#FB8C00",
        D: "#F44336",  // Red
        F: "#D32F2F"   // Dark Red
    };

    return background ? (gradeColors[grade] || "#E0E0E0") : "#FFFFFF"; // Default to gray if grade not found
};
const SemesterCourseList = ({ courses, isCurrentSemester }) => {
    return (
      <View style={styles.courseListContainer}>
        {courses.map((course, index) => (
          <View key={course.code} style={styles.courseItem}>
            <View style={styles.courseDetails}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.creditHours}>{course.creditHours} Credit Hours</Text>
            </View>
            {isCurrentSemester ? (
              <View style={styles.currentEnrollmentBadge}>
                <Text style={styles.currentEnrollmentText}>Currently Enrolled</Text>
              </View>
            ) : (
              <View style={[styles.gradeBadge, { 
                backgroundColor: getGradeColor(course.grade, true),
              }]}>
                <Text style={[styles.gradeText, { 
                  color: getGradeColor(course.grade) 
                }]}>{course.grade}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

const SemesterCard = ({ semester, isCurrentSemester }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);

        Animated.timing(animatedHeight, {
            toValue: newState ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.semesterCard}>
            <TouchableOpacity onPress={toggleExpand} style={styles.semesterHeader}>
                <View style={styles.semesterInfo}>
                    <Text style={styles.semesterTitle}>
                        {isCurrentSemester ? 'Spring 2025 (Current)' : `Semester ${semester.semester}`}
                    </Text>
                    <Text style={styles.courseCount}>{semester.courses.length} Courses</Text>
                </View>
                <View style={styles.headerRight}>
                    {!isCurrentSemester && (
                        <CircularProgress
                            value={semester.gpa}
                            size={60}
                            strokeWidth={6}
                            duration={1000}
                            color="#6C63FF"
                            label="GPA"
                        />
                    )}
                    <MaterialIcons
                        name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={24}
                        color="#6C63FF"
                    />
                </View>
            </TouchableOpacity>

            <Animated.View style={[
                styles.coursesContainer,
                {
                    height: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 500],
                    }),
                    opacity: animatedHeight,
                },
            ]}>
                <SemesterCourseList
                    courses={semester.courses}
                    isCurrentSemester={isCurrentSemester}
                />
            </Animated.View>
        </View>
    );
};
export default SemesterCard;