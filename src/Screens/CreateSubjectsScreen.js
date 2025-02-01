import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import styles from '../AdminPortal_Css';

const EnhancedCustomHeader = ({ navigation }) => (
  <View style={styles.CreateSubjectsScreenenhancedHeader}>
    <CustomHeader
      title="Course"
      currentScreen="Create Course"
      showSearch={false}
      showRefresh={false}
      navigation={navigation}
    />
  </View>);
const CreateSubjectsScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([{
    departmentId: '',
    year: '',
    semester: '',
    subjectName: '',
    theoryMarks: '',
    practicalMarks: '',
  }]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch departments from API
    /* Example API call:
    const fetchDepartments = async () => {
      try {
        const response = await fetch('your-api-endpoint/departments');
        const data = await response.json();
        setDepartments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };
    fetchDepartments();
    */

    // Mock departments for demonstration
    setDepartments([
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Electrical Engineering' },
      // Add more departments as needed
    ]);
    setLoading(false);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addMoreSubjects = () => {
    setSubjects([
      ...subjects,
      {
        departmentId: '',
        year: '',
        semester: '',
        subjectName: '',
        theoryMarks: '',
        practicalMarks: '',
      },
    ]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async () => {
    // TODO: Implement API call to save subjects
    /* Example implementation:
    try {
      const response = await fetch('your-api-endpoint/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjects),
      });
      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error creating subjects:', error);
    }
    */
  };

  return (
    <View style={styles.CreateSubjectsScreencontainer}>
      <Header />
      <EnhancedCustomHeader />
      <ScrollView style={styles.CreateSubjectsScreencontainer}>
        <View style={styles.CreateSubjectsScreencontentContainer}>

          <Text style={styles.CreateSubjectsScreenformTitle}>Create Courses</Text>

          <View style={styles.CreateSubjectsScreenlegendContainer}>
            <View style={styles.CreateSubjectsScreenlegendItem}>
              <View style={[styles.CreateSubjectsScreenlegendDot, styles.CreateSubjectsScreenrequiredDot]} />
              <Text style={styles.CreateSubjectsScreenlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateSubjectsScreenlegendItem}>
              <View style={[styles.CreateSubjectsScreenlegendDot, styles.CreateSubjectsScreenoptionalDot]} />
              <Text style={styles.CreateSubjectsScreenlegendText}>Optional</Text>
            </View>
          </View>
          <SectionContainer sectionNumber="1" title="Course Information">
            {subjects.map((subject, index) => (
              <View key={index} >
                <FormField
                  label="Department"
                  placeholder="Select Department"
                  type="select"
                  required
                  value={subject.department}
                  onChangeText={(text) => setFormData({ ...formData, department: text })}
                />
                <FormField
                  required
                  label="Year"
                  dropdown
                  value={subject.year}
                  onChangeText={(value) => handleInputChange(index, 'year', value)}
                  items={[
                    { label: '1st Year', value: '1' },
                    { label: '2nd Year', value: '2' },
                    { label: '3rd Year', value: '3' },
                    { label: '4th Year', value: '4' },
                  ]}
                  placeholder="Select Year"

                />

                <FormField
                  label="Semester"
                  required
                  dropdown
                  value={subject.semester}
                  onChangeText={(value) => handleInputChange(index, 'semester', value)}
                  items={[
                    { label: '1st Semester', value: '1' },
                    { label: '2nd Semester', value: '2' },
                  ]}
                  placeholder="Select Semester"

                />

                <FormField
                  label="Subject Name"
                  required
                  value={subject.subjectName}
                  onChangeText={(value) => handleInputChange(index, 'subjectName', value)}
                  placeholder="Name Of Subject"
                />

                <FormField
                  label="Theory Marks"
                  required
                  value={subject.theoryMarks}
                  onChangeText={(value) => handleInputChange(index, 'theoryMarks', value)}
                  placeholder="Total Theory Marks"
                  keyboardType="numeric"
                />

                <FormField
                  label="Practical Marks"
                  value={subject.practicalMarks}
                  onChangeText={(value) => handleInputChange(index, 'practicalMarks', value)}
                  placeholder="Total Practical Marks (if any)"
                  keyboardType="numeric"
                />

              </View>

            ))}</SectionContainer>


          <View style={styles.CreateSubjectsScreenbuttonContainer}>
            <TouchableOpacity
              style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenaddButton]}
              onPress={addMoreSubjects}
            >
              <Text style={styles.CreateSubjectsScreenbuttonText}>+ Add More</Text>
            </TouchableOpacity>

            {subjects.length > 1 && (
              <TouchableOpacity
                style={[styles.CreateSubjectsScreenbutton, styles.CreateSubjectsScreenremoveButton]}
                onPress={() => removeSubject(subjects.length - 1)}
              >
                <Text style={styles.CreateSubjectsScreenremoveButtonText}>− Remove</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.CreateSubjectsScreensubmitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.CreateSubjectsScreensubmitButtonText}>+ Assign Subjects</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};



export default CreateSubjectsScreen;