# Design Guidelines: Breezy Blue View Weather App

## Design Approach: Reference-Based

**Selected References**: Apple Weather, Weather.com, Weatherstack
**Rationale**: Weather applications require a balance of visual appeal (atmospheric imagery, dynamic conditions) and utility (quick data access, forecast readability). Drawing inspiration from industry leaders ensures familiar, intuitive patterns while allowing creative expression through weather-specific visual elements.

**Core Design Principles**:
- Information hierarchy: Current conditions prominent, forecasts easily scannable
- Atmospheric immersion: Weather conditions reflected in UI colors and imagery
- Data clarity: Typography optimized for quick number/text parsing
- Responsive fluidity: Seamless experience across all devices

---

## Color Palette

### Dynamic Weather-Based Colors
**Primary Colors** (adapt to weather conditions):
- Clear/Sunny: 200 85% 65% (bright sky blue)
- Cloudy: 210 15% 55% (muted gray-blue)
- Rainy: 220 25% 45% (darker blue-gray)
- Night: 230 35% 25% (deep blue-black)

**Accent Colors**:
- Temperature warm: 25 90% 60% (vibrant orange for heat indicators)
- Temperature cold: 195 75% 55% (cool cyan for cold indicators)
- Alert/Warning: 15 85% 55% (weather alert orange-red)

**Neutral Foundation**:
- Background light: 0 0% 98%
- Background dark: 220 25% 12%
- Text light: 0 0% 100%
- Text dark: 220 15% 15%
- Card/Surface: Semi-transparent overlays with backdrop blur

---

## Typography

**Font Stack**: 
- Primary: 'Inter' (Google Fonts) - temperature displays, headings, labels
- Secondary: 'Space Mono' (Google Fonts) - data values, timestamps

**Scale**:
- Hero temperature: text-7xl md:text-8xl lg:text-9xl font-light
- Location: text-2xl md:text-3xl font-medium
- Section headings: text-xl md:text-2xl font-semibold
- Forecast labels: text-sm font-medium uppercase tracking-wide
- Data values: text-base md:text-lg font-mono
- Body text: text-sm md:text-base

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4 md:p-6 lg:p-8
- Section gaps: gap-6 md:gap-8 lg:gap-12
- Card spacing: space-y-4 md:space-y-6
- Grid gaps: gap-4 md:gap-6

**Container Strategy**:
- Full-width weather hero: w-full min-h-screen
- Content wrapper: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Forecast cards: max-w-sm to max-w-md per card

---

## Component Library

### Hero Section (Current Weather)
- Full-viewport atmospheric background image matching weather conditions
- Large temperature display (center or left-aligned)
- Location with geolocation icon
- Current condition icon (animated SVG - use Lucide React icons)
- "Feels like", humidity, wind speed in compact pill badges with blur backdrop
- Sunrise/sunset times with icons
- Search bar (subtle, glass-morphism style) for location changes

### Hourly Forecast
- Horizontal scroll carousel on mobile
- Grid layout on tablet/desktop (grid-cols-6 lg:grid-cols-12)
- Each card: time, weather icon, temperature
- Subtle hover elevation (translate-y-1)
- Background: semi-transparent cards with border

### Daily Forecast (7-Day)
- Vertical list or 2-column grid on mobile
- 3-4 column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Each card: day name, weather icon, high/low temperatures, precipitation chance
- Expandable details (optional click for hourly breakdown within day)

### Weather Details Grid
- 2x2 grid on mobile, 3-4 columns on desktop
- Stat cards for: UV Index, Visibility, Pressure, Air Quality, Precipitation
- Icon + label + value layout
- Color-coded indicators (UV index colors, AQI scale)

### Location Search/Autocomplete
- Dropdown with recent searches and suggestions
- Geolocation quick-access button
- Glass-morphism styling with backdrop-filter blur

### Additional Sections
- Weather alerts banner (if applicable) with warning colors
- Weather map integration placeholder (can use static map image or Mapbox/Google Maps embed)
- Historical temperature graph (simple line chart using Recharts or similar)

---

## Visual Effects & Animations

**Atmospheric Backgrounds**:
- Dynamic gradient overlays matching weather conditions
- Subtle particle effects for rain/snow (very minimal, performance-conscious)
- Time-of-day lighting adjustments (sunrise oranges, sunset purples, night darks)

**Micro-interactions**:
- Temperature number count-up animation on load
- Weather icon subtle float/pulse animations
- Card hover: slight scale (scale-105) and shadow enhancement
- Smooth transitions: transition-all duration-300 ease-in-out

**Loading States**:
- Skeleton screens for forecast cards
- Shimmer effect for data loading
- Smooth fade-in when data populates

---

## Images

**Hero Background Image**:
- Large, high-quality atmospheric photography matching current weather
- Examples: clear blue sky with clouds, dramatic storm clouds, sunset/sunrise, night sky
- Applied with overlay gradient for text readability
- Image source: Unsplash or Pexels (weather/sky categories)
- Implementation: Full-screen background with object-cover, fixed positioning

**Weather Condition Icons**:
- Use Lucide React icon library for consistency
- Icons: Sun, Cloud, CloudRain, CloudSnow, Wind, CloudDrizzle, CloudLightning, Moon, etc.
- Size range: w-12 h-12 to w-24 h-24 for main display
- Color: Inherit from weather-based color palette

**Location/Map Visuals**:
- Static map image or interactive embed showing weather overlay
- Placed in dedicated section below forecasts
- Dimensions: Full width on mobile, max-w-4xl on desktop

---

## Responsive Design

**Mobile (< 768px)**:
- Single column layout
- Stacked forecast cards
- Compact header with essential info only
- Horizontal scroll for hourly forecast
- Touch-optimized tap targets (min 44px)

**Tablet (768px - 1024px)**:
- 2-column forecast grids
- Expanded header with more details
- Side-by-side hourly/daily forecasts

**Desktop (> 1024px)**:
- Multi-column layouts (3-4 columns)
- Sidebar for additional weather data
- Larger typography and spacing
- Parallax subtle effects on scroll (very minimal)

---

## Accessibility

**Color Contrast**: WCAG AA minimum (4.5:1 for text)
**Dark Mode**: Full implementation with inverted color schemes, maintain weather-based color shifts
**Keyboard Navigation**: All interactive elements accessible via Tab
**Screen Readers**: Proper ARIA labels for weather icons, temperature units, forecast cards
**Text Inputs**: Clear focus states with ring-2 ring-primary

---

## Technical Specifications

**Icons**: Lucide React (via CDN or npm package)
**Fonts**: Google Fonts - Inter & Space Mono
**Charts**: Recharts for temperature/precipitation graphs
**Maps**: Static image initially, Mapbox GL JS for interactive version
**State Management**: React hooks (useState, useEffect) for weather data
**API Integration**: OpenWeatherMap or similar weather API (mock data acceptable for prototype)

---

This weather app design balances aesthetic beauty with functional clarity, creating an immersive experience that makes checking the weather both informative and delightful.