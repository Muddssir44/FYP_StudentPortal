// FilterBar Component
import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    FlatList,
    Animated,
    TouchableOpacity,

} from 'react-native';

import {
    BookOpen,
    Bell,
    Filter,
    
} from 'lucide-react-native';
import { styles } from '../Screens/StudentNewsScreen';

const FilterBar = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const filters = [
        { id: 'all', label: 'All News', icon: BookOpen },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'alerts', label: 'Alerts', icon: Filter },
    ];

    return (
        <Animated.View style={[styles.filterBarContainer, { opacity: fadeAnim }]}>
            <FlatList
                horizontal
                data={filters}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const Icon = item.icon;
                    const isActive = activeFilter === item.id;
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setActiveFilter(item.id);
                                onFilterChange(item.id);
                            }}
                            style={[
                                styles.filterButton,
                                isActive && styles.filterButtonActive
                            ]}
                        >
                            <Icon
                                size={16}
                                color={isActive ? 'white' : '#666'}
                                style={styles.filterIcon}
                            />
                            <Text style={[
                                styles.filterText,
                                isActive && styles.filterTextActive
                            ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={styles.filterList}
            />
        </Animated.View>
    );
};
export default FilterBar;