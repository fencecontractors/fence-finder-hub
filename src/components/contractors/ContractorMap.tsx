
import { useEffect, useRef } from 'react';
import { Contractor } from '@/types';

interface ContractorMapProps {
  contractor: Contractor;
  height?: string;
  zoom?: number;
}

const ContractorMap = ({ contractor, height = "400px", zoom = 14 }: ContractorMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { latitude, longitude, title, formatted_address } = contractor;

  useEffect(() => {
    const loadMap = async () => {
      try {
        // In a real implementation, you would use a proper map library like Google Maps, Mapbox, or Leaflet
        // For this example, we'll just create a simple map element with an image and data
        if (mapContainer.current) {
          const mapElement = mapContainer.current;
          
          // Create a placeholder map with contractor info and coordinates
          mapElement.innerHTML = `
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-muted/40 backdrop-blur-sm text-center p-4">
              <div class="bg-card p-4 rounded-lg shadow-sm border border-border/50 max-w-sm">
                <h3 class="font-medium mb-1">${title}</h3>
                <p class="text-sm text-muted-foreground mb-2">${formatted_address}</p>
                <p class="text-xs font-mono">
                  Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
                </p>
                <div class="text-xs mt-4 text-muted-foreground">Map visualization would appear here in production</div>
              </div>
            </div>
          `;
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    loadMap();
  }, [latitude, longitude, title, formatted_address]);

  return (
    <div 
      ref={mapContainer} 
      className="relative w-full rounded-lg overflow-hidden border border-border/50 shadow-sm"  
      style={{ height }}
    />
  );
};

export default ContractorMap;
