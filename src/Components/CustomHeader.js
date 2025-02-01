import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomMenuDrawer from './CustomMenuDrawer';
import styles from '../AdminPortal_Css';

export const CustomHeader = ({
  title = "Students",
  showSearch = true,
  showRefresh = true,
  currentScreen = 'all'
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.CustomHeadercustomHeaderContainer, { paddingTop: insets.top }]}>
      <View style={styles.CustomHeadercustomHeaderContent}>
        {/* Title and Screen Info Section */}
        <View style={styles.CustomHeaderleftSection}>
          <Text style={styles.CustomHeaderheaderTitle}>{title}</Text>
          <Text style={styles.CustomHeaderseparator}>|</Text>
          <View style={[
            styles.CustomHeaderscreenIndicator,
            currentScreen === 'all' && styles.CustomHeaderactiveScreenIndicator
          ]}>
            <Ionicons
              name="home-outline"
              size={20}
              color={currentScreen === 'all' ? '#4B6BFB' : '#666'}
            />
            <Text style={[
              styles.CustomHeaderscreenText,
              currentScreen === 'all' && styles.CustomHeaderactiveScreenText
            ]}>
              {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
            </Text>
          </View>
        </View>

        {/* Icons Section */}
        <View style={styles.CustomHeaderrightSection}>
          {showRefresh && (
            <View style={styles.CustomHeadericonContainer}>
              <Ionicons name="refresh-outline" size={20} color="#666" />
            </View>
          )}

          {showSearch && (
            <View style={styles.CustomHeadersearchContainer}>
              <Ionicons name="search-outline" size={20} color="#666" />
              <Text style={styles.CustomHeadersearchText}>Search</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

