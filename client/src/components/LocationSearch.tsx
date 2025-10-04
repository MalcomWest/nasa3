import { MapPin, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface LocationSearchProps {
  onLocationChange: (location: string) => void;
}

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    country?: string;
    postcode?: string;
  };
}

const LocationSearch = ({ onLocationChange }: LocationSearchProps) => {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(location);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          new URLSearchParams({
            q: debouncedQuery,
            format: 'json',
            addressdetails: '1',
            limit: '5',
          }),
          {
            headers: {
              'User-Agent': 'WeatherWise/1.0',
            },
          }
        );
        const data: NominatimResult[] = await response.json();
        setResults(data);
        setShowResults(data.length > 0);
      } catch (error) {
        console.error('Geocoding error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: NominatimResult) => {
    setLocation(result.display_name);
    onLocationChange(`${result.lat},${result.lon}`);
    setShowResults(false);
    setResults([]);
  };

  const handleSearch = () => {
    if (location.trim()) {
      if (results.length > 0) {
        handleSelect(results[0]);
      } else {
        onLocationChange(location);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="glass-card p-4 sm:p-5 md:p-6 hover-lift animate-fade-in" ref={wrapperRef}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h2 className="text-lg sm:text-xl font-semibold">Location</h2>
      </div>
      
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Input
              data-testid="input-location-search"
              type="text"
              placeholder="Enter city name or zip code..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => results.length > 0 && setShowResults(true)}
              className="flex-1 bg-background/50 border-2 focus:border-primary smooth-transition text-sm sm:text-base"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            )}
          </div>
          <Button
            data-testid="button-search-location"
            onClick={handleSearch}
            className="smooth-transition hover:scale-105 w-full sm:w-auto"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {showResults && results.length > 0 && (
          <div 
            data-testid="dropdown-location-results"
            className="absolute top-full left-0 right-0 sm:right-auto sm:min-w-[400px] mt-2 glass-card border-2 border-primary/20 rounded-md max-h-[300px] overflow-y-auto z-50 animate-slide-in"
          >
            {results.map((result) => (
              <button
                key={result.place_id}
                data-testid={`result-location-${result.place_id}`}
                onClick={() => handleSelect(result)}
                className="w-full text-left px-4 py-3 hover-elevate active-elevate-2 border-b border-border/10 last:border-0 smooth-transition"
              >
                <div className="font-medium text-sm sm:text-base mb-1">
                  {result.display_name.split(',')[0]}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                  {result.display_name}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
