import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    StyleSheet,
    RefreshControl
} from 'react-native';
import { Header } from '../Components/Header';
import AcademicCalendar from '../Components/AcademicCalendar';
import PerformanceOverview from '../Components/PerformanceOverview';
import ResourceCenter from '../Components/ResourceCenter';
import ProgressInsights from '../Components/ProgressInsights';
import SemesterProgressCard from '../Components/SemesterProgressCard';
import UpcomingEventsCard from '../Components/UpcomingEventsCard';
import AttendanceOverview from '../Components/AttendanceOverview';
import { QuickActionButton } from '../Components/QuickActionButton';
import { QuickActionsGrid } from '../Components/QuickActionButton';

// Main Dashboard Screen
const StudentDashboardScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Mock data
    const semesterInfo = {
        semester: 6,
        year: "2025",
        progress: 75,
        completedCredits: 12,
        totalCredits: 16,
        courses: [
            { code: "SE601", name: "Software Design Patterns", status: "On Track" },
            { code: "SE602", name: "Computer Networks", status: "Needs Attention" },
            { code: "SE603", name: "Database Systems", status: "On Track" }
        ]
    };

    const upcomingEvents = [
        {
            type: "exam",
            title: "Software Design Patterns Mid-Term",
            time: "Tomorrow, 9:00 AM"
        },
        {
            type: "assignment",
            title: "Computer Networks Lab Report",
            time: "Due in 2 days"
        },
        {
            type: "event",
            title: "Tech Talk: Future of AI",
            time: "Friday, 2:00 PM"
        }
    ];

    const attendanceData = {
        overallPercentage: 85,
        presentDays: 68,
        totalClasses: 80,
        weeklyTrend: [75, 80, 85, 82]
    };

    const quickActions = [
        { icon: "calendar-check", label: "Attendance", color: "#6C63FF", screen: "Attendance" },
        { icon: "tasks", label: "Courses", color: "#22C55E", screen: "Courses" },
        { icon: "file-alt", label: "Exams", color: "#F59E0B", screen: "ExamSchedule" },
        { icon: "building", label: "Internships", color: "#EF4444", screen: "Internships" }
    ];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Simulate data refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Animated.View style={{ opacity: fadeAnim }}>
                    <View style={styles.welcomeSection}>
                        <View>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.userName}>John Doe</Text>
                        </View>

                    </View>

                    <View style={styles.quickActions}>
                        {quickActions.map((action, index) => (
                            <QuickActionButton
                                key={index}
                                {...action}
                                onPress={() => navigation.navigate(action.screen)}
                            />
                        ))}
                    </View>

                    <ProgressInsights />
                    <SemesterProgressCard semesterInfo={semesterInfo} />
                    <PerformanceOverview />
                    <AttendanceOverview attendanceData={attendanceData} />

                    <UpcomingEventsCard events={upcomingEvents} />
                    <ResourceCenter />
                    <AcademicCalendar />

                </Animated.View>
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
        flex: 1,
    },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    welcomeText: {
        fontSize: 16,
        color: '#6B7280',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    notificationButton: {
        position: 'relative',
        width: 40,
        height: 40,
        backgroundColor: '#EEF0FB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationCount: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
        justifyContent: 'space-between',
    },
    quickActionButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    quickActionLabel: {
        fontSize: 14,
        textAlign: 'center', // Ensure text is centered
        fontWeight: '600',
        color: '#1F2937',
    },
    semesterCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    semesterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    semesterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    semesterSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    statusBadge: {
        backgroundColor: '#EEF0FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6C63FF',
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    progressInfo: {
        marginLeft: 16,
        flex: 1,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    progressStats: {
        fontSize: 14,
        color: '#6B7280',
    },
    coursesContainer: {
        gap: 12,
    },
    courseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    courseInfo: {
        flex: 1,
    },
    courseCode: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    courseName: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    courseStatus: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    courseStatusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    eventsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    eventsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    eventsHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    eventCount: {
        backgroundColor: '#EEF0FB',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    eventCountText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6C63FF',
    },
    eventsContent: {
        overflow: 'hidden',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    eventIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    eventTime: {
        fontSize: 12,
        color: '#6B7280',
    },
    eventAction: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginLeft: 12,
    },
    eventActionText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
    attendanceCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    attendanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    attendanceStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    attendanceStat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    calendarCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    calendarTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    selectedDateEvents: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    selectedDateTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    calendarEventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
    },
    eventDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    calendarEventInfo: {
        flex: 1,
    },
    calendarEventTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 4,
    },
    calendarEventTime: {
        fontSize: 12,
        color: '#6B7280',
    },

    // Styles for Performance Overview
    performanceCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    performanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    performanceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    metricToggle: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 4,
    },
    metricButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    metricButtonActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    metricButtonText: {
        fontSize: 14,
        color: '#6B7280',
    },
    metricButtonTextActive: {
        color: '#1F2937',
        fontWeight: '500',
    },
    performanceContent: {
        alignItems: 'center',
    },
    performanceMetrics: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainMetric: {
        alignItems: 'center',
    },
    mainMetricValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    mainMetricLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    performanceChart: {
        marginLeft: 16,
        borderRadius: 16,
    },

    // Styles for Resource Center
    resourcesCard: {
        margin: 16,
    },
    resourcesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    resourcesScroll: {
        paddingRight: 16,
    },
    resourceItem: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginRight: 16,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resourceIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    resourceDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
    },
    resourceAccess: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        padding: 12,
    },
    resourceAccessText: {
        color: 'white',
        fontWeight: '500',
        marginRight: 8,
    },

    // Styles for Progress Insights
    insightsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        margin: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    insightsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    insightContent: {
        alignItems: 'center',
        marginBottom: 16,
    },
    insightMainValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
        marginBottom: 8,
    },
    insightDescription: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 12,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        marginLeft: 8,
        fontSize: 14,
    },
    insightIndicators: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: '#6C63FF',
    },
    quickActionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    quickActionWrapper: {
        width: '48%', // Two columns with some spacing
        marginVertical: 8,
    },
    

});


export default StudentDashboardScreen;