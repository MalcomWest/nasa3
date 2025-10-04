import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapViewProps {
  location: string;
}

const MapView = ({ location }: MapViewProps) => {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [markerPosition, setMarkerPosition] = useState({ lat: 40.7128, lng: -74.0060 });

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  };

  useEffect(() => {
    if (!location) return;

    const coords = location.split(',');
    if (coords.length === 2) {
      const lat = parseFloat(coords[0]);
      const lng = parseFloat(coords[1]);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        const newPosition = { lat, lng };
        setCenter(newPosition);
        setMarkerPosition(newPosition);
      }
    }
  }, [location]);

  const handleLoadMap = () => {
    if (googleApiKey.trim()) {
      setShowApiKeyInput(false);
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="glass-card p-4 sm:p-5 md:p-6 hover-lift animate-fade-in">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h2 className="text-lg sm:text-xl font-semibold">Location Map</h2>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            To view the interactive map, please enter your Google Maps API key.
            You can get one from{" "}
            <a
              href="https://console.cloud.google.com/google/maps-apis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Input
              data-testid="input-google-api-key"
              type="text"
              placeholder="Enter Google Maps API key..."
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
              className="flex-1 bg-background/50 border-2 focus:border-primary smooth-transition text-sm sm:text-base"
            />
            <Button
              data-testid="button-load-map"
              onClick={handleLoadMap}
              disabled={!googleApiKey.trim()}
              className="smooth-transition hover:scale-105 w-full sm:w-auto"
            >
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 sm:p-5 md:p-6 hover-lift animate-fade-in">
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h2 className="text-lg sm:text-xl font-semibold">Location Map</h2>
      </div>
      
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden border-2 border-primary/20">
        <LoadScript googleMapsApiKey={googleApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={mapOptions}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapView;
