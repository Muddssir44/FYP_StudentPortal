import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import styles from '../AdminPortal_Css';

import { View, ScrollView, TouchableOpacity, Text, Image, Animated, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import HeaderBackground from '../Components/HeaderBackground ';
const AnimatedStatCard = ({ title, value, icon, color, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 150,
      tension: 50,
      friction: 6,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <BlurView intensity={20} tint="dark" style={styles.AdminProfileglassCard}>
        <View style={[styles.AdminProfilestatIconContainer, { backgroundColor: color }]}>
          <MaterialIcons name={icon} size={22} color="#fff" />
        </View>
        <Text style={styles.AdminProfilestatValue}>{value}</Text>
        <Text style={styles.AdminProfilestatTitle}>{title}</Text>
      </BlurView>
    </Animated.View>
  );
};

const ProfileSection = ({ scrollY }) => {
  const imageScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp'
  });

  return (
    <Animated.View style={[styles.AdminProfileprofileContainer, { opacity: headerOpacity }]}>
      <Animated.View style={[styles.AdminProfileavatarContainer, { transform: [{ scale: imageScale }] }]}>
        <Image source={require('../Assets/profileicon.png')} style={styles.AdminProfileavatar} />
        <View style={styles.AdminProfilebadgeContainer}>
          <MaterialIcons name="verified" size={20} color="#4ade80" />
        </View>
      </Animated.View>
      <Text style={styles.AdminProfileuserName}>Mr. Admin</Text>

    </Animated.View>
  );
};

const DetailSection = ({ title, icon, children, isExpanded, onToggle }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.timing(contentHeight, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start();
  }, [isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const maxHeight = contentHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  return (
    <View style={styles.AdminProfiledetailSection}>
      <TouchableOpacity onPress={onToggle} style={styles.AdminProfilesectionHeader} activeOpacity={0.7}>
        <View style={styles.AdminProfileheaderLeft}>
          <LinearGradient
            colors={['#4ade8040', '#4ade8020']}
            style={styles.AdminProfileheaderIcon}
          >
            <MaterialIcons name={icon} size={24} color="#4ade80" />
          </LinearGradient>
          <Text style={styles.AdminProfileheaderTitle}>{title}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#4ade80" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.AdminProfilesectionContent, { maxHeight }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const StudentProfile = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expandedSection, setExpandedSection] = useState(null);

  const stats = [
    { title: 'Users Managed', value: '1,240', icon: 'group', color: '#4ade80' },
    { title: 'Active Sessions', value: '320', icon: 'exit-to-app', color: '#0ea5e9' },
    { title: 'Total Applications', value: '85', icon: 'event-note', color: '#8b5cf6' }
  ];

  const personalInfo = [
    { label: 'Admin ID', value: 'ADMIN-00123' },
    { label: 'Email', value: 'admin@application.com' },
    { label: 'Phone', value: '+1 800 555 1234' },
    { label: 'Date Joined', value: 'Jan 1, 2022' }
  ];

  return (
    <View style={styles.AdminProfilecontainer}>
      <StatusBar barStyle="light-content" />

      {/* Background Image */}




      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBackground
          imageSource={require('../Assets/bg.jpg')}
          overlayOpacity={0.5}
        />
        {/* Profile Section  */}
        <ProfileSection scrollY={scrollY} />

        <View style={styles.AdminProfilestatsContainer}>
          {stats.map((stat, index) => (
            <AnimatedStatCard key={index} {...stat} index={index} />
          ))}
        </View>


        <View style={styles.AdminProfiledetailsContainer}>
          <DetailSection
            title="Personal Information"
            icon="person"
            isExpanded={expandedSection === 'personal'}
            onToggle={() => setExpandedSection(
              expandedSection === 'personal' ? null : 'personal'
            )}
          >
            {personalInfo.map((info, index) => (
              <View key={index} style={styles.AdminProfileinfoRow}>
                <Text style={styles.AdminProfileinfoLabel}>{info.label}</Text>
                <Text style={styles.AdminProfileinfoValue}>{info.value}</Text>
              </View>
            ))}
          </DetailSection>


        </View>
      </Animated.ScrollView>
    </View>
  );
};


export default StudentProfile;