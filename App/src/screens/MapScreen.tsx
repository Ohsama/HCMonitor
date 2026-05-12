import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = 350;

// Mock child location (Algiers, Algeria)
const SAFE_ZONE = { latitude: 36.7538, longitude: 3.0588, radiusM: 300 };

function formatCoord(n: number, decimals = 4) {
  return n.toFixed(decimals);
}

function distanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MapScreen() {
  const [childLocation, setChildLocation] = useState({
    latitude: 36.7538,
    longitude: 3.0588,
  });
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChildLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.0002,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.0002,
      }));
      setTick(t => t + 1);
      setLastUpdated('Just now');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dist = distanceMeters(
    childLocation.latitude,
    childLocation.longitude,
    SAFE_ZONE.latitude,
    SAFE_ZONE.longitude
  );
  const inSafeZone = dist <= SAFE_ZONE.radiusM;

  // Simple dot position relative to a fake map canvas
  const dotX = 160 + (childLocation.longitude - SAFE_ZONE.longitude) * 80000;
  const dotY = 160 - (childLocation.latitude - SAFE_ZONE.latitude) * 80000;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>📍 Child Location</Text>
          <Text style={styles.subHeader}>Real-time GPS Tracking</Text>
        </View>

        {/* Status Badge */}
        <View style={[styles.statusBadge, inSafeZone ? styles.badgeSafe : styles.badgeAlert]}>
          <Ionicons
            name={inSafeZone ? 'shield-checkmark' : 'warning'}
            size={20}
            color={inSafeZone ? '#059669' : '#DC2626'}
          />
          <Text style={[styles.statusText, { color: inSafeZone ? '#059669' : '#DC2626' }]}>
            {inSafeZone ? 'Inside Safe Zone' : '⚠️ Outside Safe Zone!'}
          </Text>
        </View>

        {/* Mock Map Canvas */}
        <View style={styles.mapCanvas}>
          {/* Safe zone circle indicator */}
          <View style={styles.safeCircle} />
          {/* Safe zone label */}
          <Text style={styles.safeZoneLabel}>🏠 Safe Zone (300m)</Text>
          {/* Child dot */}
          <View
            style={[
              styles.childDot,
              {
                left: Math.max(10, Math.min(310, dotX)) - 12,
                top: Math.max(10, Math.min(310, dotY)) - 12,
              },
            ]}
          >
            <View style={styles.childDotCore} />
          </View>
          {/* Compass rose */}
          <Text style={styles.compass}>N ↑</Text>
        </View>

        {/* Location Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Ionicons name="person-circle" size={18} color="#3B82F6" /> Adam
          </Text>

          <View style={styles.row}>
            <Ionicons name="location" size={16} color="#64748B" />
            <Text style={styles.rowLabel}>Latitude</Text>
            <Text style={styles.rowValue}>{formatCoord(childLocation.latitude)}°N</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="location" size={16} color="#64748B" />
            <Text style={styles.rowLabel}>Longitude</Text>
            <Text style={styles.rowValue}>{formatCoord(childLocation.longitude)}°E</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="resize" size={16} color="#64748B" />
            <Text style={styles.rowLabel}>Distance from home</Text>
            <Text style={styles.rowValue}>{Math.round(dist)} m</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="time" size={16} color="#64748B" />
            <Text style={styles.rowLabel}>Last updated</Text>
            <Text style={styles.rowValue}>{lastUpdated}</Text>
          </View>
        </View>

        {/* Note */}
        <View style={styles.noteBox}>
          <Ionicons name="information-circle" size={16} color="#3B82F6" />
          <Text style={styles.noteText}>
            Live map view will be enabled in the native build with Google Maps configured.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingBottom: 32 },
  headerContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  header: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
  subHeader: { fontSize: 14, color: '#64748B', marginTop: 4 },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 16,
    padding: 14,
    borderRadius: 12,
  },
  badgeSafe: { backgroundColor: '#D1FAE5' },
  badgeAlert: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 15, fontWeight: '600' },

  mapCanvas: {
    marginHorizontal: 16,
    height: 320,
    backgroundColor: '#E8F4FD',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  safeCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: 60,
    left: 75,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.5)',
    borderStyle: 'dashed',
  },
  safeZoneLabel: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  childDot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childDotCore: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  compass: {
    position: 'absolute',
    top: 10,
    right: 14,
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  card: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowLabel: { flex: 1, fontSize: 14, color: '#64748B' },
  rowValue: { fontSize: 14, fontWeight: '600', color: '#1E293B' },

  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginHorizontal: 16,
    padding: 14,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
  },
  noteText: { flex: 1, fontSize: 13, color: '#3B82F6', lineHeight: 18 },
});
