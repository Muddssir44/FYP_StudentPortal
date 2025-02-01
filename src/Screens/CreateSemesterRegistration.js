import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';
import { SectionContainer } from '../Components/SectionContainer';
import { FormField } from '../Components/FormField';

const CreateSemesterRegistration = ({ navigation }) => {
  const [formData, setFormData] = useState({
    department: '',
    departmentName: '',
    semesterNumber: '',
    registrationDeadline: '',
    startDate: '',
    courses: [{
      code: '',
      name: '',
      creditHours: '',
      type: 'Theory',
      instructor: '',
      labInstructor: '',
      maxStudents: '',
      prerequisites: []
    }]
  });

  const [currentPrereq, setCurrentPrereq] = useState('');

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, {
        code: '',
        name: '',
        creditHours: '',
        type: 'Theory',
        instructor: '',
        labInstructor: '',
        maxStudents: '',
        prerequisites: []
      }]
    }));
  };

  const removeCourse = (index) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const addPrerequisite = (courseIndex) => {
    if (currentPrereq.trim()) {
      setFormData(prev => {
        const newCourses = [...prev.courses];
        newCourses[courseIndex].prerequisites = [
          ...newCourses[courseIndex].prerequisites,
          currentPrereq.trim()
        ];
        return { ...prev, courses: newCourses };
      });
      setCurrentPrereq('');
    }
  };

  const removePrerequisite = (courseIndex, prereqIndex) => {
    setFormData(prev => {
      const newCourses = [...prev.courses];
      newCourses[courseIndex].prerequisites = newCourses[courseIndex].prerequisites
        .filter((_, i) => i !== prereqIndex);
      return { ...prev, courses: newCourses };
    });
  };

  const updateCourseField = (index, field, value) => {
    setFormData(prev => {
      const newCourses = [...prev.courses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      return { ...prev, courses: newCourses };
    });
  };

  return (
    <View style={styles.CreateSemesterRegistrationcontainer}>
      <Header />
      <CustomHeader
        title="Semester Registration"
        currentScreen="Create Reg_"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />
      <ScrollView >
        <View style={styles.CreateSemesterRegistrationcontentContainer}>
          <Text style={styles.CreateSemesterRegistrationformTitle}>Create Internship</Text>

          <View style={styles.CreateSemesterRegistrationlegendContainer}>
            <View style={styles.CreateSemesterRegistrationlegendItem}>
              <View style={[styles.CreateSemesterRegistrationlegendDot, styles.CreateSemesterRegistrationrequiredDot]} />
              <Text style={styles.CreateSemesterRegistrationlegendText}>Required*</Text>
            </View>
            <View style={styles.CreateSemesterRegistrationlegendItem}>
              <View style={[styles.CreateSemesterRegistrationlegendDot, styles.CreateSemesterRegistrationoptionalDot]} />
              <Text style={styles.CreateSemesterRegistrationlegendText}>Optional</Text>
            </View>
          </View>        {/* Basic Information Section using SectionContainer */}
          <SectionContainer
            title="Basic Information"
            icon={<MaterialIcons name="info" size={24} color="#6C63FF" />}
          >
            <FormField
              label="Department Code"
              value={formData.department}
              onChangeText={(text) => setFormData(prev => ({ ...prev, department: text }))}
              placeholder="e.g., SE, CS"
            />
            <FormField
              label="Department Name"
              value={formData.departmentName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, departmentName: text }))}
              placeholder="e.g., Software Engineering"
            />
            <FormField
              label="Semester Number"
              value={formData.semesterNumber}
              onChangeText={(text) => setFormData(prev => ({ ...prev, semesterNumber: text }))}
              placeholder="e.g., 5"
              keyboardType="numeric"
            />
            <FormField
              label="Registration Deadline"
              value={formData.registrationDeadline}
              onChangeText={(text) => setFormData(prev => ({ ...prev, registrationDeadline: text }))}
              placeholder="YYYY-MM-DD"
            />
            <FormField
              label="Start Date"
              value={formData.startDate}
              onChangeText={(text) => setFormData(prev => ({ ...prev, startDate: text }))}
              placeholder="YYYY-MM-DD"
            />
          </SectionContainer>

          {/* Courses Section using SectionContainer */}
          <SectionContainer
            title="Courses"
            icon={<MaterialIcons name="book" size={24} color="#6C63FF" />}
          >
            {formData.courses.map((course, index) => (
              <View key={index} style={styles.CreateSemesterRegistrationcourseContainer}>
                <View style={styles.CreateSemesterRegistrationcourseHeader}>
                  <Text style={styles.CreateSemesterRegistrationcourseTitle}>Course {index + 1}</Text>
                  {index > 0 && (
                    <TouchableOpacity
                      onPress={() => removeCourse(index)}
                      style={styles.CreateSemesterRegistrationremoveButton}
                    >
                      <MaterialIcons name="delete" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>

                <FormField
                  label="Course Code"
                  value={course.code}
                  onChangeText={(text) => updateCourseField(index, 'code', text)}
                  placeholder="e.g., SE501"
                />
                <FormField
                  label="Course Name"
                  value={course.name}
                  onChangeText={(text) => updateCourseField(index, 'name', text)}
                  placeholder="e.g., Software Design Patterns"
                />
                <FormField
                  label="Credit Hours"
                  value={course.creditHours}
                  onChangeText={(text) => updateCourseField(index, 'creditHours', text)}
                  placeholder="e.g., 3"
                  keyboardType="numeric"
                />

                {/* Course Type Selection */}
                <View style={styles.CreateSemesterRegistrationinputGroup}>
                  <Text style={styles.CreateSemesterRegistrationlabel}>Course Type</Text>
                  <View style={styles.CreateSemesterRegistrationtypeContainer}>
                    {['Theory', 'Theory + Lab'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.CreateSemesterRegistrationtypeButton,
                          course.type === type && styles.CreateSemesterRegistrationtypeButtonActive
                        ]}
                        onPress={() => updateCourseField(index, 'type', type)}
                      >
                        <Text style={[
                          styles.CreateSemesterRegistrationtypeButtonText,
                          course.type === type && styles.CreateSemesterRegistrationtypeButtonTextActive
                        ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <FormField
                  label="Instructor"
                  value={course.instructor}
                  onChangeText={(text) => updateCourseField(index, 'instructor', text)}
                  placeholder="e.g., Dr. John Smith"
                />

                {course.type === 'Theory + Lab' && (
                  <FormField
                    label="Lab Instructor"
                    value={course.labInstructor}
                    onChangeText={(text) => updateCourseField(index, 'labInstructor', text)}
                    placeholder="e.g., Mr. David Brown"
                  />
                )}

                <FormField
                  label="Max Students"
                  value={course.maxStudents}
                  onChangeText={(text) => updateCourseField(index, 'maxStudents', text)}
                  placeholder="e.g., 50"
                  keyboardType="numeric"
                />

                {/* Prerequisites Section */}
                <View style={styles.CreateSemesterRegistrationinputGroup}>
                  <Text style={styles.CreateSemesterRegistrationlabel}>Prerequisites</Text>
                  <View style={styles.CreateSemesterRegistrationprerequisitesContainer}>
                    {course.prerequisites.map((prereq, prereqIndex) => (
                      <View key={prereqIndex} style={styles.CreateSemesterRegistrationprerequisiteTag}>
                        <Text style={styles.CreateSemesterRegistrationprerequisiteText}>{prereq}</Text>
                        <TouchableOpacity
                          onPress={() => removePrerequisite(index, prereqIndex)}
                          style={styles.CreateSemesterRegistrationremovePrereqButton}
                        >
                          <MaterialIcons name="close" size={16} color="#6B7280" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <View style={styles.CreateSemesterRegistrationaddPrereqContainer}>
                    <FormField
                      value={currentPrereq}
                      onChangeText={setCurrentPrereq}
                      placeholder="Enter prerequisite course code"
                      containerStyle={styles.CreateSemesterRegistrationprereqInput}
                    />
                    <TouchableOpacity
                      style={styles.CreateSemesterRegistrationaddPrereqButton}
                      onPress={() => addPrerequisite(index)}
                    >
                      <MaterialIcons name="add" size={24} color="#6C63FF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.CreateSemesterRegistrationaddCourseButton}
              onPress={addCourse}
            >
              <MaterialIcons name="add" size={24} color="#6C63FF" />
              <Text style={styles.CreateSemesterRegistrationaddCourseButtonText}>Add Another Course</Text>
            </TouchableOpacity>
          </SectionContainer>

          <TouchableOpacity
            style={styles.CreateSemesterRegistrationsubmitButton}
            onPress={() => {
              console.log('Form Data:', formData);
            }}
          >
            <Text style={styles.CreateSemesterRegistrationsubmitButtonText}>Create Registration</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};




export default CreateSemesterRegistration;
