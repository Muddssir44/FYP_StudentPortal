import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import { SectionContainer } from '../Components/SectionContainer';
import Button from '../Components/Button';
import styles from '../AdminPortal_Css';

export const EditStudentAttendance = ({ route, navigation }) => {
  const { studentData } = route.params;

  const [formData, setFormData] = useState({
    courses: [],

    overallAttendance: studentData.overallAttendance?.toString() || '',
    courses: studentData.currentSemesterCourses?.map(course => ({
      code: course.code || '',
      name: course.name || '',
      totalClasses: course.totalClasses?.toString() || '',
      attendedClasses: course.attendedClasses?.toString() || '',
      attendancePercentage: course.attendancePercentage?.toString() || ''
    })) || []
  });
  useEffect(() => {
    if (studentData && studentData.currentSemester) {
      setFormData({
        courses: studentData.currentSemester.courses
      });
    }
  }, [studentData]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate overall attendance
    const overallAttendance = parseFloat(formData.overallAttendance);
    if (!formData.overallAttendance) {
      newErrors.overallAttendance = 'Overall attendance is required';
    } else if (isNaN(overallAttendance) || overallAttendance < 0 || overallAttendance > 100) {
      newErrors.overallAttendance = 'Attendance must be between 0 and 100';
    }

    // Validate each course
    formData.courses.forEach((course, index) => {
      const totalClasses = parseInt(course.totalClasses);
      const attendedClasses = parseInt(course.attendedClasses);
      const attendancePercentage = parseFloat(course.attendancePercentage);

      if (!course.totalClasses) {
        newErrors[`course_${index}_total`] = 'Required';
      } else if (isNaN(totalClasses) || totalClasses < 0) {
        newErrors[`course_${index}_total`] = 'Invalid';
      }

      if (!course.attendedClasses) {
        newErrors[`course_${index}_attended`] = 'Required';
      } else if (isNaN(attendedClasses) || attendedClasses < 0) {
        newErrors[`course_${index}_attended`] = 'Invalid';
      }

      if (attendedClasses > totalClasses) {
        newErrors[`course_${index}_attended`] = 'Cannot exceed total classes';
      }

      if (!course.attendancePercentage) {
        newErrors[`course_${index}_percentage`] = 'Required';
      } else if (isNaN(attendancePercentage) || attendancePercentage < 0 || attendancePercentage > 100) {
        newErrors[`course_${index}_percentage`] = 'Invalid percentage';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigation.goBack();
      } catch (error) {
        console.error('Error updating attendance:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateCourseField = (index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData.courses[index][field] = value;

      // Auto-calculate attendance percentage
      if (field === 'totalClasses' || field === 'attendedClasses') {
        const total = parseInt(newData.courses[index].totalClasses) || 0;
        const attended = parseInt(newData.courses[index].attendedClasses) || 0;
        if (total > 0) {
          newData.courses[index].attendancePercentage = ((attended / total) * 100).toFixed(1);
        }
      }

      return newData;
    });
  };

  return (
    <View style={styles.EditStudentAttendancecontainer}>
      <Header />
      <CustomHeader
        title="Students"
        currentScreen="Edit Student Attendance"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView style={styles.EditStudentAttendancescrollView}>
        <Text style={styles.EditStudentAttendancepageTitle}>Edit Student Attendance</Text>

        <View style={styles.EditStudentAttendancesection}>
          <Text style={styles.EditStudentAttendancesectionTitle}>Overall Attendance</Text>
          <View style={styles.EditStudentAttendanceformField}>
            <FormField
              label="Current Semester Attendance (%)"
              value={formData.overallAttendance}
              onChangeText={(text) => setFormData(prev => ({ ...prev, overallAttendance: text }))}
              placeholder="0.0"
              required
              keyboardType="decimal-pad"
              error={errors.overallAttendance}
            />
          </View>
        </View>

        <View style={styles.EditStudentAttendancesection}>
          <Text style={styles.EditStudentAttendancesectionTitle}>Course-wise Attendance</Text>
          {formData.courses.map((course, index) => (
            <View key={index} style={styles.EditStudentAttendancecourseCard}>
              <View style={styles.EditStudentAttendancecourseHeader}>
                <Text style={styles.EditStudentAttendancecourseCode}>{course.code}</Text>
                <Text style={styles.EditStudentAttendancecourseName}>{course.name}</Text>
              </View>

              <View style={styles.EditStudentAttendanceformField}>
                <FormField
                  label="Total Classes"
                  value={course.totalClasses}
                  onChangeText={(text) => updateCourseField(index, 'totalClasses', text)}
                  placeholder="0"
                  required
                  keyboardType="numeric"
                  error={errors[`course_${index}_total`]}
                />
              </View>

              <View style={styles.EditStudentAttendanceformField}>
                <FormField
                  label="Classes Attended"
                  value={course.attendedClasses}
                  onChangeText={(text) => updateCourseField(index, 'attendedClasses', text)}
                  placeholder="0"
                  required
                  keyboardType="numeric"
                  error={errors[`course_${index}_attended`]}
                />
              </View>

              <View style={styles.EditStudentAttendanceformField}>
                <FormField
                  label="Attendance %"
                  value={course.attendancePercentage}
                  onChangeText={(text) => updateCourseField(index, 'attendancePercentage', text)}
                  placeholder="0.0"
                  required
                  keyboardType="decimal-pad"
                  editable={false}
                  error={errors[`course_${index}_percentage`]}
                />
              </View>

              <View style={styles.EditStudentAttendancestatusBar}>
                <MaterialIcons
                  name={parseFloat(course.attendancePercentage) >= 75 ? "check-circle" : "warning"}
                  size={20}
                  color={parseFloat(course.attendancePercentage) >= 75 ? "#22C55E" : "#EF4444"}
                />
                <Text style={[
                  styles.EditStudentAttendancestatusText,
                  { color: parseFloat(course.attendancePercentage) >= 75 ? "#22C55E" : "#EF4444" }
                ]}>
                  {parseFloat(course.attendancePercentage) >= 75 ? "Attendance criteria met" : "Low attendance"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.EditStudentAttendancebuttonRow}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
            style={styles.EditStudentAttendancebutton}
            disabled={isSubmitting}
          />
          <Button
            title="Save Changes"
            onPress={handleSave}
            variant="primary"
            style={styles.EditStudentAttendancebutton}
            loading={isSubmitting}
          />
        </View>
      </ScrollView>
    </View>
  );
};

