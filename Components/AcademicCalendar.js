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

const AcademicCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    // Mock calendar events
    const markedDates = {
        '2025-02-20': { marked: true, dotColor: '#EF4444', type: 'exam' },
        '2025-02-22': { marked: true, dotColor: '#F59E0B', type: 'assignment' },
        '2025-02-25': { marked: true, dotColor: '#6C63FF', type: 'event' },
        [selectedDate]: { selected: true, selectedColor: '#6C63FF' }
    };

    const events = {
        '2025-02-20': [{ type: 'exam', title: 'Database Systems Mid-Term', time: '09:00 AM' }],
        '2025-02-22': [{ type: 'assignment', title: 'Networks Lab Report Due', time: '11:59 PM' }],
        '2025-02-25': [{ type: 'event', title: 'Career Fair', time: '02:00 PM' }]
    };

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    return (
        <View style={styles.calendarCard}>
            <TouchableOpacity
                style={styles.calendarHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={styles.calendarTitle}>Academic Calendar</Text>
                <MaterialIcons
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#6B7280"
                />
            </TouchableOpacity>

            <Animated.View style={{
                maxHeight: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 500]
                }),
                overflow: 'hidden'
            }}>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={day => setSelectedDate(day.dateString)}
                    theme={{
                        todayTextColor: '#6C63FF',
                        selectedDayBackgroundColor: '#6C63FF',
                        dotColor: '#6C63FF',
                        arrowColor: '#6C63FF',
                    }}
                />

                {events[selectedDate] && (
                    <View style={styles.selectedDateEvents}>
                        <Text style={styles.selectedDateTitle}>
                            {moment(selectedDate).format('MMMM D, YYYY')}
                        </Text>
                        {events[selectedDate].map((event, index) => (
                            <View key={index} style={styles.calendarEventItem}>
                                <View style={[
                                    styles.eventDot,
                                    { backgroundColor: getEventColor(event.type) }
                                ]} />
                                <View style={styles.calendarEventInfo}>
                                    <Text style={styles.calendarEventTitle}>{event.title}</Text>
                                    <Text style={styles.calendarEventTime}>{event.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </Animated.View>
        </View>
    );
};
export default AcademicCalendar;