
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
import StatusBadge from './StatusBadge';
const InternshipCard = ({ item, onPress, onSave, index }) => {
    const [isSaved, setIsSaved] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start(() => onPress(item));
    };

    return (
        <SpringFadeIn delay={index * 100}>
            <Animated.View style={[
                styles.cardContainer,
                { transform: [{ scale: scaleAnim }] }
            ]}>
                <TouchableOpacity
                    onPress={handlePress}
                    activeOpacity={0.9}
                    style={styles.card}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.companyBadge}>
                            <Text style={styles.companyInitials}>
                                {item.company.split(' ').map(word => word[0]).join('')}
                            </Text>
                        </View>
                        <View style={styles.headerInfo}>
                            <Text style={styles.companyName}>{item.company}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setIsSaved(!isSaved);
                                onSave(item);
                            }}
                            style={styles.saveButton}
                        >
                            <BookmarkPlus
                                size={20}
                                color={isSaved ? '#6C63FF' : '#6B7280'}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.jobTitle}>{item.title}</Text>

                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <MapPin size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.location}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Clock size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.duration}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <DollarSign size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.stipend}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Users size={16} color="#6B7280" />
                            <Text style={styles.detailText}>{item.positions} positions</Text>
                        </View>
                    </View>

                    <View style={styles.skillsContainer}>
                        {item.requirements.split(', ').map((skill, index) => (
                            <View key={index} style={styles.skillChip}>
                                <Tag size={12} color="#6C63FF" />
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.cardFooter}>
                        <View style={styles.deadline}>
                            <Calendar size={14} color="#EF4444" />
                            <Text style={styles.deadlineText}>
                                Apply by {item.deadline}
                            </Text>
                        </View>
                        <Text style={styles.postedDate}>{item.postedDate}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </SpringFadeIn>
    );
};
export default InternshipCard;