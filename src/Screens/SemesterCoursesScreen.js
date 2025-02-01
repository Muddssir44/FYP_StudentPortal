import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { CourseCard } from '../Components/CourseCard';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';



export const SemesterCoursesScreen = ({ route }) => {
    const { department, semester } = route.params;
    const courses = [
      {
        id: 1,
        name: 'Advanced Programming',
        creditHours: 3,
        instructor: 'Dr. Smith',
        code: 'CS-401'
      },
      {
        id: 2,
        name: 'Advanced Programming',
        creditHours: 3,
        instructor: 'Dr. Smith',
        code: 'CS-401'
      },
      {
        id: 3,
        name: 'Advanced Programming',
        creditHours: 3,
        instructor: 'Dr. Smith',
        code: 'CS-401'
      },
      {
        id: 4,
        name: 'Advanced Programming',
        creditHours: 3,
        instructor: 'Dr. Smith',
        code: 'CS-401'
      },
      {
        id: 5,
        name: 'Advanced Programming',
        creditHours: 3,
        instructor: 'Dr. Smith',
        code: 'CS-401'
      },


    ];
  
    return (
      <View style={styles.SemesterCoursesScreencontainer}>
        <Header />
        <CustomHeader
          title="Courses"
          currentScreen={`${department.name}-Semester${semester}`}
          showSearch={false}
          showRefresh={false}
          // navigation={navigation}
        />
        <ScrollView style={styles.SemesterCoursesScreenscrollView}>
          {courses.map((course) => (
            <CourseCard 
            key={course.id} 
            course={course} 
            departmentName={department.name} 
            semester={semester} 
          />
          
          ))}
        </ScrollView>
      </View>
    );
  };
