import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import Button from '../Components/Button';
import styles from '../AdminPortal_Css';

export const EditStudentBasicInfo = ({ route, navigation }) => {
  const { studentData } = route.params;

  const [formData, setFormData] = useState({
    enrollmentNo: studentData.enrollmentNo || '',
    rollNo: studentData.rollNo || '',
    department: studentData.department || '',
    semester: studentData.semester?.toString() || '',
    section: studentData.section || '',
    name: studentData.name || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.enrollmentNo) newErrors.enrollmentNo = 'Enrollment No. is required';
    if (!formData.rollNo) newErrors.rollNo = 'Roll No. is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.section) newErrors.section = 'Section is required';

    if (formData.semester) {
      const semesterNum = parseInt(formData.semester);
      if (isNaN(semesterNum) || semesterNum < 1 || semesterNum > 8) {
        newErrors.semester = 'Semester must be between 1 and 8';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Here you would make your API call to update the student data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
        navigation.goBack();
      } catch (error) {
        console.error('Error updating student:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <View style={styles.EditStudentBasicInfocontainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Edit Student Details"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView >
        <Text style={styles.EditStudentBasicInfoformTitle}>Edit Student Details</Text>

        <View style={styles.EditStudentBasicInfolegendContainer}>
          <View style={styles.EditStudentBasicInfolegendItem}>
            <View style={[styles.EditStudentBasicInfolegendDot, styles.EditStudentBasicInforequiredDot]} />
            <Text style={styles.EditStudentBasicInfolegendText}>Required*</Text>
          </View>
          <View style={styles.EditStudentBasicInfolegendItem}>
            <View style={[styles.EditStudentBasicInfolegendDot, styles.EditStudentBasicInfooptionalDot]} />
            <Text style={styles.EditStudentBasicInfolegendText}>Optional</Text>
          </View>
        </View>
        <SectionContainer sectionNumber="1" title="Student Information">
          <FormField
            label="Name"
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            placeholder="Enter student name"
            error={errors.name}
            required
          />

          <FormField
            label="Enrollment No."
            value={formData.enrollmentNo}
            onChangeText={(text) => setFormData(prev => ({ ...prev, enrollmentNo: text }))}
            placeholder="Enter enrollment number"
            error={errors.enrollmentNo}
            required
            editable={false}
          />

          <FormField
            label="Roll No."
            value={formData.rollNo}
            onChangeText={(text) => setFormData(prev => ({ ...prev, rollNo: text }))}
            placeholder="Enter roll number"
            error={errors.rollNo}
            required
            editable={false}
          />
        </SectionContainer>

        <SectionContainer sectionNumber="2" title="Academic Details">
          <FormField
            label="Department"
            value={formData.department}
            onChangeText={(text) => setFormData(prev => ({ ...prev, department: text }))}
            placeholder="Enter department"
            error={errors.department}
            required
          />

          <FormField
            label="Semester"
            value={formData.semester}
            onChangeText={(text) => setFormData(prev => ({ ...prev, semester: text }))}
            placeholder="Enter semester (1-8)"
            error={errors.semester}
            required
            keyboardType="numeric"
          />

          <FormField
            label="Section"
            value={formData.section}
            onChangeText={(text) => setFormData(prev => ({ ...prev, section: text }))}
            placeholder="Enter section"
            error={errors.section}
            required
          />
        </SectionContainer>

        <View style={styles.EditStudentBasicInfobuttonContainer}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
            style={styles.EditStudentBasicInfobutton}
            disabled={isSubmitting}
          />
          <Button
            title="Save Changes"
            onPress={handleSave}
            variant="primary"
            style={styles.EditStudentBasicInfobutton}
            loading={isSubmitting}
          />
        </View>
      </ScrollView>
    </View>
  );
};


