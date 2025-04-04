AvatarCommerce Mobile App
Overview
AvatarCommerce is a mobile application that connects influencers with customers through AI-generated digital avatars. Influencers can create personalized digital twins that recommend products to customers, while customers can chat with these avatars and discover recommended products.
Features

Influencer Experience

Create digital avatars using HeyGen API integration
Track sales and engagement metrics
View detailed analytics and performance insights


Customer Experience

Chat with influencer avatars through text
Receive video responses from avatars
Browse and purchase recommended products



Project Structure
Copymy-app/
├── android/          # Android native code
├── ios/              # iOS native code
├── src/
│   ├── api/          # API services
│   │   ├── apiClient.ts             # Base API setup with Axios
│   │   ├── avatarApi.ts             # Avatar creation & management API
│   │   ├── chatApi.ts               # Chatbot interaction API
│   │   └── productApi.ts            # Product recommendations API
│   │
│   ├── assets/       # Images, fonts, etc.
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/   # Reusable UI components
│   │   ├── AvatarCard.tsx           # Avatar display component
│   │   ├── ChatBubble.tsx           # Message bubble for chat
│   │   ├── VideoPlayer.tsx          # Avatar video playback
│   │   └── ProductItem.tsx          # Product recommendation display
│   │
│   ├── navigation/   # App navigation
│   │   ├── AppNavigator.tsx         # Main app navigation
│   │   ├── AuthNavigator.tsx        # Authentication flow
│   │   └── TabNavigator.tsx         # Main tab navigation
│   │
│   ├── screens/      # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx      # User login
│   │   │   └── SignupScreen.tsx     # User registration
│   │   │
│   │   ├── influencer/
│   │   │   ├── DashboardScreen.tsx  # Influencer main dashboard
│   │   │   ├── AvatarCreateScreen.tsx # Create new avatar
│   │   │   └── StatisticsScreen.tsx # Sales & engagement metrics
│   │   │
│   │   ├── customer/
│   │   │   ├── ChatScreen.tsx       # Chat with avatar interface
│   │   │   └── ProductsScreen.tsx   # Product recommendations
│   │   │
│   │   └── settings/
│   │       └── SettingsScreen.tsx   # App settings
│   │
│   ├── store/        # State management
│   │   ├── authSlice.ts             # Authentication state
│   │   ├── avatarSlice.ts           # Avatar management state
│   │   ├── chatSlice.ts             # Chat history state
│   │   └── store.ts                 # Redux store configuration
│   │
│   ├── utils/        # Utility functions
│   │   ├── storage.ts               # Local storage utilities
│   │   ├── validation.ts            # Input validation
│   │   └── formatting.ts            # Text/data formatting
│   │
│   └── App.tsx       # Main app component
├── .gitignore
├── app.json          # App configuration
├── babel.config.js
├── package.json
├── README.md
└── tsconfig.json     # TypeScript config
Technology Stack

Framework: React Native
Language: TypeScript
State Management: Redux Toolkit
Navigation: React Navigation
Networking: Axios
Storage: AsyncStorage
Media Handling:

React Native Image Picker
React Native Video


UI Components: Custom components with React Native's core components

Backend Integration
The mobile app connects to a Python Flask backend that handles:

Authentication & User Management

User registration/login
Profile information management


Avatar Creation

Integration with HeyGen API to create digital twins
Avatar storage and management


Chatbot & Recommendations

Processing chat messages with LangChain
Product recommendations via Apify integration
Generating video responses with HeyGen API


Database

Supabase for user and avatar data storage



Setup Instructions
Prerequisites

Node.js (v14+)
Java Development Kit (JDK 11-17)
Android Studio with Android SDK
(Optional) Xcode for iOS development (Mac only)

Environment Setup

Java Development Kit (JDK) Setup:

Install JDK 17 from Oracle's website
Set JAVA_HOME environment variable:
Copy# Windows (PowerShell)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

# macOS/Linux
export JAVA_HOME=/path/to/jdk-17
export PATH=$JAVA_HOME/bin:$PATH



Android SDK Setup:

Install Android Studio
Install Android SDK Platform (API 31+)
Install Android SDK Build-Tools
Set ANDROID_HOME environment variable:
Copy# Windows (PowerShell)
$env:ANDROID_HOME = "C:\Users\USERNAME\AppData\Local\Android\Sdk"
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:Path"

# macOS/Linux
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools




Installation

Clone the repository:
Copygit clone https://github.com/yourusername/avatar-commerce-mobile.git
cd avatar-commerce-mobile

Install dependencies:
Copynpm install

Configure API endpoints:

Update the API base URL in src/api/apiClient.ts


(iOS only) Install CocoaPods dependencies:
Copycd ios
pod install
cd ..


Running the App
Android:
Copynpx react-native run-android
iOS (Mac only):
Copynpx react-native run-ios
Development Workflow

Authentication:

Users can sign up as either influencers or customers
JWT tokens are used for authentication


Influencer Flow:

Create avatar from photo upload
Monitor performance metrics
View sales and engagement statistics


Customer Flow:

Chat with influencer avatars
Receive product recommendations
View and purchase recommended products



API Integration
The app connects to the backend through several API endpoints:

Authentication: /login, /register
Avatar Management: /create-avatar, /influencers/:id
Chat: /chat (for both chatting and product recommendations)

Troubleshooting
Common Issues

Java Version Issues:

Make sure you're using JDK 17 (not JDK 24)
Check JAVA_HOME is correctly set


Android Emulator Issues:

Create a new AVD (Android Virtual Device) if none exists
Use x86_64 system images for better performance


Build Failures:

Run cd android && ./gradlew clean && cd .. to clean Gradle cache
Check that all dependencies are compatible with your React Native version


API Connection Issues:

Verify backend server is running
Check API URL configuration
Ensure network permissions are set in AndroidManifest.xml



Deployment
Android

Generate a signed APK:
Copycd android
./gradlew assembleRelease

The APK will be generated at android/app/build/outputs/apk/release/app-release.apk

iOS

Configure your app in Xcode
Set up your Apple Developer account
Create an archive and upload to the App Store

Contributing

Fork the repository
Create your feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add some amazing feature'
Push to the branch: git push origin feature/amazing-feature
Submit a pull request

License
This project is licensed under the MIT License.
Contact
For questions or support, contact: your-email@example.com