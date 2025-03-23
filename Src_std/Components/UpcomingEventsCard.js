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

const UpcomingEventsCard = ({ events }) => {
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    const getEventIcon = (type) => {
        switch (type) {
            case 'exam': return 'file-alt';
            case 'assignment': return 'tasks';
            case 'event': return 'calendar-alt';
            default: return 'bell';
        }
    };

    const getEventColor = (type) => {
        switch (type) {
            case 'exam': return '#EF4444';
            case 'assignment': return '#F59E0B';
            case 'event': return '#6C63FF';
            default: return '#6B7280';
        }
    };

    return (
        <View style={styles.eventsCard}>
            <TouchableOpacity
                style={styles.eventsHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.eventsHeaderLeft}>
                    <Text style={styles.eventsTitle}>Upcoming Events</Text>
                    <View style={styles.eventCount}>
                        <Text style={styles.eventCountText}>{events.length}</Text>
                    </View>
                </View>
                <MaterialIcons
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#6B7280"
                />
            </TouchableOpacity>

            <Animated.View style={[
                styles.eventsContent,
                {
                    maxHeight: heightAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 1000]
                    })
                }
            ]}>
                {events.map((event, index) => (
                    <View key={index} style={styles.eventItem}>
                        <View style={[
                            styles.eventIcon,
                            { backgroundColor: `${getEventColor(event.type)}20` }
                        ]}>
                            <FontAwesome5
                                name={getEventIcon(event.type)}
                                size={16}
                                color={getEventColor(event.type)}
                            />
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventTime}>{event.time}</Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.eventAction,
                                { backgroundColor: getEventColor(event.type) }
                            ]}
                        >
                            <Text style={styles.eventActionText}>View</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};
export default UpcomingEventsCard;