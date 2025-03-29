import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,

} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';
import GPATrendChart from '../Components/GPATrendChart';
import SemesterCard from '../Components/SemesterCard';


// Main Component
const StudentAcademicsView = () => {
    const [academicData, setAcademicData] = useState({
        currentCGPA: 3.75,
        totalCredits: 45,
        currentSemester: {
            semester: 4,
            courses: [
                { code: "CS401", name: "Advanced Programming", creditHours: 3 },
                { code: "SE401", name: "Software Engineering", creditHours: 3 },
                { code: "CS402", name: "Artificial Intelligence", creditHours: 3 },
                { code: "CS403", name: "Web Technologies", creditHours: 3 }
            ]
        },
        semesterGPAs: [
            {
                semester: 1,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 2,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 3,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 4,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 5,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            {
                semester: 6,
                gpa: 3.80,
                courses: [
                    { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
                    { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
                    { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
                ]
            },
            // Add more past semesters...
        ]
    });
    const AchievementBadge = ({ icon, value, label, color }) => {
        return (
            <View style={[styles.achievementBadge, { backgroundColor: 'white' }]}>
                <View style={[styles.iconContainer, { backgroundColor: color }]}>
                    <FontAwesome5 name={icon} size={24} color="white" />
                </View>
                <Text style={styles.achievementValue}>{value}</Text>
                <Text style={styles.achievementLabel}>{label}</Text>
            </View>
        );
    };
    return (
        <ScrollView style={styles.container}>
            <Header />
            <CustomHeader
                title="Academic Records"
                subtitle="Track your academic journey"
            />

            <View style={styles.content}>
                {/* Achievement Stats */}
                <View style={styles.achievementsContainer}>
                    <AchievementBadge
                        icon="graduation-cap"
                        value={academicData.currentCGPA.toFixed(2)}
                        label="Current CGPA"
                        color="#6C63FF"
                    />
                    <AchievementBadge
                        icon="book"
                        value={academicData.totalCredits}
                        label=" Total Credit Hours"
                        color="#22C55E"
                    />
                    <AchievementBadge
                        icon="award"
                        value={academicData.currentSemester.courses.length}
                        label="Registered Courses"
                        color="#F59E0B"
                    />
                    <AchievementBadge
                        icon="book"
                        value="Spring 2025"
                        label="Active Semester"
                        color="#EC4899"
                    />
                </View>

                {/* CGPA Display */}
                <View style={styles.cgpaContainer}>
                    <CircularProgress
                        value={academicData.currentCGPA}
                        size={180}
                        strokeWidth={12}
                        duration={1500}
                        color="#6C63FF"
                        label="CGPA"
                    />
                    <Text style={styles.cgpaScale}>out of 4.00</Text>
                </View>

                {/* GPA Trend Chart */}
                <GPATrendChart semesters={academicData.semesterGPAs} />

                {/* Current Semester */}
                <SemesterCard
                    semester={academicData.currentSemester}
                    isCurrentSemester={true}
                />

                {/* Past Semesters */}
                {academicData.semesterGPAs.map((semester, index) => (
                    <SemesterCard
                        key={semester.semester}
                        semester={semester}
                        isCurrentSemester={false}
                    />
                ))}
            </View>
        </ScrollView>
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
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    achievementsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    achievementBadge: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 50,
        marginBottom: 8,
    },
    achievementValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    achievementLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    cgpaContainer: {
        alignItems: 'center',
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#EEF0FB',
        borderRadius: 12,
    },
    cgpaScale: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
    },
    semestersContainer: {
        gap: 16,
    },
    semesterCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    semesterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    semesterInfo: {
        flex: 1,
    },
    semesterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    courseCount: {
        fontSize: 14,
        color: '#6B7280',
    },
    coursesContainer: {
        overflow: 'hidden',
    },
    gradeCard: {
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    gradeCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseInfo: {
        flex: 1,
    },
    courseCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    courseName: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    creditHours: {
        fontSize: 12,
        color: '#6B7280',
    },
    gradeContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    gradeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
    },
    chartContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    currentEnrollmentBadge: {
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    currentEnrollmentText: {
        color: '#6C63FF',
        fontSize: 14,
        fontWeight: '600',
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    chartHeader: {
        marginBottom: 16,
    },
    chartSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    courseItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    courseListContainer: {
        padding: 16,
    },
    courseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    enrollmentStatusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#6C63FF',
        marginRight: 6,
    },
    currentEnrollmentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    }
});

export default StudentAcademicsView;