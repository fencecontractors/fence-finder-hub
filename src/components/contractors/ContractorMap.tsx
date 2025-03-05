
import { useEffect, useRef, useState } from 'react';
import { Contractor } from '@/types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ContractorMapProps {
  contractor: Contractor;
  height?: string;
  zoom?: number;
}

const ContractorMap = ({ contractor, height = "400px", zoom = 14 }: ContractorMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { latitude, longitude, title, formatted_address } = contractor;

  // Function to load the map
  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    try {
      // Set access token
      mapboxgl.accessToken = mapboxToken;
      
      // Create new map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: zoom,
        attributionControl: true,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Add marker at contractor location
      marker.current = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3 class="font-medium">${title}</h3><p class="text-sm">${formatted_address}</p>`)
        )
        .addTo(map.current);
      
      // Show popup by default
      marker.current.togglePopup();
      
      map.current.on('load', () => {
        setIsLoaded(true);
      });
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load the map. Please check your Mapbox token.');
    }
  };

  useEffect(() => {
    // Cleanup function for map
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map when token changes
  useEffect(() => {
    if (mapboxToken && mapContainer.current && !map.current) {
      initializeMap();
    }
  }, [mapboxToken, latitude, longitude]);

  // Handle token input
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapboxToken') as string;
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapbox_token', token);
    }
  };

  // Check for token in localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-border/50 shadow-sm" style={{ height }}>
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40 p-4">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50 max-w-md w-full">
            <h3 className="font-medium mb-3">Enter your Mapbox Access Token</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To display the map, you need to provide a Mapbox access token. 
              Get yours at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">mapbox.com</a>.
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <input
                type="text"
                name="mapboxToken"
                placeholder="pk.eyJ1IjoieW91..."
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Save Token & Load Map
              </button>
            </form>
          </div>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40 p-4">
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive text-center">
            <p className="text-destructive font-medium">{error}</p>
            <button 
              onClick={() => {
                localStorage.removeItem('mapbox_token');
                setMapboxToken('');
                setError(null);
              }}
              className="mt-2 text-sm underline"
            >
              Change Mapbox token
            </button>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContractorMap;
