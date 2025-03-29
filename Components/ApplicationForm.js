import React, { useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,

} from 'react-native';
import { styles } from '../Screens/StudentInternshipScreen';
import SpringFadeIn from '../Components/SpringFadeIn';


export const ApplicationForm = ({ formData, setFormData, onSubmit }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    
    const updateFormData = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };
    
    const renderStepIndicator = () => {
        return (
            <View style={styles.stepIndicator}>
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <View 
                        key={index}
                        style={[
                            styles.stepDot,
                            index + 1 === step ? styles.activeStepDot : null,
                            index + 1 < step ? styles.completedStepDot : null
                        ]}
                    />
                ))}
            </View>
        );
    };
    
    const renderStep1 = () => (
        <SpringFadeIn>
            <View style={styles.formStep}>
                <Text style={styles.formStepTitle}>Personal Information</Text>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Enter your full name"
                    />
                </View>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Enter your email address"
                        keyboardType="email-address"
                    />
                </View>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Phone Number</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={() => setStep(2)}
                >
                    <Text style={styles.nextButtonText}>Next: Qualifications</Text>
                </TouchableOpacity>
            </View>
        </SpringFadeIn>
    );
    
    const renderStep2 = () => (
        <SpringFadeIn>
            <View style={styles.formStep}>
                <Text style={styles.formStepTitle}>Qualifications</Text>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Education</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Degree, Major, University"
                    />
                </View>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Resume/CV</Text>
                    <View style={styles.uploadContainer}>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>Upload File</Text>
                        </TouchableOpacity>
                        <Text style={styles.uploadHelp}>PDF or DOCX (Max 5MB)</Text>
                    </View>
                </View>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Portfolio URL (Optional)</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="https://your-portfolio.com"
                        value={formData.portfolioUrl}
                        onChangeText={(text) => updateFormData('portfolioUrl', text)}
                    />
                </View>
                
                <View style={styles.stepNavigation}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setStep(1)}
                    >
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.nextButton}
                        onPress={() => setStep(3)}
                    >
                        <Text style={styles.nextButtonText}>Next: Additional Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SpringFadeIn>
    );
    
    const renderStep3 = () => (
        <SpringFadeIn>
            <View style={styles.formStep}>
                <Text style={styles.formStepTitle}>Additional Information</Text>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Cover Letter</Text>
                    <TextInput 
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Tell us why you're interested in this internship..."
                        multiline
                        numberOfLines={6}
                        value={formData.coverLetter}
                        onChangeText={(text) => updateFormData('coverLetter', text)}
                    />
                </View>
                
                <View style={styles.formField}>
                    <Text style={styles.fieldLabel}>Availability</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="When can you start? Any schedule constraints?"
                        value={formData.availability}
                        onChangeText={(text) => updateFormData('availability', text)}
                    />
                </View>
                
                <View style={styles.stepNavigation}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setStep(2)}
                    >
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={onSubmit}
                    >
                        <Text style={styles.submitButtonText}>Submit Application</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SpringFadeIn>
    );
    
    return (
        <View style={styles.applicationForm}>
            {renderStepIndicator()}
            
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </View>
    );
};