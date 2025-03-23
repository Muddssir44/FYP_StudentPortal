import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";
import CircularProgress from '../Components/CircularProgress';
import { styles } from '../Screens/StudentAcademicsView';

const GPATrendChart = ({ semesters }) => {
    const data = {
        labels: semesters.map(sem => `Sem ${sem.semester}`),
        datasets: [{
            data: semesters.map(sem => sem.gpa),
            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`, // Primary color
            strokeWidth: 2
        }]
    };

    return (
        <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>GPA Progression</Text>
                <Text style={styles.chartSubtitle}>Semester-wise Performance</Text>
            </View>
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#6C63FF"
                    },
                    propsForLabels: {
                        fontSize: 12,
                        fontWeight: '600'
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                withDots={true}
                withShadow={true}
                withInnerLines={true}
                withOuterLines={true}
                withVerticalLines={false}
                withHorizontalLines={true}
                horizontalLabelRotation={0}
                verticalLabelRotation={0}
                fromZero={true}
                segments={4}
            />
        </View>
    );
};

export default GPATrendChart;