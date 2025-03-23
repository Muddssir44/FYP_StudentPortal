import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';
import {
    Search,
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Calendar,
    Users,
    Filter as FilterIcon,
    BookmarkPlus,
    ChevronRight,
    Building2,
    Tag,
    searchTimeout,
    current
} from 'lucide-react-native';
import SpringFadeIn from './SpringFadeIn';
import { styles } from '../Screens/StudentInternshipScreen';
const StatusBadge = ({ status }) => {
    const getStatusStyle = () => {
        switch (status.toLowerCase()) {
            case 'active':
                return styles.statusActive;
            case 'upcoming':
                return styles.statusUpcoming;
            default:
                return styles.statusDefault;
        }
    };

    return (
        <View style={[styles.statusBadge, getStatusStyle()]}>
            <View style={[styles.statusDot, getStatusStyle()]} />
            <Text style={styles.statusText}>{status}</Text>
        </View>
    );
};
export default StatusBadge;