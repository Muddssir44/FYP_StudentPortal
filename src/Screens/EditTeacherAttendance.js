import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField'; // Assuming this is your existing component
import styles from '../AdminPortal_Css';

// Edit Teacher Attendance Screen
export const EditTeacherAttendance = ({ route, navigation }) => {
  const teacherData = route?.params?.teacherData || {};
  const [coursesAttendance, setCoursesAttendance] = useState(
    teacherData.coursesAttendance?.map(course => ({
      ...course,
      totalClasses: course.totalClasses.toString(),
      classesTaken: course.classesTaken.toString(),
    })) || []
  );

  const handleSave = () => {
    // Validate the data
    const isValid = coursesAttendance.every(course =>
      parseInt(course.classesTaken) <= parseInt(course.totalClasses)
    );

    if (!isValid) {
      Alert.alert('Invalid Data', 'Classes taken cannot exceed total classes');
      return;
    }

    // Handle save logic here
    Alert.alert('Success', 'Attendance data updated successfully');
    navigation.goBack();
  };

  const updateCourseAttendance = (index, field, value) => {
    const updatedCourses = [...coursesAttendance];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    };
    setCoursesAttendance(updatedCourses);
  };

  return (
    <View style={styles.EditTeacherAttendancecontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Edit Attendance"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />


      <ScrollView >
        <Text style={styles.EditTeacherAttendanceformTitle}>Edit Attendance</Text>

        <View style={styles.EditTeacherAttendancelegendContainer}>
          <View style={styles.EditTeacherAttendancelegendItem}>
            <View style={[styles.EditTeacherAttendancelegendDot, styles.EditTeacherAttendancerequiredDot]} />
            <Text style={styles.EditTeacherAttendancelegendText}>Required*</Text>
          </View>
          <View style={styles.EditTeacherAttendancelegendItem}>
            <View style={[styles.EditTeacherAttendancelegendDot, styles.EditTeacherAttendanceoptionalDot]} />
            <Text style={styles.EditTeacherAttendancelegendText}>Optional</Text>
          </View>
        </View>
        {coursesAttendance.map((course, index) => (
          <View key={index} style={styles.EditTeacherAttendancecard}>
            <Text style={styles.EditTeacherAttendancecardTitle}>{course.code}: {course.name}</Text>

            <View style={styles.EditTeacherAttendanceformContainer}>
              <FormField
                label="Course Code"
                value={course.code}
                onChangeText={(value) => updateCourseAttendance(index, 'code', value)}
                style={styles.EditTeacherAttendancefullWidthInput}
              />

              <FormField
                label="Course Name"
                value={course.name}
                onChangeText={(value) => updateCourseAttendance(index, 'name', value)}
                style={styles.EditTeacherAttendancefullWidthInput}
              />

              <FormField
                label="Department"
                value={course.department}
                onChangeText={(value) => updateCourseAttendance(index, 'department', value)}
                style={styles.EditTeacherAttendancefullWidthInput}
              />

              <FormField
                label="Section"
                value={course.section}
                onChangeText={(value) => updateCourseAttendance(index, 'section', value)}
                style={styles.EditTeacherAttendancefullWidthInput}
              />

              <FormField
                label="Total Classes"
                value={course.totalClasses}
                onChangeText={(value) => updateCourseAttendance(index, 'totalClasses', value)}
                keyboardType="numeric"
                style={styles.EditTeacherAttendancefullWidthInput}
              />

              <FormField
                label="Classes Taken"
                value={course.classesTaken}
                onChangeText={(value) => updateCourseAttendance(index, 'classesTaken', value)}
                keyboardType="numeric"
                style={styles.EditTeacherAttendancefullWidthInput}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.EditTeacherAttendancefooter}>
        <TouchableOpacity style={styles.EditTeacherAttendancesaveButton} onPress={handleSave}>
          <Text style={styles.EditTeacherAttendancesaveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
