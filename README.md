## Introduction of Finance App
A lightweight, intuitive, and modern mobile application designed to help users track their daily money habits, monitor savings goals, and understand spending patterns through visual insights.

# 🚀 Project Overview:
This app is built as a Personal Finance Companion (not a banking app). It focuses on simplicity and speed, allowing users to quickly log transactions, see their current financial health at a glance, and stay motivated toward their savings targets.

# ✨ Key Features
1. Home Dashboard
Summary Cards: Real-time calculation of Total Balance, Income, and Expenses.
Visual Progress: Integrated a "Savings Goal" progress bar to keep users engaged with their financial targets.
Recent Activity: A quick view of the latest transactions with distinct color coding for Income (+) and Expenses (-).

2. Transaction Management (Full CRUD)
Add/Edit: A unified form to create new entries or modify existing ones with pre-filled data.
Search & Filter: A dedicated search bar on the home screen to quickly find specific transactions by title.
Delete: Swipe-to-delete or trash icon functionality with a confirmation alert to prevent accidental data loss.

3. Smart Insights
Expense Breakdown: A dynamic Pie Chart that categorizes spending (Food, Shopping, Others) based on transaction titles.
Dynamic Tips: A "Smart Tip" system that gives contextual advice based on the user's spending habits (e.g., advising to Cook at home if Food expenses are high).

4. User Experience (UX) Polish
Loading States: Implemented Shimmer Effect (Skeleton screens) to provide a smooth feel during initial data hydration.
Empty States: Thoughtfully designed "No Data" screens with actionable prompts (CTA) when the transaction list is empty.
Modern UI: Used Linear Gradients, soft shadows, and a clean typography hierarchy for a premium mobile feel.


# 🛠 Tech Stack
1. Framework: React Native (CLI)
2. State Management: Redux Toolkit (for predictable state)
3. Persistence: Redux Persist + AsyncStorage (Offline-first approach)
4. Navigation: React Navigation (Stack & Bottom Tabs)
5. UI Components: React Native SVG, Chart Kit, Vector Icons, Linear Gradient.


# 📋 Assumptions & Product Thinking
During development, I made the following sensible assumptions:

1. Offline-First: Finance tracking should be instant. I chose Local Storage over a Cloud API to ensure the app works perfectly without internet, respecting user privacy.
2. Single Currency: The app defaults to ₹ (INR) for consistency in this version.
3. Keyword-Based Categorization: Instead of making the user select 20 different categories, the "Insights" engine automatically categorizes expenses based on keywords like "Food" or "Shop" to save user time.
4. Safety First: Critical actions like "Delete" always trigger a native confirmation alert.


# 🏗 Project Structure

src/
 ├── assets/          # Icons and Fonts
 ├── components/      # Reusable UI (Shimmer, Buttons, Cards)
 ├── navigation/      # Stack & Tab Navigators
 ├── redux/           # Slices (Transaction logic) and Store configuration
 ├── screens/         # Main Screen components (Home, Add, Insights)
 ├── utils/           # Global Theme (Colors, Sizes) and Constants


# 📥 Setup Instructions
-> Prerequisites
Node.js (>14)
React Native Environment Setup (Android Studio / Xcode)

-> Installation
1. Clone the repository:
git clone https://github.com/Shivangi-Space/FinanceApp.git
cd FinanceApp

2. Install Dependencies:
npm install

3. Link Icons (Android only):
Ensure apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" is in android/app/build.gradle.

4. Run the Application:

# For Android
npx react-native run-android

# For iOS
npx react-native run-ios


# 📈 Future Enhancements
1. Multi-Currency Support: Ability to switch between USD, EUR, etc.
2. Biometric Lock: Adding Fingerprint/FaceID for extra security.
3. Data Export: Exporting monthly reports in PDF/CSV format.

Developed by Shivangi Bangar. 