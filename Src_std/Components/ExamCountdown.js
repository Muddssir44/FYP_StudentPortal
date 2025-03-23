import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Animated,

} from 'react-native';
import { styles } from '../Screens/StudentExamScheduleScreen';

// Exam Countdown Component
const ExamCountdown = ({ nextExam }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const examDate = new Date(nextExam.date + "T" + nextExam.slots[0].time.split(" - ")[0]);
        const now = new Date();
        const difference = examDate - now;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60)
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const scaleAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.05,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }, [timeLeft.minutes]);

    return (
        <Animated.View style={[styles.countdownContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.nextExamTitle}>Next Exam</Text>
            <Text style={styles.nextExamCourse}>{nextExam.slots[0].course}</Text>
            <View style={styles.timeContainer}>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeValue}>{timeLeft.days}</Text>
                    <Text style={styles.timeLabel}>Days</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeValue}>{timeLeft.hours}</Text>
                    <Text style={styles.timeLabel}>Hours</Text>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeBlock}>
                    <Text style={styles.timeValue}>{timeLeft.minutes}</Text>
                    <Text style={styles.timeLabel}>Mins</Text>
                </View>
            </View>
        </Animated.View>
    );
};
export default ExamCountdown;