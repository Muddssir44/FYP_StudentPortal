
import React from 'react';
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
import { styles } from '../Screens/StudentInternshipScreen';
const QuickFilters = ({ onFilterChange, activeFilter }) => {
    const filters = [
        { id: 'all', label: 'All Internships', icon: Briefcase },
        { id: 'fulltime', label: 'Full-time', icon: Clock },
        { id: 'remote', label: 'Remote', icon: MapPin },
        { id: 'active', label: 'Active', icon: Calendar }
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickFiltersContainer}
        >
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                    <TouchableOpacity
                        key={filter.id}
                        onPress={() => onFilterChange(filter.id)}
                        style={[
                            styles.filterChip,
                            isActive && styles.filterChipActive
                        ]}
                    >
                        <Icon
                            size={16}
                            color={isActive ? '#FFFFFF' : '#6B7280'}
                            style={styles.filterIcon}
                        />
                        <Text style={[
                            styles.filterLabel,
                            isActive && styles.filterLabelActive
                        ]}>
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};
export default QuickFilters;