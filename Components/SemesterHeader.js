import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StyleSheet
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import CircularProgress from '../Components/CircularProgress';
import { styles } from '../Screens/MyCoursesScreen';


const SemesterHeader = ({ semester }) => {
    return (
        <View style={styles.semesterHeader}>
            <View style={styles.semesterInfo}>
                <Text style={styles.semesterTitle}>
                    Semester {semester.number}
                </Text>
                {semester.completed && (
                    <View style={styles.gpaContainer}>
                        <Text style={styles.gpaLabel}>GPA</Text>
                        <Text style={styles.gpaValue}>{semester.gpa.toFixed(2)}</Text>
                    </View>
                )}
            </View>
            <View style={styles.semesterProgress}>
                <View style={styles.progressLine}>
                    <View style={[
                        styles.progressFill,
                        { width: semester.completed ? '100%' : '0%' }
                    ]} />
                </View>
                <Text style={styles.progressText}>
                    {semester.completed ? 'Completed' : 'In Progress'}
                </Text>
            </View>
        </View>
    );
};
export default SemesterHeader;