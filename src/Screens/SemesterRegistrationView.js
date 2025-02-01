import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import styles from '../AdminPortal_Css';

export const SemesterRegistrationView = ({ navigation }) => {
  const [expandedDepartments, setExpandedDepartments] = useState(new Set(['SE']));
  const [expandedSemesters, setExpandedSemesters] = useState(new Set());

  // Dummy data structure
  const registrationData = {
    SE: {
      name: "Software Engineering",
      semesters: {
        5: {
          semester: "5th Semester",
          registrationDeadline: "2025-02-15",
          startDate: "2025-02-01",
          courses: [
            {
              code: "SE501",
              name: "Software Design Patterns",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. John Smith",
              maxStudents: 50,
              prerequisites: ["SE401", "SE402"]
            },
            {
              code: "SE502",
              name: "Web Engineering",
              creditHours: 4,
              type: "Theory + Lab",
              instructor: "Dr. Sarah Wilson",
              labInstructor: "Mr. David Brown",
              maxStudents: 40,
              prerequisites: ["SE403"]
            },
            {
              code: "SE503",
              name: "Software Quality Assurance",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Michael Johnson",
              maxStudents: 45,
              prerequisites: []
            },
            {
              code: "SE504",
              name: "Cloud Computing",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Emily Davis",
              maxStudents: 50,
              prerequisites: ["SE401"]
            },
            {
              code: "SE505",
              name: "Machine Learning",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Robert Wilson",
              maxStudents: 45,
              prerequisites: ["SE402", "MT401"]
            }
          ]
        },
        6: {
          semester: "6th Semester",
          registrationDeadline: "2025-02-15",
          startDate: "2025-02-01",
          courses: [
            {
              code: "SE601",
              name: "Software Project Management",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. Alice Johnson",
              maxStudents: 50,
              prerequisites: ["SE501"]
            }
          ]
        }
      }
    },
    CS: {
      name: "Computer Science",
      semesters: {
        5: {
          semester: "5th Semester",
          registrationDeadline: "2025-02-15",
          startDate: "2025-02-01",
          courses: [
            {
              code: "CS501",
              name: "Advanced Algorithms",
              creditHours: 3,
              type: "Theory",
              instructor: "Dr. James Wilson",
              maxStudents: 45,
              prerequisites: ["CS401"]
            }
          ]
        }
      }
    }
  };

  const toggleDepartment = (deptCode) => {
    setExpandedDepartments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(deptCode)) {
        newSet.delete(deptCode);
      } else {
        newSet.add(deptCode);
      }
      return newSet;
    });
  };

  const toggleSemester = (deptCode, semester) => {
    const key = `${deptCode}-${semester}`;
    setExpandedSemesters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditRegistration = (deptCode, semesterNumber, semesterData) => {
    navigation.navigate('EditSemesterRegistration', {
      deptCode,
      semesterNumber,
      semesterData
    });
  };

  return (
    <View style={styles.SemesterRegistrationViewcontainer}>
      <Header />
      <CustomHeader
        title="Semester Registration"
        currentScreen="View Registrations"
        showSearch={false}
        showRefresh={true}
        navigation={navigation}
      />
      <ScrollView style={styles.SemesterRegistrationViewscrollView}>
        {Object.entries(registrationData).map(([deptCode, deptData], index) => (
          <View key={deptCode}>
            {index > 0 && <View style={styles.SemesterRegistrationViewdepartmentSeparator} />}
            <View style={styles.SemesterRegistrationViewdepartmentContainer}>
              <TouchableOpacity
                style={styles.SemesterRegistrationViewdepartmentHeader}
                onPress={() => toggleDepartment(deptCode)}
              >
                <View style={styles.SemesterRegistrationViewdepartmentTitleContainer}>
                  <MaterialIcons name="domain" size={24} color="#6C63FF" />
                  <Text style={styles.SemesterRegistrationViewdepartmentTitle}>{deptData.name}</Text>
                </View>
                <MaterialIcons
                  name={expandedDepartments.has(deptCode) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={24}
                  color="#6C63FF"
                />
              </TouchableOpacity>

              {expandedDepartments.has(deptCode) && (
                <View style={styles.SemesterRegistrationViewsemestersContainer}>
                  {Object.entries(deptData.semesters).map(([semesterNumber, semesterData]) => (
                    <View key={semesterNumber} style={styles.SemesterRegistrationViewcard}>
                      <View style={styles.SemesterRegistrationViewcardHeader}>
                        <TouchableOpacity
                          style={styles.SemesterRegistrationViewtitleToggleContainer}
                          onPress={() => toggleSemester(deptCode, semesterNumber)}
                        >
                          <MaterialIcons name="event-note" size={24} color="#6C63FF" />
                          <View style={styles.SemesterRegistrationViewsemesterInfoContainer}>
                            <Text style={styles.SemesterRegistrationViewcardTitle}>{semesterData.semester}</Text>
                            <Text style={styles.SemesterRegistrationViewdateInfo}>
                              Registration Deadline: {formatDate(semesterData.registrationDeadline)}
                            </Text>
                          </View>
                          <MaterialIcons
                            name={expandedSemesters.has(`${deptCode}-${semesterNumber}`) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color="#6C63FF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleEditRegistration(deptCode, semesterNumber, semesterData)}
                          style={styles.SemesterRegistrationVieweditButton}
                        >
                          <MaterialIcons name="edit" size={24} color="#6C63FF" />
                        </TouchableOpacity>
                      </View>

                      {expandedSemesters.has(`${deptCode}-${semesterNumber}`) && (
                        <View style={styles.SemesterRegistrationViewcardContent}>
                          {semesterData.courses.map((course, index) => (
                            <View key={index} style={styles.SemesterRegistrationViewcourseContainer}>
                              <View style={styles.SemesterRegistrationViewcourseHeader}>
                                <View style={styles.SemesterRegistrationViewcourseCodeContainer}>
                                  <Text style={styles.SemesterRegistrationViewcourseCode}>{course.code}</Text>
                                  <View style={[
                                    styles.SemesterRegistrationViewcourseTypeTag,
                                    { backgroundColor: course.type.includes('Lab') ? '#EEF0FB' : '#F0FDF4' }
                                  ]}>
                                    <Text style={[
                                      styles.SemesterRegistrationViewcourseTypeText,
                                      { color: course.type.includes('Lab') ? '#6C63FF' : '#10B981' }
                                    ]}>
                                      {course.type}
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.SemesterRegistrationViewcreditHoursContainer}>
                                  <MaterialIcons name="access-time" size={16} color="#6B7280" />
                                  <Text style={styles.SemesterRegistrationViewcreditHoursText}>
                                    {course.creditHours} Credit Hours
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.SemesterRegistrationViewcourseName}>{course.name}</Text>
                              <View style={styles.SemesterRegistrationViewinstructorContainer}>
                                <MaterialIcons name="person" size={16} color="#6B7280" />
                                <Text style={styles.SemesterRegistrationViewinstructorText}>
                                  {course.instructor}
                                </Text>
                              </View>
                              {course.labInstructor && (
                                <View style={styles.SemesterRegistrationViewinstructorContainer}>
                                  <MaterialIcons name="person" size={16} color="#6B7280" />
                                  <Text style={styles.SemesterRegistrationViewinstructorText}>
                                    Lab Instructor: {course.labInstructor}
                                  </Text>
                                </View>
                              )}
                              {course.prerequisites.length > 0 && (
                                <View style={styles.SemesterRegistrationViewprerequisitesContainer}>
                                  <Text style={styles.SemesterRegistrationViewprerequisitesLabel}>Prerequisites:</Text>
                                  <View style={styles.SemesterRegistrationViewprerequisitesList}>
                                    {course.prerequisites.map((prereq, pIndex) => (
                                      <View key={pIndex} style={styles.SemesterRegistrationViewprerequisiteTag}>
                                        <Text style={styles.SemesterRegistrationViewprerequisiteText}>{prereq}</Text>
                                      </View>
                                    ))}
                                  </View>
                                </View>
                              )}
                              <View style={styles.SemesterRegistrationViewmaxStudentsContainer}>
                                <MaterialIcons name="group" size={16} color="#6B7280" />
                                <Text style={styles.SemesterRegistrationViewmaxStudentsText}>
                                  Max Students: {course.maxStudents}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

