<div align="center">

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

# 🏥 HCMonitor

### Wearable Device for Wireless Real-Time Healthcare & Security Monitoring

*A professional-grade React Native mobile application enabling parents to remotely monitor their children's health vitals, GPS location, and receive AI-assisted health insights — all in real-time.*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Building for Android](#-building-for-android)
- [License](#-license)

---

## 🔍 Overview

**HCMonitor** is the companion mobile application for a custom IoT wearable device designed to keep children safe and healthy. The app provides parents with a real-time dashboard displaying live sensor data transmitted wirelessly from the wearable, including body temperature readings and precise GPS location tracking.

The system bridges the gap between wearable hardware and actionable health insights, offering an AI-powered chatbot interface for interpreting readings and providing guidance.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | PIN-based login with session management via React Context |
| 📊 **Real-Time Dashboard** | Live body temperature monitoring with historical chart visualization |
| 🗺️ **GPS Tracking** | Real-time child location on an interactive map with safe-zone alerts |
| 🤖 **AI Health Chatbot** | Conversational AI assistant for interpreting health data and answering parental queries |
| 📱 **Multi-Device Support** | Manage and switch between multiple registered wearable devices |
| 🔔 **Instant Alerts** | Threshold-based notifications for abnormal temperature or location events |
| 🌙 **Dark Mode UI** | Fully dark-themed, modern interface optimized for all-day readability |

---

## 🛠️ Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/) SDK 54
- **Language:** TypeScript 5.9
- **Navigation:** React Navigation v7 (Stack + Bottom Tabs)
- **Maps:** `react-native-maps`
- **Charts:** `react-native-chart-kit`
- **Location:** `expo-location`
- **State Management:** React Context API
- **Build Tool:** EAS (Expo Application Services)

---

## 📁 Project Structure

```
HCMonitor/
├── App/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx        # Authentication screen
│   │   │   ├── DashboardScreen.tsx    # Health vitals dashboard
│   │   │   ├── MapScreen.tsx          # GPS location tracking
│   │   │   ├── ChatbotScreen.tsx      # AI health assistant
│   │   │   └── DeviceSelectionScreen.tsx
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx       # Navigation configuration
│   │   ├── context/
│   │   │   └── AuthContext.tsx        # Authentication state
│   │   ├── components/                # Reusable UI components
│   │   ├── services/                  # API & data services
│   │   └── types/                     # TypeScript type definitions
│   ├── assets/                        # Icons, images, splash screen
│   ├── App.tsx
│   ├── app.json
│   ├── eas.json
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android emulator)

```bash
npm install -g expo-cli
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ohsama/HCMonitor.git
   cd HCMonitor/App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** *(if applicable)*
   ```bash
   cp .env.example .env
   # Edit .env with your configuration values
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device or emulator**
   ```bash
   # Android
   npm run android

   # iOS (macOS only)
   npm run ios

   # Web (preview)
   npm run web
   ```

---

## 📦 Building for Android

This project uses **EAS Build** for generating production-ready APK/AAB files.

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build a preview APK (local)
npm run build:apk

# Build for production (cloud)
eas build -p android --profile production
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

Copyright © 2026 KT

---

<div align="center">

Made with ❤️ as a Graduation Engineering Project

⭐ **Star this repo if you found it useful!** ⭐

</div>
