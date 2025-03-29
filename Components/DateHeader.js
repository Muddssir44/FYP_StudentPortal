import React from 'react';
import {
    View,
    Text

} from 'react-native';
import { styles } from '../Screens/StudentExamScheduleScreen';



const DateHeader = ({ date, day }) => {
    return (
        <View style={styles.dateHeader}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                    {new Date(date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </Text>
                <Text style={styles.dayText}>{day}</Text>
            </View>
            <View style={styles.dateLine} />
        </View>
    );
};
export default DateHeader;