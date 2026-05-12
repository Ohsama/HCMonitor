import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function DashboardScreen({ route }: any) {
  const selectedDevice = route.params?.device || { name: 'Adam' };
  const [currentTemp, setCurrentTemp] = useState<number>(36.8);

  // Mocking real-time temperature updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate temperature around 36.5 to 37.5
      const fluctuation = (Math.random() - 0.5) * 0.4;
      setCurrentTemp(prev => Number((prev + fluctuation).toFixed(1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isFever = currentTemp >= 38.0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Monitoring {selectedDevice.name}</Text>

        {isFever && (
          <View style={styles.alertBanner}>
            <Text style={styles.alertText}>⚠️ HIGH TEMPERATURE ALERT!</Text>
            <Text style={styles.alertSubtext}>Please check on {selectedDevice.name} immediately.</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Temperature</Text>
          <Text style={[styles.tempValue, isFever ? styles.tempFever : styles.tempNormal]}>
            {currentTemp.toFixed(1)}°C
          </Text>
          <Text style={styles.statusText}>
            Status: {isFever ? 'Fever Detected' : 'Normal'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Temperature History</Text>
          <LineChart
            data={{
              labels: ['10:00', '10:15', '10:30', '10:45', '11:00', 'Now'],
              datasets: [{ data: [36.7, 36.8, 36.6, 36.7, 36.9, currentTemp] }]
            }}
            width={Dimensions.get('window').width - 80}
            height={220}
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '4', strokeWidth: '2', stroke: '#2563EB' }
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
  },
  alertBanner: {
    backgroundColor: '#FEE2E2',
    borderLeftWidth: 6,
    borderLeftColor: '#EF4444',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  alertText: {
    color: '#B91C1C',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertSubtext: {
    color: '#991B1B',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 16,
  },
  tempValue: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tempNormal: {
    color: '#10B981', // Green
  },
  tempFever: {
    color: '#EF4444', // Red
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#334155',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});
