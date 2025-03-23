

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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
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
import {styles} from '../Screens/StudentInternshipScreen'; // Adjust path if needed

const SuccessAnimation = () => {
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            })
        ]).start();
    }, []);
    
    // Simple checkmark SVG-like component
    return (
        <Animated.View style={{
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#6C63FF',
            marginBottom: 24
        }}>
            <View style={{
                width: 40,
                height: 20,
                borderBottomWidth: 6,
                borderLeftWidth: 6,
                borderColor: 'white',
                transform: [{ rotate: '-45deg' }],
                marginTop: -10
            }} />
        </Animated.View>
    );
};

const ApplicationSuccessScreen = ({ route, navigation }) => {
    const { internship, applicationId } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.successContent}>
                <SuccessAnimation />
                <Text style={styles.successTitle}>Application Submitted!</Text>
                <Text style={styles.successMessage}>
                    Your application for {internship.title} at {internship.company} has been submitted successfully.
                </Text>
                <View style={styles.successActions}>
                    <TouchableOpacity
                        style={styles.viewApplicationButton}
                        onPress={() => navigation.navigate('MyApplications')}
                    >
                        <Text style={styles.viewApplicationText}>View My Applications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('InternshipList')}
                    >
                        <Text style={styles.backButtonText}>Back to Internships</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default ApplicationSuccessScreen;