import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';


const EnhancedCustomHeader = ({ navigation }) => (
  <View style={styles.AddStudentFormenhancedHeader}>
    <CustomHeader
      title="Students"
      currentScreen="Add New Student"
      showSearch={false}
      showRefresh={false}
      navigation={navigation}
    />
    <View style={styles.AddStudentFormheaderButtons}>
      <TouchableOpacity style={styles.AddStudentFormcustomizeButton}>
        <Ionicons name="options-outline" size={20} color="#fff" />
        <Text style={styles.AddStudentFormbuttonText}>Customize</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.AddStudentFormimportButton}>
        <Ionicons name="download-outline" size={20} color="#fff" />
        <Text style={styles.AddStudentFormbuttonText}>Import Students</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    rollNo: '',
    enrollmentNo: '',
    department: '',
    profilePhoto: '',
    dateOfBirth: '',
    semesterNo: '',
    cnicNo: '',
    phoneNo: '',
  });

  return (
    <View style={styles.AddStudentFormcontainer}>
      <Header />
      <EnhancedCustomHeader />

      <ScrollView style={styles.AddStudentFormcontainer}>
        <View style={styles.AddStudentFormcontentContainer}>
          <Text style={styles.AddStudentFormformTitle}>Add New Student</Text>

          <View style={styles.AddStudentFormlegendContainer}>
            <View style={styles.AddStudentFormlegendItem}>
              <View style={[styles.AddStudentFormlegendDot, styles.AddStudentFormrequiredDot]} />
              <Text style={styles.AddStudentFormlegendText}>Required*</Text>
            </View>
            <View style={styles.AddStudentFormlegendItem}>
              <View style={[styles.AddStudentFormlegendDot, styles.AddStudentFormoptionalDot]} />
              <Text style={styles.AddStudentFormlegendText}>Optional</Text>
            </View>
          </View>

          <SectionContainer sectionNumber="1" title="Student Information">
            <FormField
              label="Student Name"
              placeholder="Name of Student"
              required
              value={formData.studentName}
              onChangeText={(text) => setFormData({ ...formData, studentName: text })}
            />

            <FormField
              label="Father Name"
              placeholder="Father's Name"
              required
              value={formData.fatherName}
              onChangeText={(text) => setFormData({ ...formData, fatherName: text })}
            />

            <FormField
              label="Roll No"
              placeholder="Student Roll Number"
              required
              value={formData.rollNo}
              onChangeText={(text) => setFormData({ ...formData, rollNo: text })}
            />

            <FormField
              label="Enrollment No"
              placeholder="Student Enrollment Number"
              required
              value={formData.enrollmentNo}
              onChangeText={(text) => setFormData({ ...formData, enrollmentNo: text })}
            />

            <FormField
              label="Department"
              placeholder="Select Department"
              type="select"
              required
              value={formData.department}
              onChangeText={(text) => setFormData({ ...formData, department: text })}
            />

            <FormField
              label="Profile Photo"
              type="file"
              required
              maxSize="100KB"
              value={formData.profilePhoto}
              onChangeText={(uri) => setFormData({ ...formData, profilePhoto: uri })}
            />

            <FormField
              label="Date of Birth"
              placeholder="Select Date"
              type="date"
              required
              value={formData.dateOfBirth}
              onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
            />

            <FormField
              label="Semester No"
              placeholder="Current Semester"
              required
              value={formData.semesterNo}
              onChangeText={(text) => setFormData({ ...formData, semesterNo: text })}
              keyboardType="numeric"
            />

            <FormField
              label="CNIC No"
              placeholder="00000-0000000-0"
              required
              value={formData.cnicNo}
              onChangeText={(text) => setFormData({ ...formData, cnicNo: text })}
              keyboardType="numeric"
              mask="cnic"
            />

            <FormField
              label="Phone No"
              placeholder="e.g +44xxxxxxxxxx"
              value={formData.phoneNo}
              onChangeText={(text) => setFormData({ ...formData, phoneNo: text })}
              keyboardType="phone-pad"
            />
          </SectionContainer>
        </View>
      </ScrollView>
    </View>
  );
};



export default AddStudentForm;
