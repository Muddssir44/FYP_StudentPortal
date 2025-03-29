import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,

} from 'react-native';
import { Header } from '../Components/Header';
import {


    Filter as FilterIcon,
    BookmarkPlus,


} from 'lucide-react-native';
import { CompanyHeader } from '../Components/Layout_InternDetailScreen';
import { JobDescription } from '../Components/Layout_InternDetailScreen';
import { InternshipOverview } from '../Components/Layout_InternDetailScreen';
import { RequirementsSection } from '../Components/Layout_InternDetailScreen';
import { BenefitsSection } from '../Components/Layout_InternDetailScreen';
import { styles } from './StudentInternshipScreen';


const InternshipDetailScreen = ({ route, navigation }) => {
    const { internship } = route.params;

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <View style={styles.detailContent}>
                    <CompanyHeader company={internship.company} />
                    <InternshipOverview internship={internship} />
                    <JobDescription internship={internship} />
                    <RequirementsSection internship={internship} />
                    <BenefitsSection internship={internship} />

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => handleSaveInternship(internship)}
                        >
                            <BookmarkPlus size={20} color="#6C63FF" />
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => navigation.navigate('InternshipApplicationScreen', { internship })}
                        >
                            <Text style={styles.applyButtonText}>Quick Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default InternshipDetailScreen;