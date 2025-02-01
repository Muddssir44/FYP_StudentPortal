import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { Header } from '../Components/Header';
import Notification from '../Components/Notification';
import Card from '../Components/Card';
import ModernChart from '../Components/ModernChart';
import List from '../Components/List';
import Calendar from '../Components/Calendar';
import MetricsList from '../Components/MetricsList';
import styles from '../AdminPortal_Css';

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);
  const [statisticsData, setStatisticsData] = useState(null);
  const [studentStatsData, setStudentStatsData] = useState(null);
  const [listData, setListData] = useState([]); // Fix: lists to listData
  const [metricsData, setMetricsData] = useState([
    {
      id: 'metric1',
      title: 'Today Present Students',
      percentage: 0,
      color: '#6C63FF',
    },
    {
      id: 'metric2',
      title: 'Today Present Employees',
      percentage: 0,
      color: '#4FD1C5',
    },
    {
      id: 'metric3',
      title: 'This Month Fee Collection',
      percentage: 0,
      color: '#F6AD55',
    },
  ]);

  // Function to handle list item actions
  const handleListAction = (actionType, listId) => {
    switch (actionType) {
      case 'refresh':
        refreshListData(listId);
        break;
      case 'details':
        navigateToDetails(listId);
        break;
      case 'close':
        dismissList(listId);
        break;
      default:
        console.log(`Unhandled action: ${actionType}`);
    }
  };

  // Function to refresh specific list data
  const refreshListData = async (listId) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update list data
      setListData(prevData =>
        prevData.map(item =>
          item.id === listId
            ? { ...item, message: 'Updated content', isError: false }
            : item
        )
      );
    } catch (error) {
      console.error('Error refreshing list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to navigate to details
  const navigateToDetails = (listId) => {
    console.log(`Navigating to details for list: ${listId}`);
  };

  // Function to dismiss list
  const dismissList = (listId) => {
    setListData(prevData => prevData.filter(item => item.id !== listId));
  };

  // Initial data fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Simulated card data
        const cardData = [
          {
            id: 1,
            title: 'Total Students',
            value: 150,
            subtitle: 'This Month',
            additionalValue: 50,
            backgroundColor: '#6C63FF',
            icon: 'person',
          },
          {
            id: 2,
            title: 'Total Employees',
            value: 45,
            subtitle: 'This Month',
            additionalValue: 15,
            backgroundColor: '#89CFF0',
            icon: 'work',
          },
          {
            id: 3,
            title: 'Revenue',
            value: '$12,000',
            subtitle: 'This Month',
            additionalValue: '$5,000',
            backgroundColor: '#FF6B6B',
            icon: 'attach-money',
          },
          {
            id: 4,
            title: 'Total Profit',
            value: '$8,000',
            subtitle: 'This Month',
            additionalValue: '$3,000',
            backgroundColor: '#6BCB77',
            icon: 'trending-up',
          },
        ];

        // Simulated statistics data
        const incomeStats = {
          labels: ['Aug', 'Oct', 'Jan'],
          datasets: [
            {
              data: [500, 600, 800],
              color: () => '#FF6B6B',
            },
            {
              data: [700, 800, 1000],
              color: () => '#6BCB77',
            },
          ],
          legend: ['Expenses', 'Income'],
        };

        // Simulated student statistics
        const studentStats = {
          labels: ['Aug', 'Oct', 'Jan'],
          datasets: [
            {
              data: [200, 400, 700],
              color: () => '#6C63FF',
            },
          ],
          legend: ['Students'],
        };

        // Enhanced list data with unique IDs and more detailed structure
        const listData = [
          {
            title: 'Absent Students',
            date: 'Jan 10, 2025',
            attendanceMarked: false,
            illustration: '/api/placeholder/400/320',
          },
          {
            title: 'Absent Teachers',
            date: 'Jan 10, 2025',
            attendanceMarked: false,
            illustration: '/api/placeholder/400/320',
          }
        ];

        // Update all states
        setDashboardData(cardData);
        setStatisticsData(incomeStats);
        setStudentStatsData(studentStats);
        setListData(listData); // Fixed variable name
        setMetricsData([
          {
            id: 'metric1',
            title: 'Today Present Students',
            percentage: 85,
            color: '#6C63FF',
          },
          {
            id: 'metric2',
            title: 'Today Present Employees',
            percentage: 92,
            color: '#4FD1C5',
          },
          {
            id: 'metric3',
            title: 'This Month Fee Collection',
            percentage: 78,
            color: '#F6AD55',
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleMetricPress = (metric) => {
    console.log(`Metric pressed: ${metric.title}`);
    // Add navigation or modal logic here if needed
  };

  return (
    <ScrollView
      style={styles.Dashboardcontainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#6C63FF']} // Primary color
        />
      }
    >
      <Header onMenuPress={() => console.log('Menu opened')} />

      <View style={styles.DashboardcardRow}>
        {dashboardData.map((data) => (
          <View style={styles.DashboardcardContainer} key={data.id}>
            <Card {...data} />
          </View>
        ))}
      </View>

      <Notification
        message="Account isn't Verified."
        actionText="Verify now!"
        onAction={() => console.log('Verification action triggered')}
      />

      {statisticsData && (
        <ModernChart
          title="Income Statistics"
          type="line"
          data={statisticsData}
          onDetailsPress={() => console.log('Income details pressed')}
        />
      )}

      {studentStatsData && (
        <ModernChart
          title="Student Statistics"
          type="bar"
          data={studentStatsData}
          onDetailsPress={() => console.log('Student details pressed')}
        />
      )}


      <View style={styles.DashboardlistsContainer}>
        {listData.map((list, index) => (
          <List
            key={index}
            title={list.title}
            date={list.date}
            attendanceMarked={list.attendanceMarked}
            userInfo={list.userInfo}
            illustration={list.illustration}
            onAddAttendance={() => console.log(`Add attendance clicked for ${list.title}`)}
            onSendMessage={() => console.log(`Send message clicked for ${list.title}`)}
          />
        ))}
      </View>
      {/* MetricsList Component */}
      <MetricsList
        metrics={metricsData}
        onMetricPress={handleMetricPress}
      />

      <Calendar />
    </ScrollView>
  );
};

export default Dashboard;