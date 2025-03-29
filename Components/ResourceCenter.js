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
const ResourceCenter = () => {
    const resources = [
        {
            type: 'library',
            title: 'Digital Library Access',
            description: 'Access to online journals and research papers',
            icon: 'book-reader'
        },
        {
            type: 'course',
            title: 'Course Materials',
            description: 'Lecture slides and reading materials',
            icon: 'file-pdf'
        },
        {
            type: 'tool',
            title: 'Development Tools',
            description: 'Software and tools for practical work',
            icon: 'tools'
        }
    ];

    const getResourceColor = (type) => {
        switch (type) {
            case 'library': return '#6C63FF';
            case 'course': return '#22C55E';
            case 'tool': return '#F59E0B';
            default: return '#6B7280';
        }
    };

    return (
        <View style={styles.resourcesCard}>
            <Text style={styles.resourcesTitle}>Resource Center</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.resourcesScroll}
            >
                {resources.map((resource, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.resourceItem}
                    >
                        <View style={[
                            styles.resourceIcon,
                            { backgroundColor: `${getResourceColor(resource.type)}20` }
                        ]}>
                            <FontAwesome5
                                name={resource.icon}
                                size={24}
                                color={getResourceColor(resource.type)}
                            />
                        </View>
                        <Text style={styles.resourceTitle}>{resource.title}</Text>
                        <Text style={styles.resourceDescription}>
                            {resource.description}
                        </Text>
                        <View style={[
                            styles.resourceAccess,
                            { backgroundColor: getResourceColor(resource.type) }
                        ]}>
                            <Text style={styles.resourceAccessText}>Access Now</Text>
                            <FontAwesome5 name="arrow-right" size={12} color="white" />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
export default ResourceCenter;