import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,

} from 'react-native';

import {
    Calendar,
    ChevronRight,
    MapPin,
    Users,
    Clock,
    Calendar as CalendarIcon,
    User,

} from 'lucide-react-native';
import { styles } from '../Screens/EventsScreen';


const EventStatusBadge = ({ deadline, maxParticipants }) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    
    let statusText = "Open for Registration";
    let badgeStyle = styles.openBadge;
    
    if (today > deadlineDate) {
        statusText = "Registration Closed";
        badgeStyle = styles.closedBadge;
    } else if (parseInt(maxParticipants) < 20) { // Assuming almost full when less than 20 spots left
        statusText = "Almost Full";
        badgeStyle = styles.almostFullBadge;
    }
    
    return (
        <View style={[styles.eventStatusBadge, badgeStyle]}>
            <Text style={styles.eventStatusText}>{statusText}</Text>
        </View>
    );
};


const EventTypeBadge = ({ eventType }) => {
    const getBadgeColor = () => {
        switch (eventType.toLowerCase()) {
            case 'conference':
                return styles.conferenceBadge;
            case 'workshop':
                return styles.workshopBadge;
            case 'seminar':
                return styles.seminarBadge;
            case 'cultural':
                return styles.culturalBadge;
            default:
                return styles.defaultEventBadge;
        }
    };

    return (
        <View style={[styles.eventTypeBadge, getBadgeColor()]}>
            <Text style={styles.eventTypeText}>{eventType}</Text>
        </View>
    );
};

export const FadeInView3 = ({ children, delay = 0, duration = 500 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: duration,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: duration,
                delay: delay,
                useNativeDriver: true,
            })
        ]).start();
    }, [delay, duration]);

    return (
        <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY }]
        }}>
            {children}
        </Animated.View>
    );
};
const EventCard = ({ item, onPress, index }) => {
    // Format date and time for display
    const eventDate = new Date(item.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
    });
    
    return (
        <FadeInView3 delay={index * 100}>
            <TouchableOpacity
                onPress={() => onPress(item)}
                style={styles.eventCard}
                activeOpacity={0.7}
            >
                <View style={styles.eventCardHeader}>
                    <EventTypeBadge eventType={item.eventType} />
                    <EventStatusBadge 
                        deadline={item.registrationDeadline} 
                        maxParticipants={item.maxParticipants}
                    />
                </View>

                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDescription} numberOfLines={2}>
                    {item.description}
                </Text>

                <View style={styles.eventDetailsContainer}>
                    <View style={styles.eventDetailItem}>
                        <Calendar size={16} color="#2196F3" style={styles.eventDetailIcon} />
                        <Text style={styles.eventDetailText}>{formattedDate}</Text>
                    </View>
                    
                    <View style={styles.eventDetailItem}>
                        <Clock size={16} color="#2196F3" style={styles.eventDetailIcon} />
                        <Text style={styles.eventDetailText}>{item.time}</Text>
                    </View>
                    
                    <View style={styles.eventDetailItem}>
                        <MapPin size={16} color="#2196F3" style={styles.eventDetailIcon} />
                        <Text style={styles.eventDetailText}>{item.venue}</Text>
                    </View>
                </View>

                <View style={styles.eventDetailsContainer}>
                    <View style={styles.eventDetailItem}>
                        <User size={16} color="#666" style={styles.eventDetailIcon} />
                        <Text style={styles.eventDetailText}>{item.organizer}</Text>
                    </View>
                    
                    <View style={styles.eventDetailItem}>
                        <Users size={16} color="#666" style={styles.eventDetailIcon} />
                        <Text style={styles.eventDetailText}>Max: {item.maxParticipants}</Text>
                    </View>
                </View>

                <View style={styles.eventCardFooter}>
                    <View style={styles.deadlineContainer}>
                        <CalendarIcon size={14} color="#666" style={{ marginRight: 4 }} />
                        <Text style={styles.deadlineText}>
                            Register by: {new Date(item.registrationDeadline).toLocaleDateString()}
                        </Text>
                    </View>
                    <ChevronRight size={20} color="#2196F3" />
                </View>
            </TouchableOpacity>
        </FadeInView3>
    );
};
export default EventCard;