# WeatherWise - Personal Weather Assistant

## Project Overview
WeatherWise is a beautiful weather application that allows users to set comfort preferences and track weather conditions tailored to their personal health and comfort needs. The app features a stunning gradient background, glass morphism UI components, and responsive design.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn UI (Radix primitives)
- **Theme**: next-themes (light/dark mode support)
- **Maps**: Mapbox GL
- **State Management**: TanStack Query
- **Backend**: Express.js (for future API integration)

## Features
- **Location Search**: 
  - OpenStreetMap Nominatim API integration for geocoding
  - Auto-suggestion dropdown with debounced search (800ms delay)
  - Search by city name, address, or zip code
  - Returns up to 5 location results with full address details
  - Automatically provides coordinates for map visualization
- **Comfort Settings**:
  - Temperature preferences slider (-10°C to 45°C)
  - Humidity preferences (0% to 100%)
  - Air quality index threshold (0 to 100)
  - Respiratory conditions selector
- **Interactive Map**: Mapbox integration with dynamic location updates
- **Theme Toggle**: Beautiful light/dark mode with smooth transitions
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations

## Design System
### Colors
- **Primary**: Sky blue (#0080FF) for main actions and branding
- **Accent**: Bright cyan for highlights and secondary actions
- **Background**: Gradient from sky blue to ocean blue
- **Glass Cards**: Semi-transparent cards with backdrop blur

### Custom Animations
- `fade-in`: Smooth entry animation
- `slide-in`: Sliding transition
- `float`: Floating icon animation

### Custom Components
- `.glass-card`: Glass morphism effect with backdrop blur
- `.smooth-transition`: Consistent transition timing
- `.hover-lift`: Scale up on hover with shadow

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Navbar.tsx    # Navigation bar with theme toggle
│   │   ├── LocationSearch.tsx
│   │   ├── ComfortSettings.tsx
│   │   └── MapView.tsx
│   ├── pages/
│   │   ├── Index.tsx     # Main weather app page
│   │   └── not-found.tsx
│   ├── App.tsx           # Router and providers
│   └── index.css         # Custom styles and design tokens
server/
├── routes.ts             # API routes (for future backend)
└── storage.ts            # Data persistence layer
```

## Getting Started
1. The app runs on port 5000
2. For Mapbox functionality, you'll need a Mapbox access token
3. The app uses in-memory storage by default (can be upgraded to PostgreSQL)

## Recent Changes
- **2024-10-04**: Integrated OpenStreetMap Nominatim API for location auto-suggestion and geocoding
  - Added debounced search with 800ms delay (complies with Nominatim usage policy)
  - Implemented auto-suggestion dropdown with glass morphism styling
  - Connected geocoded coordinates to MapView for dynamic map updates
  - Added loading spinner during API calls
- Cloned from GitHub repository: breezy-blue-view
- Adapted from react-router-dom to wouter for routing
- Integrated with fullstack_js template structure
- Added ThemeProvider for dark mode support
- Configured custom Tailwind animations

## Future Enhancements
- Real weather API integration (OpenWeatherMap, Weather.gov)
- User authentication and saved preferences
- Historical weather data tracking
- Weather alerts and notifications
- Multi-location support
