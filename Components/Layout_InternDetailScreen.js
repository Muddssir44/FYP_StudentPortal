import React from 'react';
import {
    View,
    Text,

} from 'react-native';
import {

    MapPin,
    Clock,
    DollarSign,
    Calendar,
    Users,
    Filter as FilterIcon,
    Building2,

} from 'lucide-react-native';
import {styles} from '../Screens/StudentInternshipScreen'; 
import SpringFadeIn from '../Components/SpringFadeIn';
import StatusBadge from '../Components/StatusBadge';



export const CompanyHeader = ({ company }) => {
    return (
        <SpringFadeIn>
            <View style={styles.companyHeaderContainer}>
                <View style={styles.companyLogoContainer}>
                    <Text style={styles.companyLogoText}>
                        {company.split(' ').map(word => word[0]).join('')}
                    </Text>
                </View>
                <View style={styles.companyInfoContainer}>
                    <Text style={styles.companyHeaderName}>{company}</Text>
                    <View style={styles.companyStats}>
                        <View style={styles.statItem}>
                            <Building2 size={14} color="#6B7280" />
                            <Text style={styles.statText}>Since 2015</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Users size={14} color="#6B7280" />
                            <Text style={styles.statText}>50-200 employees</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SpringFadeIn>
    );
};

export const InternshipOverview = ({ internship }) => {
    return (
        <SpringFadeIn delay={100}>
            <View style={styles.overviewContainer}>
                <Text style={styles.overviewTitle}>{internship.title}</Text>
                <StatusBadge status={internship.status} />
                
                <View style={styles.keyDetailsContainer}>
                    <View style={styles.keyDetailItem}>
                        <MapPin size={18} color="#6B7280" />
                        <Text style={styles.keyDetailText}>{internship.location}</Text>
                    </View>
                    <View style={styles.keyDetailItem}>
                        <Clock size={18} color="#6B7280" />
                        <Text style={styles.keyDetailText}>{internship.duration}</Text>
                    </View>
                    <View style={styles.keyDetailItem}>
                        <DollarSign size={18} color="#6B7280" />
                        <Text style={styles.keyDetailText}>{internship.stipend}</Text>
                    </View>
                    <View style={styles.keyDetailItem}>
                        <Calendar size={18} color="#EF4444" />
                        <Text style={[styles.keyDetailText, styles.deadlineHighlight]}>
                            Apply by {internship.deadline}
                        </Text>
                    </View>
                </View>
            </View>
        </SpringFadeIn>
    );
};

export const JobDescription = ({ internship }) => {
    // Sample description since it's not in the original data
    const description = "As a " + internship.title + " at " + internship.company + 
        ", you will work closely with our development team to build innovative solutions. " +
        "This internship offers hands-on experience with industry-standard tools and practices. " +
        "You'll collaborate with experienced professionals and contribute to real-world projects.";
    
    return (
        <SpringFadeIn delay={200}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Job Description</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
        </SpringFadeIn>
    );
};

export const RequirementsSection = ({ internship }) => {
    const requirements = internship.requirements.split(', ');
    
    return (
        <SpringFadeIn delay={300}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Requirements</Text>
                <View style={styles.requirementsList}>
                    {requirements.map((req, index) => (
                        <View key={index} style={styles.requirementItem}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.requirementText}>{req}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SpringFadeIn>
    );
};

export const BenefitsSection = ({ internship }) => {
    // Sample benefits
    const benefits = [
        "Flexible working hours",
        "Professional development opportunities",
        "Networking events",
        "Certificate upon completion"
    ];
    
    return (
        <SpringFadeIn delay={400}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Benefits</Text>
                <View style={styles.benefitsList}>
                    {benefits.map((benefit, index) => (
                        <View key={index} style={styles.benefitItem}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.benefitText}>{benefit}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SpringFadeIn>
    );
};