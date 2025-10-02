# Agro Gestor ERP

## Overview
Agricultural ERP system built with React for managing plantations, resources, sales, HR, CRM, and agricultural operations. The system includes AI-powered analysis using Google Gemini and real-time weather data integration.

## Tech Stack
- **Frontend**: React 19.1.1 with Create React App
- **Backend/Database**: Firebase (Firestore for database, Authentication)
- **AI Integration**: Google Gemini 2.5 Flash for agricultural analysis
- **Weather API**: OpenWeatherMap for real-time weather data
- **Maps**: Leaflet for plantation area visualization
- **UI**: Tailwind CSS (via CDN), Chart.js for analytics
- **Additional**: React Router, Axios, React DnD

## Project Structure
```
src/
├── components/       # React components organized by feature
│   ├── analise/     # Cost analysis
│   ├── crm/         # Customer relationship management
│   ├── dashboard/   # Main dashboard
│   ├── financeiro/  # Sales and financial management
│   ├── layout/      # Navigation and layout
│   ├── mapa/        # Map visualization
│   ├── maquinario/  # Equipment management
│   ├── marketing/   # Rural producer marketing
│   ├── plantacoes/  # Plantation management
│   ├── receituario/ # Agronomic prescriptions
│   ├── recursos/    # Resource and input management
│   ├── rh/          # Human resources
│   ├── tasks/       # Task management
│   └── ui/          # Reusable UI components
├── config/          # Application constants
├── firebase/        # Firebase configuration and hooks
├── hooks/           # Custom React hooks for data management
├── services/        # External API services (Gemini, Weather)
├── utils/           # Helper functions and constants
├── App.js           # Main application component
└── index.js         # Application entry point
```

## Key Features
1. **Plantation Management**: Track crops, growth, and resource application
2. **Resource Management**: Manage inputs, fertilizers, and supplies
3. **Financial Module**: Sales tracking with AI-powered invoice simulation
4. **CRM**: Lead management with status tracking
5. **HR Module**: Team management with AI job description generation
6. **Equipment Management**: Track agricultural machinery
7. **Weather Integration**: Real-time weather and forecast data
8. **AI Analysis**: Agronomic analysis and resource planning using Gemini AI
9. **Interactive Maps**: Visualize plantation areas with Leaflet
10. **Task Management**: Organize agricultural operations

## Environment Configuration

### Required Environment Variables (.env)
```
REACT_APP_FIREBASE_API_KEY=<firebase-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<firebase-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<firebase-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<firebase-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<firebase-app-id>
REACT_APP_FIREBASE_MEASUREMENT_ID=<firebase-measurement-id>
REACT_APP_GEMINI_API_KEY=<gemini-api-key>
```

### Dev Server Configuration
The development server is configured to work with Replit's proxy:
- Port: 5000
- Host: 0.0.0.0
- Host check disabled for Replit iframe preview
- WebSocket port: 0 (uses dynamic port)

## Installation & Running

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```
The app will run on http://localhost:5000

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Recent Changes
- **2025-10-02**: Initial Replit setup
  - Configured dev server for Replit proxy compatibility
  - Added global error handler for Firebase abort errors
  - Set up workflow on port 5000

## Known Issues
- Minor Firebase "user aborted" errors appear in console (non-critical, handled globally)
- Using Tailwind via CDN (should migrate to PostCSS for production)

## API Dependencies
- Firebase Firestore for data persistence
- Google Gemini AI for agricultural analysis
- OpenWeatherMap for weather data
- Leaflet for map visualization

## Browser Compatibility
Supports modern browsers (Chrome, Firefox, Safari, Edge)
