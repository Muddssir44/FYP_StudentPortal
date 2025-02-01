import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../AdminPortal_Css';

const { width, height } = Dimensions.get('window');

const CustomMenuDrawer = ({ isVisible, onClose, navigation }) => {
  // Animation values
  const [slideAnim] = useState(new Animated.Value(-width));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [expandedItems, setExpandedItems] = useState({});
  const scrollViewRef = useRef(null);
  // Menu items data structure
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      screen: 'Dashboard',
      isDashboard: true

    },
    {
      id: 'courses',
      title: 'Courses',
      icon: 'school',
      subItems: [
        { id: 'all-courses', title: 'Departments --> All Courses', screen: 'DepartmentListScreen2', icon: 'book' },
        { id: 'create-course', title: 'Create Course', screen: 'CreateSubjectsScreen', icon: 'add' },
      ],
    },
    {
      id: 'departments',
      title: 'Departments',
      icon: 'account-balance',
      subItems: [
        { id: 'all-departments', title: 'All Departments', screen: 'DepartmentListScreen', icon: 'list' },
        { id: 'create-department', title: 'Create Department', screen: 'CreateDepartmentScreen', icon: 'add' },

      ],
    },
    {
      id: 'teachers',
      title: 'Teachers',
      icon: 'groups',
      subItems: [
        { id: 'all-teachers', title: 'All Teachers', screen: 'AllTeachersScreen', icon: 'people' },
        { id: 'create-teachers', title: 'Create Teachers', screen: 'CreateTeacherScreen', icon: 'add' },

      ],
    },


    {
      id: 'students',
      title: 'Students',
      icon: 'groups',
      subItems: [
        { id: 'all-students', title: 'All Students', screen: 'AllStudentsScreen', icon: 'people' },
        { id: 'add-student', title: 'Create Student', screen: 'AddStudentForm', icon: 'add' },
      ],
    },
    {
      id: 'news',
      title: 'News',
      icon: 'article',
      subItems: [
        { id: 'all-news', title: 'All News', screen: 'NewsListScreen', icon: 'article' },
        { id: 'create-news', title: 'Create News', screen: 'CreateNewsScreen', icon: 'add' },
      ],
    },
    {
      id: 'internship',
      title: 'Internships',
      icon: 'work',
      subItems: [
        { id: 'all-internships', title: 'All Internships', screen: 'InternshipListScreen', icon: 'work' },
        { id: 'create-internship', title: 'Create Internship', screen: 'CreateInternshipScreen', icon: 'add' },
      ],
    },
    {
      id: 'events',
      title: 'Events',
      icon: 'event',
      subItems: [
        { id: 'all-events', title: 'All Events', screen: 'EventListScreen', icon: 'list' },
        { id: 'create-event', title: 'Create Event', screen: 'CreateEventScreen', icon: 'add' },
      ],
    },


    {
      id: 'exam_schedule',
      title: 'Exam Schedule',
      icon: 'date-range',
      subItems: [
        { id: 'exam-schedule', title: 'Department->Year->Exam Schedules', screen: 'ExamScheduleView', icon: 'list' },
        { id: 'create-exam-schedule', title: 'Create Exam Schedule', screen: 'CreateExamSchedule', icon: 'add' },
      ],
    },
    {
      id: 'semester_reg',
      title: 'Semester Registeration',
      icon: 'domain',
      subItems: [
        { id: 'semester-registeration', title: 'Semester Registerations', screen: 'SemesterRegistrationView', icon: 'assignment' },
        { id: 'create-semester-registeration', title: 'Create Semester Registeration ', screen: 'CreateSemesterRegistration', icon: 'add' },
      ],
    },

  ];
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const toggleExpand = (itemId, index) => {
    setExpandedItems((prev) => {
      const newState = {
        ...prev,
        [itemId]: !prev[itemId],
      };

      // If this is the last item and we're expanding it, scroll to the bottom
      if (index === menuItems.length - 1 && !prev[itemId]) {
        // Use setTimeout to ensure the expansion happens before scrolling
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }

      return newState;
    });
  };

  const handleNavigation = (screen) => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(screen);
      onClose();
    });
  };

  // Modified renderMenuItem function to include separator for Dashboard
  const renderMenuItem = (item, index) => {
    const isLastItem = index === menuItems.length - 1;

    return (
      <React.Fragment key={item.id}>
        {item.isDashboard ? (
          <>
            <TouchableOpacity
              style={styles.CustomMenuDrawermenuItem}
              onPress={() => handleNavigation(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.CustomMenuDrawermenuItemContent}>
                <View style={styles.CustomMenuDrawericonContainer}>
                  <MaterialIcons name={item.icon} size={20} color="#4F46E5" />
                </View>
                <Text style={styles.CustomMenuDrawermenuItemTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.CustomMenuDrawerseparator} />
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[
                styles.CustomMenuDrawermenuItem,
                isLastItem && expandedItems[item.id] && { marginBottom: 8 }
              ]}
              onPress={() => toggleExpand(item.id, index)}
              activeOpacity={0.7}
            >
              <View style={styles.CustomMenuDrawermenuItemContent}>
                <View style={styles.CustomMenuDrawericonContainer}>
                  <MaterialIcons name={item.icon} size={20} color="#4F46E5" />
                </View>
                <Text style={styles.CustomMenuDrawermenuItemTitle}>{item.title}</Text>
              </View>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: expandedItems[item.id] ? '90deg' : '0deg',
                    },
                  ],
                }}
              >
                <MaterialIcons name="chevron-right" size={20} color="#4B5563" />
              </Animated.View>
            </TouchableOpacity>

            {expandedItems[item.id] && (
              <Animated.View style={[
                styles.CustomMenuDrawersubMenuContainer,
                isLastItem && { marginBottom: 100 } // Add extra margin for last item's submenu
              ]}>
                {item.subItems?.map((subItem) => (
                  <TouchableOpacity
                    key={subItem.id}
                    style={styles.CustomMenuDrawersubMenuItem}
                    onPress={() => handleNavigation(subItem.screen)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.CustomMenuDrawersubMenuIconContainer}>
                      <MaterialIcons name={subItem.icon} size={16} color="#6B7280" />
                    </View>
                    <Text style={styles.CustomMenuDrawersubMenuTitle}>{subItem.title}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}

            {!isLastItem && <View style={styles.CustomMenuDrawerseparator} />}
          </>
        )}
      </React.Fragment>
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.CustomMenuDraweroverlay, { display: isVisible ? 'flex' : 'none' }]}>
          <Animated.View style={[styles.CustomMenuDrawerbackdrop, { opacity: fadeAnim }]} />

          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View style={[styles.CustomMenuDrawercontainer, { transform: [{ translateX: slideAnim }] }]}>
              {/* Profile Section */}
              <View style={styles.CustomMenuDrawerprofileSection}>
                <View style={styles.CustomMenuDrawerprofileImageWrapper}>
                  <Image
                    source={{ uri: '/api/placeholder/80/80' }}
                    style={styles.CustomMenuDrawerprofileImage}
                  />
                  <View style={styles.CustomMenuDrawerstatusIndicator} />
                </View>
                <Text style={styles.CustomMenuDrawerprofileName}>Admin Dashboard</Text>
                <Text style={styles.CustomMenuDrawerprofileRole}>Administrator</Text>
              </View>

              {/* Menu Items with ref */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.CustomMenuDrawermenuContainer}
                showsVerticalScrollIndicator={false}
              >
                {menuItems.map((item, index) => renderMenuItem(item, index))}
              </ScrollView>

              {/* AI Assistant Section */}
              <TouchableOpacity
                style={styles.CustomMenuDrawerchatbotSection}
                onPress={() => handleNavigation('Chatbot')}
                activeOpacity={0.8}
              >
                <View style={styles.CustomMenuDrawerchatbotContent}>
                  <View style={styles.CustomMenuDrawerchatbotIconContainer}>
                    <MaterialIcons name="support" size={24} color="#4F46E5" />
                  </View>
                  <View style={styles.CustomMenuDrawerchatbotTextContainer}>
                    <Text style={styles.CustomMenuDrawerchatbotTitle}>AI Assistant</Text>
                    <Text style={styles.CustomMenuDrawerchatbotSubtitle}>Get help instantly</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};




export default CustomMenuDrawer;