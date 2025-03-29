

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,

} from 'react-native';

import {styles} from '../Screens/StudentInternshipScreen'; // Adjust path if needed
import { SuccessAnimation } from '../Components/SuccessAnimation';



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
                        onPress={() => navigation.navigate('StudentInternshipScreen')}
                    >
                        <Text style={styles.viewApplicationText}>Back to Internships</Text>
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