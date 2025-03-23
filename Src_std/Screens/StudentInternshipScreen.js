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
import InternshipCard from '../Components/InternshipCard';
import QuickFilters from '../Components/QuickFilters';
import StatusBadge from '../Components/StatusBadge';
import SpringFadeIn from '../Components/SpringFadeIn';



// Main Internship Screen
const StudentInternshipScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredInternships, setFilteredInternships] = useState(internships || []);

    // ... continuing from previous part

    const [showFilters, setShowFilters] = useState(false);
    const filterSheetAnim = useRef(new Animated.Value(0)).current;
    const searchInputRef = useRef(null);
    const searchTimeout = useRef(null); 

    const internships = [
        {
            id: 1,
            company: 'Tech Innovators',
            title: 'Frontend Developer Intern',
            status: 'Active',
            location: 'Remote',
            duration: '6 months',
            stipend: '$2000/month',
            positions: 3,
            requirements: 'React, JavaScript, CSS',
            deadline: 'March 15, 2025',
            postedDate: '2 days ago',
            type: 'Full-time'
        },
        {
            id: 2,
            company: 'Data Systems',
            title: 'Data Science Intern',
            status: 'Upcoming',
            location: 'New York, NY',
            duration: '3 months',
            stipend: '$2500/month',
            positions: 2,
            requirements: 'Python, SQL, Machine Learning',
            deadline: 'March 20, 2025',
            postedDate: '1 week ago',
            type: 'Full-time'
        },
        {
            id: 3,
            company: 'Cloud Solutions',
            title: 'DevOps Engineering Intern',
            status: 'Active',
            location: 'Remote',
            duration: '4 months',
            stipend: '$1800/month',
            positions: 5,
            requirements: 'AWS, Docker, Linux',
            deadline: 'March 25, 2025',
            postedDate: '3 days ago',
            type: 'Part-time'
        }
    ];
    const handleSearch = (query) => {
        // Debouncing the search to prevent UI lag

        
        setSearchQuery(query);
        
        searchTimeout.current = setTimeout(() => {
            const filtered = internships.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.company.toLowerCase().includes(query.toLowerCase()) ||
                item.requirements.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredInternships(filtered);
        }, 300); // 300ms delay for smoother experience
    };

    const handleFilterChange = (filterType) => {
        setActiveFilter(filterType);
        let filtered = [...internships];

        switch (filterType) {
            case 'fulltime':
                filtered = internships.filter(item => item.type === 'Full-time');
                break;
            case 'remote':
                filtered = internships.filter(item => item.location === 'Remote');
                break;
            case 'active':
                filtered = internships.filter(item => item.status === 'Active');
                break;
            default:
                filtered = internships;
        }

        setFilteredInternships(filtered);
    };

    const handleSaveInternship = (internship) => {
        // Implementation for saving internship
        console.log('Saved internship:', internship.id);
    };

    const toggleFilterSheet = () => {
        const toValue = showFilters ? 0 : 1;
        setShowFilters(!showFilters);

        Animated.spring(filterSheetAnim, {
            toValue,
            tension: 30,
            friction: 8,
            useNativeDriver: true,
        }).start();
    };

    // Advanced Filter Sheet Component
// Updated FilterSheet component to fix blinking issues
const FilterSheet = () => {
    const translateY = filterSheetAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0],
    });

    // Use useNativeDriver with opacity and transform for better performance
    return (
        <Animated.View
            style={[
                styles.filterSheet,
                { 
                    transform: [{ translateY }],
                    // Adding opacity for smoother transitions
                    opacity: filterSheetAnim
                }
            ]}
        >
            {/* Rest of component remains the same */}
            <View style={styles.filterSheetHeader}>
                <Text style={styles.filterSheetTitle}>Advanced Filters</Text>
                <TouchableOpacity
                    onPress={toggleFilterSheet}
                    style={styles.closeButton}
                >
                    <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterContent}>
                <FilterSection
                    title="Internship Type"
                    options={['Full-time', 'Part-time', 'Remote']}
                />
                <FilterSection
                    title="Duration"
                    options={['1-3 months', '3-6 months', '6+ months']}
                />
                <FilterSection
                    title="Stipend Range"
                    options={['$0-1000', '$1000-2000', '$2000+']}
                />

                <View style={styles.filterActions}>
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={() => {
                            // Reset filters logic
                            toggleFilterSheet();
                        }}
                    >
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => {
                            // Apply filters logic
                            toggleFilterSheet();
                        }}
                    >
                        <Text style={styles.applyButtonText}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animated.View>
    );
};

    // Filter Section Component for Filter Sheet
    const FilterSection = ({ title, options }) => (
        <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>{title}</Text>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.filterOption}
                >
                    <View style={styles.checkbox} />
                    <Text style={styles.filterOptionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <CustomHeader
                title="Internship Opportunities"
                showSearch={false}
                showRefresh={false}
            />

            <View style={[styles.content]}>
                <FlatList
                    ListHeaderComponent={() => (
                        <View>
                                <View style={styles.searchBar}>
                                    <Search size={20} color="#666" style={styles.searchIcon} />
                                    <TextInput
                                        ref={searchInputRef}
                                        placeholder="Search internships, companies, skills..."
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                        style={styles.searchInput}
                                        placeholderTextColor="#999"
                                    />
                                    <TouchableOpacity
                                        onPress={toggleFilterSheet}
                                        style={styles.filterButton}
                                    >
                                        <FilterIcon size={20} color="#6C63FF" />
                                    </TouchableOpacity>
                                </View>

                                <QuickFilters
                                    onFilterChange={handleFilterChange}
                                    activeFilter={activeFilter}
                                />

                                <View style={styles.resultsHeader}>
                                    <Text style={styles.resultsCount}>
                                        {filteredInternships.length} opportunities found
                                    </Text>
                                    <TouchableOpacity style={styles.sortButton}>
                                        <Text style={styles.sortButtonText}>Sort by: Recent</Text>
                                        <ChevronRight size={16} color="#6B7280" />
                                    </TouchableOpacity>
                                </View>
                        </View>
                    )}
                    data={filteredInternships}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <InternshipCard
                            item={item}
                            onPress={(internship) => {
                                navigation.navigate('InternshipDetailScreen', { internship });
                            }}
                            onSave={handleSaveInternship}
                            index={index}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                No internships found matching your criteria
                            </Text>
                        </View>
                    )}
                />
            </View>

            {showFilters && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleFilterSheet}
                >
                    <FilterSheet />
                </TouchableOpacity>
            )}
        </View>
    );
};
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    searchBar: {
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
    filterButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    quickFiltersContainer: {
        marginBottom: 16,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 24,
        marginRight: 12,
    },
    filterChipActive: {
        backgroundColor: '#6C63FF',
    },
    filterIcon: {
        marginRight: 8,
    },
    filterLabel: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    filterLabelActive: {
        color: '#FFFFFF',
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    resultsCount: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    sortButtonText: {
        color: '#6B7280',
        fontSize: 14,
        marginRight: 4,
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    cardContainer: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    companyInitials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6C63FF',
    },
    headerInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusActive: {
        backgroundColor: '#DEF7EC',
    },
    statusUpcoming: {
        backgroundColor: '#FEF3C7',
    },
    statusDefault: {
        backgroundColor: '#F3F4F6',
    },
    // Additional styles for new components
    // Company Header Styles
    companyHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    companyLogoContainer: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    companyLogoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C63FF',
    },
    companyInfoContainer: {
        flex: 1,
    },
    companyHeaderName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    companyStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    statText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 6,
    },
    
    // Internship Overview Styles
    overviewContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    overviewTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    keyDetailsContainer: {
        marginTop: 16,
    },
    keyDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    keyDetailText: {
        fontSize: 16,
        color: '#4B5563',
        marginLeft: 12,
    },
    deadlineHighlight: {
        color: '#EF4444',
        fontWeight: '500',
    },
    
    // Section Container Styles
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4B5563',
    },
    
    // Requirements/Benefits List Styles
    requirementsList: {
        marginTop: 8,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bulletPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#6C63FF',
        marginTop: 6,
        marginRight: 12,
    },
    requirementText: {
        flex: 1,
        fontSize: 16,
        color: '#4B5563',
    },
    benefitsList: {
        marginTop: 8,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    benefitText: {
        flex: 1,
        fontSize: 16,
        color: '#4B5563',
    },
    
    // Action Buttons
    actionButtons: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6C63FF',
        marginRight: 12,
        flex: 1,
    },
    saveButtonText: {
        marginLeft: 8,
        color: '#6C63FF',
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    
    // Application Form Styles
    formContent: {
        padding: 16,
    },
    applicationForm: {
        borderRadius: 16,
        backgroundColor: 'white',
        padding: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 4,
    },
    activeStepDot: {
        backgroundColor: '#6C63FF',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    completedStepDot: {
        backgroundColor: '#A5B4FC',
    },
    formStep: {
        marginBottom: 16,
    },
    formStepTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    formField: {
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4B5563',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1F2937',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    uploadContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 16,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        backgroundColor: '#EEF2FF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 8,
    },
    uploadButtonText: {
        color: '#6C63FF',
        fontWeight: '500',
    },
    uploadHelp: {
        fontSize: 14,
        color: '#6B7280',
    },
    stepNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    nextButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 8,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    backButton: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 8,
    },
    backButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#10B981',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 8,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    
    // Success Screen Styles
    successContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'white',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    successMessage: {
        fontSize: 16,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 32,
    },
    successActions: {
        width: '100%',
    },
    viewApplicationButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12,
    },
    viewApplicationText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    detailContent: {
        padding: 16,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    saveButton: {
        padding: 8,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 12,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#4B5563',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    skillText: {
        marginLeft: 6,
        fontSize: 12,
        color: '#6C63FF',
        fontWeight: '500',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
    },
    deadline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deadlineText: {
        marginLeft: 6,
        fontSize: 12,
        color: '#EF4444',
        fontWeight: '500',
    },
    postedDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 8,
        maxHeight: Dimensions.get('window').height * 0.8,
    },
    filterSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    filterSheetTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#6B7280',
    },
    filterContent: {
        padding: 16,
    },
    filterSection: {
        marginBottom: 24,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 12,
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        marginRight: 12,
    },
    filterOptionText: {
        fontSize: 14,
        color: '#4B5563',
    },
    filterActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    resetButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6C63FF',
        marginRight: 12,
    },
    resetButtonText: {
        color: '#6C63FF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    applyButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#6C63FF',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
});



export default StudentInternshipScreen;
