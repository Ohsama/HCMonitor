export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  deviceId: string;
}

export interface SensorData {
  deviceId: string;
  temperature: number; // in Celsius
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  type: 'TEMPERATURE' | 'GEOFENCE' | 'BATTERY' | 'OTHER';
  message: string;
  timestamp: string;
  read: boolean;
}
