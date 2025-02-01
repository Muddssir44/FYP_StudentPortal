import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Header } from '../Components/Header';
import { CustomHeader } from '../Components/CustomHeader';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { FormField } from '../Components/FormField';
import styles from '../AdminPortal_Css';

// Edit Teacher Basic Info Screen
export const EditTeacherBasicInfo = ({ route, navigation }) => {
  const teacherData = route?.params?.teacherData || {};
  const [basicInfo, setBasicInfo] = useState({
    name: teacherData.name || '',
    registrationNo: teacherData.registrationNo || '',
    designation: teacherData.designation || '',
    status: teacherData.status || '',
    gender: teacherData.gender || '',
    profilePhoto: teacherData.profilePhoto || '',
  });

  const handleSave = () => {
    // Validate required fields
    if (!basicInfo.name || !basicInfo.registrationNo || !basicInfo.designation) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Handle save logic here
    Alert.alert('Success', 'Basic information updated successfully');
    navigation.goBack();
  };

  const updateBasicInfo = (field, value) => {
    setBasicInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = () => {
    // Image upload logic would go here
    Alert.alert('Upload Photo', 'Image upload functionality to be implemented');
  };

  return (
    <View style={styles.EditTeacherBasicInfocontainer}>
      <Header />
      <CustomHeader
        title="Teachers"
        currentScreen="Edit Basic Information"
        showSearch={false}
        showRefresh={false}
        navigation={navigation}
      />

      <ScrollView >
        <Text style={styles.EditTeacherBasicInfoformTitle}>Edit Information</Text>

        <View style={styles.EditTeacherBasicInfolegendContainer}>
          <View style={styles.EditTeacherBasicInfolegendItem}>
            <View style={[styles.EditTeacherBasicInfolegendDot, styles.EditTeacherBasicInforequiredDot]} />
            <Text style={styles.EditTeacherBasicInfolegendText}>Required*</Text>
          </View>
          <View style={styles.EditTeacherBasicInfolegendItem}>
            <View style={[styles.EditTeacherBasicInfolegendDot, styles.EditTeacherBasicInfooptionalDot]} />
            <Text style={styles.EditTeacherBasicInfolegendText}>Optional</Text>
          </View>
        </View>
        <View style={styles.EditTeacherBasicInfocard}>
          <Text style={styles.EditTeacherBasicInfocardTitle}>Basic Information</Text>

          <View style={styles.EditTeacherBasicInfoprofileImageContainer}>
            <Image
              source={{ uri: basicInfo.profilePhoto || 'https://placeholder.com/user' }}
              style={styles.EditTeacherBasicInfoprofileImage}
            />
            <TouchableOpacity
              style={styles.EditTeacherBasicInfoimageUploadButton}
              onPress={handleImageUpload}
            >
              <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.EditTeacherBasicInfoformContainer}>
            <FormField
              label="Full Name"
              value={basicInfo.name}
              onChangeText={(value) => updateBasicInfo('name', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Registration Number"
              value={basicInfo.registrationNo}
              onChangeText={(value) => updateBasicInfo('registrationNo', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Designation"
              value={basicInfo.designation}
              onChangeText={(value) => updateBasicInfo('designation', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
              required
            />

            <FormField
              label="Status"
              value={basicInfo.status}
              onChangeText={(value) => updateBasicInfo('status', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
            />

            <FormField
              label="Gender"
              value={basicInfo.gender}
              onChangeText={(value) => updateBasicInfo('gender', value)}
              style={styles.EditTeacherBasicInfofullWidthInput}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.EditTeacherBasicInfofooter}>
        <TouchableOpacity style={styles.EditTeacherBasicInfosaveButton} onPress={handleSave}>
          <Text style={styles.EditTeacherBasicInfosaveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
