import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,

} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../Screens/StudentExamScheduleScreen';



const ExamCard = ({ exam, slot, isNextExam }) => {
    const [expanded, setExpanded] = useState(false);
    const rotateAnim = useState(new Animated.Value(0))[0];
    const heightAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.parallel([
            Animated.spring(rotateAnim, {
                toValue: expanded ? 1 : 0,
                useNativeDriver: true
            }),
            Animated.spring(heightAnim, {
                toValue: expanded ? 1 : 0,
                useNativeDriver: false
            })
        ]).start();
    }, [expanded]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return (
        <Animated.View style={[
            styles.examCard,
            isNextExam && styles.nextExamCard
        ]}>
            <TouchableOpacity
                style={styles.examCardHeader}
                onPress={() => setExpanded(!expanded)}
            >
                <View style={styles.examBasicInfo}>
                    <View style={styles.courseCodeContainer}>
                        <Text style={styles.courseCode}>{slot.courseCode}</Text>
                        <View style={[
                            styles.typeBadge,
                            { backgroundColor: slot.type === 'Theory' ? '#EEF0FB' : '#DCFCE7' }
                        ]}>
                            <FontAwesome5
                                name={slot.type === 'Theory' ? 'book' : 'flask'}
                                size={12}
                                color={slot.type === 'Theory' ? '#6C63FF' : '#22C55E'}
                            />
                            <Text style={[
                                styles.typeText,
                                { color: slot.type === 'Theory' ? '#6C63FF' : '#22C55E' }
                            ]}>
                                {slot.type}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.courseName}>{slot.course}</Text>
                    <View style={styles.timeVenueContainer}>
                        <View style={styles.infoItem}>
                            <FontAwesome5 name="clock" size={14} color="#6B7280" />
                            <Text style={styles.infoText}>{slot.time}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <FontAwesome5 name="map-marker-alt" size={14} color="#6B7280" />
                            <Text style={styles.infoText}>{slot.venue}</Text>
                        </View>
                    </View>
                </View>

                <Animated.View style={{ transform: [{ rotate }] }}>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="#6B7280"
                    />
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={[
                styles.examDetailsContainer,
                {
                    maxHeight: heightAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200]
                    }),
                    opacity: heightAnim
                }
            ]}>
                <View style={styles.examDetails}>
                    <View style={styles.detailItem}>
                        <FontAwesome5 name="calendar-alt" size={14} color="#6C63FF" />
                        <Text style={styles.detailText}>
                            {exam.day}, {new Date(exam.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <FontAwesome5 name="user-tie" size={14} color="#6C63FF" />
                        <Text style={styles.detailText}>
                            {slot.instructor}
                        </Text>
                    </View>
                    <View style={styles.importantNotesContainer}>
                        <Text style={styles.importantNotesTitle}>Important Notes:</Text>
                        <View style={styles.noteItem}>
                            <FontAwesome5 name="info-circle" size={14} color="#6C63FF" />
                            <Text style={styles.noteText}>Please arrive 30 minutes before the exam</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <FontAwesome5 name="id-card" size={14} color="#6C63FF" />
                            <Text style={styles.noteText}>Bring your student ID card</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    );
};
export default ExamCard;