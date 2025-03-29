import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import SemesterHeader from '../Components/SemesterHeader';
import CurrentCourseCard from '../Components/CurrentCourseCard';
import PreviousCourseCard from '../Components/PreviousCourseCard';


// Mock data structure for student courses
const studentCoursesData = {
    currentSemester: {
        number: 6,
        courses: [
            {
                id: 1,
                code: 'SE601',
                name: 'Computer Networks',
                creditHours: 3,
                instructor: 'Dr. Sarah Wilson',
                type: 'Theory + Lab',
                schedule: {
                    theory: {
                        days: ['Monday', 'Wednesday'],
                        time: '10:00 AM - 11:30 AM',
                        room: 'Room 301'
                    },
                    lab: {
                        day: 'Thursday',
                        time: '2:00 PM - 5:00 PM',
                        room: 'Lab 201'
                    }
                },
                progress: 65
            }, {
                id: 2,
                code: 'SE601',
                name: 'Computer Networks',
                creditHours: 3,
                instructor: 'Dr. Sarah Wilson',
                type: 'Theory + Lab',
                schedule: {
                    theory: {
                        days: ['Monday', 'Wednesday'],
                        time: '10:00 AM - 11:30 AM',
                        room: 'Room 301'
                    },
                    lab: {
                        day: 'Thursday',
                        time: '2:00 PM - 5:00 PM',
                        room: 'Lab 201'
                    }
                },
                progress: 65
            }, {
                id: 3,
                code: 'SE601',
                name: 'Computer Networks',
                creditHours: 3,
                instructor: 'Dr. Sarah Wilson',
                type: 'Theory + Lab',
                schedule: {
                    theory: {
                        days: ['Monday', 'Wednesday'],
                        time: '10:00 AM - 11:30 AM',
                        room: 'Room 301'
                    },
                    lab: {
                        day: 'Thursday',
                        time: '2:00 PM - 5:00 PM',
                        room: 'Lab 201'
                    }
                },
                progress: 65
            }, {
                id: 4,
                code: 'SE601',
                name: 'Computer Networks',
                creditHours: 3,
                instructor: 'Dr. Sarah Wilson',
                type: 'Theory + Lab',
                schedule: {
                    theory: {
                        days: ['Monday', 'Wednesday'],
                        time: '10:00 AM - 11:30 AM',
                        room: 'Room 301'
                    },
                    lab: {
                        day: 'Thursday',
                        time: '2:00 PM - 5:00 PM',
                        room: 'Lab 201'
                    }
                },
                progress: 65
            }, {
                id: 5,
                code: 'SE601',
                name: 'Computer Networks',
                creditHours: 3,
                instructor: 'Dr. Sarah Wilson',
                type: 'Theory + Lab',
                schedule: {
                    theory: {
                        days: ['Monday', 'Wednesday'],
                        time: '10:00 AM - 11:30 AM',
                        room: 'Room 301'
                    },
                    lab: {
                        day: 'Thursday',
                        time: '2:00 PM - 5:00 PM',
                        room: 'Lab 201'
                    }
                },
                progress: 65
            }, {
                id: 6,
                code: 'SE601',
                name: 'Computer Networks',
                creditHours: 3,
                instructor: 'Dr. Sarah Wilson',
                type: 'Theory + Lab',
                schedule: {
                    theory: {
                        days: ['Monday', 'Wednesday'],
                        time: '10:00 AM - 11:30 AM',
                        room: 'Room 301'
                    },
                    lab: {
                        day: 'Thursday',
                        time: '2:00 PM - 5:00 PM',
                        room: 'Lab 201'
                    }
                },
                progress: 65
            },
            // ... more current semester courses
        ]
    },
    allSemesters: [
        {
            number: 5,
            completed: true,
            gpa: 3.75,
            courses: [
                {
                    id: 1,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 2,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 3,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 4,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 5,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 6,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 7,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                },
                // ... more courses
            ]
        },
        {
            number: 4,
            completed: true,
            gpa: 3.75,
            courses: [
                {
                    id: 1,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 2,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 3,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 4,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 5,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 6,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 7,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                },
                // ... more courses
            ]
        },
        {
            number: 3,
            completed: true,
            gpa: 3.75,
            courses: [
                {
                    id: 1,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 2,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 3,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 4,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 5,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 6,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 7,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                },
                // ... more courses
            ]
        },
        {
            number: 2,
            completed: true,
            gpa: 3.75,
            courses: [
                {
                    id: 1,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 2,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 3,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 4,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 5,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 6,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                }, {
                    id: 7,
                    code: 'SE501',
                    name: 'Software Design Patterns',
                    creditHours: 3,
                    instructor: 'Dr. Michael Brown',
                    grade: 'A',
                    status: 'completed'
                },
                // ... more courses
            ]
        },

        // ... more semesters
    ]
};

// Main Courses Screen
const MyCoursesScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('current');
    const slideAnim = useState(new Animated.Value(0))[0];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        Animated.spring(slideAnim, {
            toValue: tab === 'current' ? 0 : 1,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="My Courses"
                subtitle="Academic Journey"
                showBack
                navigation={navigation}
            />

            <View style={styles.tabContainer}>
                <Animated.View
                    style={[
                        styles.tabIndicator,
                        {
                            transform: [{
                                translateX: slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, Dimensions.get('window').width / 2]
                                })
                            }]
                        }
                    ]}
                />
                {['current', 'all'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            activeTab === tab && styles.activeTab
                        ]}
                        onPress={() => handleTabChange(tab)}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab && styles.activeTabText
                        ]}>
                            {tab === 'current' ? 'Current Semester' : 'All Courses'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.content}>
                {activeTab === 'current' ? (
                    <>
                        <View style={styles.currentSemesterHeader}>
                            <Text style={styles.currentSemesterTitle}>
                                Semester {studentCoursesData.currentSemester.number}
                            </Text>
                            <Text style={styles.currentSemesterSubtitle}>
                                Spring 2025
                            </Text>
                        </View>
                        {studentCoursesData.currentSemester.courses.map(course => (
                            <CurrentCourseCard
                                key={course.id}
                                course={course}
                                onPress={() => navigation.navigate('CourseDetail', { course })}
                            />
                        ))}
                    </>
                ) : (
                    studentCoursesData.allSemesters.map(semester => (
                        <View key={semester.number}>
                            <SemesterHeader semester={semester} />
                            <View style={styles.courseGrid}>
                                {semester.courses.map(course => (
                                    <PreviousCourseCard
                                        key={course.id}
                                        course={course}
                                    />
                                ))}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        padding: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 12,
        padding: 4,
        position: 'relative',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderRadius: 8,
    },
    tabIndicator: {
        position: 'absolute',
        width: '50%',
        height: '120%',
        backgroundColor: '#EEF0FB',
        borderRadius: 8,
    },
    tabText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#6C63FF',
        fontWeight: '600',
    },
    currentSemesterHeader: {
        marginBottom: 16,
    },
    currentSemesterTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    currentSemesterSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 4,
    },
    currentCourseCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseBasicInfo: {
        flex: 1,
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    courseCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    labBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    labText: {
        fontSize: 12,
        color: '#6C63FF',
        marginLeft: 4,
        fontWeight: '600',
    },
    courseName: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    instructorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    instructorName: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    scheduleContainer: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        overflow: 'hidden',
    },
    scheduleSection: {
        marginBottom: 16,
    },
    scheduleTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    scheduleDetails: {
        gap: 8,
    },
    scheduleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scheduleText: {
        fontSize: 14,
        color: '#6B7280',
    },
    semesterHeader: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    semesterInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    semesterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    gpaContainer: {
        backgroundColor: '#EEF0FB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    gpaLabel: {
        fontSize: 12,
        color: '#6C63FF',
        fontWeight: '600',
    },
    gpaValue: {
        fontSize: 14,
        color: '#6C63FF',
        fontWeight: 'bold',
    },
    semesterProgress: {
        gap: 8,
    },
    progressLine: {
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6C63FF',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        color: '#6B7280',
    },
    courseGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
    },
    previousCourseCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        width: (Dimensions.get('window').width - 48) / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    previousCourseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    gradeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    gradeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    courseDetails: {
        marginTop: 12,
        gap: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 12,
        color: '#6B7280',
    },
});

export default MyCoursesScreen;