import React, { useState} from 'react';
import {
    View,

    ScrollView,

} from 'react-native';
import { Header } from '../Components/Header';
import {styles} from '../Screens/StudentInternshipScreen';
import { ApplicationForm } from '../Components/ApplicationForm';



const InternshipApplicationScreen = ({ route, navigation }) => {
    const { internship } = route.params;
    const [formData, setFormData] = useState({
        resumeUrl: '',
        coverLetter: '',
        portfolioUrl: '',
        availability: '',
    });

    const handleSubmit = async () => {
        try {
            // Submit application logic here
            navigation.navigate('ApplicationSuccessScreen', {
                internship,
                applicationId: 'some-id'
            });
        } catch (error) {
            // Handle error
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <View style={styles.formContent}>
                    <ApplicationForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
export default InternshipApplicationScreen;
