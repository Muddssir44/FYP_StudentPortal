import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Animated,
    ActivityIndicator,
    StyleSheet,
    Platform,
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Search,

    Calendar as CalendarIcon,

} from 'lucide-react-native';
import EventFilterBar from '../Components/EventFilterBar';
import EventCard from '../Components/EventCard';
import { FadeInView3 } from '../Components/EventCard';

// Main EventsScreen Component
const EventsScreen = () => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null);

    const events = [
        {
            id: 1,
            title: 'Tech Conference 2025',
            description: 'Annual technology conference featuring industry speakers, workshops, and networking opportunities for students interested in tech careers.',
            date: '2025-03-15',
            time: '09:00',
            venue: 'Main Auditorium',
            organizer: 'CS Department',
            maxParticipants: '200',
            registrationDeadline: '2025-03-10',
            eventType: 'Conference',
            image: null
        },
        {
            id: 2,
            title: 'Career Development Workshop',
            description: 'Interactive workshop focusing on resume building, interview skills, and professional networking. Bring your resume for personalized feedback.',
            date: '2025-03-22',
            time: '14:00',
            venue: 'Business Building, Room 302',
            organizer: 'Career Services',
            maxParticipants: '50',
            registrationDeadline: '2025-03-18',
            eventType: 'Workshop',
            image: null
        },
        {
            id: 3,
            title: 'Environmental Science Seminar',
            description: 'Guest lecture by Dr. Jane Chen on climate change research and sustainable practices in urban environments.',
            date: '2025-04-05',
            time: '15:30',
            venue: 'Science Hall',
            organizer: 'Environmental Studies Dept',
            maxParticipants: '100',
            registrationDeadline: '2025-04-02',
            eventType: 'Seminar',
            image: null
        },
        {
            id: 4,
            title: 'Spring Cultural Festival',
            description: 'Annual celebration featuring performances, art exhibitions, and food from diverse cultural backgrounds. Join us to celebrate diversity on campus!',
            date: '2025-04-15',
            time: '11:00',
            venue: 'University Quad',
            organizer: 'Student Cultural Association',
            maxParticipants: '500',
            registrationDeadline: '2025-04-10',
            eventType: 'Cultural',
            image: null
        },
        {
            id: 5,
            title: 'AI Research Symposium',
            description: 'Graduate students and faculty present their latest research in artificial intelligence and machine learning applications.',
            date: '2025-03-28',
            time: '10:00',
            venue: 'Engineering Building',
            organizer: 'AI Research Lab',
            maxParticipants: '150',
            registrationDeadline: '2025-03-25',
            eventType: 'Conference',
            image: null
        },
        {
            id: 6,
            title: 'Financial Literacy Workshop',
            description: 'Learn essential skills for managing student loans, budgeting, and planning for your financial future after graduation.',
            date: '2025-04-08',
            time: '16:00',
            venue: 'Student Center',
            organizer: 'Finance Department',
            maxParticipants: '75',
            registrationDeadline: '2025-04-05',
            eventType: 'Workshop',
            image: null
        }
    ];

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = events.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.organizer.toLowerCase().includes(query.toLowerCase()) ||
            item.venue.toLowerCase().includes(query.toLowerCase()) ||
            item.eventType.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    const handleFilter = (filterType) => {
        setLoading(true);
        setTimeout(() => {
            let filtered = [...events];
            if (filterType === 'upcoming') {
                const today = new Date();
                filtered = events.filter(item => new Date(item.date) >= today);
            } else if (filterType !== 'all') {
                filtered = events.filter(item =>
                    item.eventType.toLowerCase() === filterType.toLowerCase()
                );
            }
            setFilteredEvents(filtered);
            setLoading(false);
        }, 500);
    };

    const handleEventPress = (item) => {
        // Navigation to event detail screen would go here
        console.log('Pressed event item:', item.id);
    };

    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="Campus Events"
                subtitle="Discover and register for upcoming events"
            />

            <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
                <FadeInView3>
                    <View style={styles.searchContainer}>
                        <Search size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            ref={searchInputRef}
                            placeholder="Search events by title, venue, or type..."
                            value={searchQuery}
                            onChangeText={handleSearch}
                            style={styles.searchInput}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <EventFilterBar onFilterChange={handleFilter} />

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#2196F3" />
                            <Text style={styles.loadingText}>Loading events...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredEvents}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <EventCard
                                    item={item}
                                    onPress={handleEventPress}
                                    index={index}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.eventsList,
                                { paddingBottom: insets.bottom + 16 }
                            ]}
                            ListEmptyComponent={() => (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>
                                        No events found matching your search
                                    </Text>
                                </View>
                            )}
                        />
                    )}
                </FadeInView3>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
        paddingVertical: 8,
    },
    filterBarContainer: {
        marginBottom: 16,
    },
    filterList: {
        paddingRight: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 24,
        marginRight: 12,
    },
    filterButtonActive: {
        backgroundColor: '#2196F3',
    },
    filterIcon: {
        marginRight: 8,
    },
    filterText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    filterTextActive: {
        color: 'white',
    },
    eventCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    eventCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    eventTypeBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    conferenceBadge: {
        backgroundColor: '#2196F3', // Blue
    },
    workshopBadge: {
        backgroundColor: '#4CAF50', // Green
    },
    seminarBadge: {
        backgroundColor: '#9C27B0', // Purple
    },
    culturalBadge: {
        backgroundColor: '#FF9800', // Orange
    },
    defaultEventBadge: {
        backgroundColor: '#607D8B', // Blue Grey
    },
    eventTypeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    eventStatusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    openBadge: {
        backgroundColor: '#4CAF50', // Green
    },
    closedBadge: {
        backgroundColor: '#F44336', // Red
    },
    almostFullBadge: {
        backgroundColor: '#FF9800', // Orange
    },
    eventStatusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
        lineHeight: 24,
    },
    eventDescription: {
        color: '#444',
        marginBottom: 12,
        lineHeight: 20,
    },
    eventDetailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    eventDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
    },
    eventDetailIcon: {
        marginRight: 4,
    },
    eventDetailText: {
        color: '#444',
        fontSize: 14,
    },
    eventCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    deadlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deadlineText: {
        color: '#666',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
    },
    loadingText: {
        marginTop: 8,
        color: '#666',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
    },
    eventsList: {
        paddingTop: 8,
    },
});

export default EventsScreen;