import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { ChildProfile } from '../types';

// Mock data representing devices connected to the account
const mockDevices: ChildProfile[] = [
  { id: '1', name: 'Adam', age: 4, deviceId: 'esp32-001' },
  { id: '2', name: 'Sara', age: 7, deviceId: 'esp32-002' },
];

export default function DeviceSelectionScreen({ navigation }: any) {
  const handleSelectDevice = (device: ChildProfile) => {
    // In a real app, this would set the globally selected device in Context/Redux
    console.log('Selected device:', device.name);
    // Navigate to dashboard
    navigation.navigate('Dashboard', { device });
  };

  const renderItem = ({ item }: { item: ChildProfile }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectDevice(item)}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.childName}>{item.name}</Text>
        <Text style={styles.childDetails}>Age: {item.age} | Device: {item.deviceId}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Select a Child to Monitor</Text>
        <Text style={styles.subHeader}>Choose a connected bracelet</Text>
        
        <FlatList
          data={mockDevices}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
  },
  cardContent: {
    flex: 1,
  },
  childName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  childDetails: {
    fontSize: 14,
    color: '#64748B',
  },
});
