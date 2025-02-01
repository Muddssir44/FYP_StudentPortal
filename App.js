import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DepartmentListScreen } from './src/Screens/DepartmentListScreen';
import { EditDepartmentScreen } from './src/Screens/EditDepartmentScreen';
import { CreateDepartmentScreen } from './src/Screens/CreateDepartmentScreen';
import AddStudentForm from './src/Screens/AddStudentForm';
import AllStudentsScreen from './src/Screens/AllStudentsScreen';
import CreateSubjectsScreen from './src/Screens/CreateSubjectsScreen';
import { DepartmentListScreen2 } from './src/Screens/DepartmentListScreen2';
import { EditCourseScreen } from './src/Screens/EditCourseScreen';
import { DepartmentSemestersScreen } from './src/Screens/DepartmentSemestersScreen';
import { SemesterCoursesScreen } from './src/Screens/SemesterCoursesScreen';
import { EditEventScreen } from './src/Screens/EditEventScreen';
import { EventListScreen } from './src/Screens/EventListScreen';
import { CreateEventScreen } from './src/Screens/CreateEventScreen';
import { NewsListScreen } from './src/Screens/NewsListScreen';
import { EditNewsScreen } from './src/Screens/EditNewsScreen';
import { CreateNewsScreen } from './src/Screens/CreateNewsScreen';
import { InternshipListScreen } from './src/Screens/InternshipListScreen';
import { EditInternshipScreen } from './src/Screens/EditInternshipScreen';
import { CreateInternshipScreen } from './src/Screens/CreateInternshipScreen';
import { StudentProfileView } from './src/Screens/StudentProfileView';
import { EditStudentBasicInfo } from './src/Screens/EditStudentBasicInfo';
import { EditStudentAcademics } from './src/Screens/EditStudentAcademics';
import { EditStudentAttendance } from './src/Screens/EditStudentAttendance';
import { TeacherViewScreen } from './src/Screens/TeacherViewScreen';
import { EditTeacherAttendance } from './src/Screens/EditTeacherAttendance';
import { EditTeacherFeedback } from './src/Screens/EditTeacherFeedback';
import { EditTeacherSchedule } from './src/Screens/EditTeacherSchedule';
import { EditTeacherBasicInfo } from './src/Screens/EditTeacherBasicInfo';
import { ExamScheduleView } from './src/Screens/ExamScheduleView';
import { SemesterRegistrationView } from './src/Screens/SemesterRegistrationView';
import CreateSemesterRegistration from './src/Screens/CreateSemesterRegistration';
import { CreateExamSchedule } from './src/Screens/CreateExamSchedule';
import { EditExamSchedule } from './src/Screens/EditExamSchedule';
import { EditSemesterRegistration } from './src/Screens/EditSemesterRegistration';
import AllTeachersScreen from './src/Screens/AllTeacherScreen';
import AdminPortal_Css from './src/AdminPortal_Css';
import Dashboard from './src/Screens/Dashboard';
import AdminProfile from './src/Screens/AdminProfile';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AdminProfile" component={AdminProfile} />

      
      <Stack.Screen name="DepartmentListScreen" component={DepartmentListScreen} />
      <Stack.Screen name="EditDepartmentScreen" component={EditDepartmentScreen} /> 
      <Stack.Screen name="CreateDepartmentScreen" component={CreateDepartmentScreen} />
      
      
      
      
      
      
      <Stack.Screen name="SemesterRegistrationView" component={SemesterRegistrationView} />
      <Stack.Screen name="EditSemesterRegistration" component={EditSemesterRegistration} /> 
      <Stack.Screen name="CreateSemesterRegistration" component={CreateSemesterRegistration} />
      
      <Stack.Screen name="ExamScheduleView" component={ExamScheduleView} /> 
      <Stack.Screen name="CreateExamSchedule" component={CreateExamSchedule} />
      <Stack.Screen name="EditExamSchedule" component={EditExamSchedule} />
      
      
      
      <Stack.Screen name="AllTeachersScreen" component={AllTeachersScreen} />
      <Stack.Screen name="TeacherViewScreen" component={TeacherViewScreen} />
      <Stack.Screen name="EditTeacherBasicInfo" component={EditTeacherBasicInfo} />
      <Stack.Screen name="EditTeacherAttendance" component={EditTeacherAttendance} />
      <Stack.Screen name="EditTeacherFeedback" component={EditTeacherFeedback} />
      <Stack.Screen name="EditTeacherSchedule" component={EditTeacherSchedule} />


        <Stack.Screen name="StudentProfileView" component={StudentProfileView} />
        <Stack.Screen name="EditStudentBasicInfo" component={EditStudentBasicInfo} />
        <Stack.Screen name="EditStudentAcademics" component={EditStudentAcademics} />
        <Stack.Screen name="EditStudentAttendance" component={EditStudentAttendance} />
        <Stack.Screen name="AllStudentsScreen" component={AllStudentsScreen} />
        <Stack.Screen name="AddStudentForm" component={AddStudentForm} />

        <Stack.Screen name="InternshipListScreen" component={InternshipListScreen} />
        <Stack.Screen name="EditInternshipScreen" component={EditInternshipScreen} />
        <Stack.Screen name="CreateInternshipScreen" component={CreateInternshipScreen} />

        <Stack.Screen name="NewsListScreen" component={NewsListScreen} />
        <Stack.Screen name="EditNewsScreen" component={EditNewsScreen} />
        <Stack.Screen name="CreateNewsScreen" component={CreateNewsScreen} />




        <Stack.Screen name="EventListScreen" component={EventListScreen} />
        <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
        <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />




        <Stack.Screen name="DepartmentListScreen2" component={DepartmentListScreen2} />
        <Stack.Screen name="SemesterCoursesScreen" component={SemesterCoursesScreen} />
        <Stack.Screen name="CreateSubjectsScreen" component={CreateSubjectsScreen} />
        <Stack.Screen name="DepartmentSemestersScreen" component={DepartmentSemestersScreen} />
        <Stack.Screen name="EditCourseScreen" component={EditCourseScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
