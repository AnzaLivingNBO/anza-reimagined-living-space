import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface RoomMapProps {
  location: string;
  neighbourhood: string;
  latitude?: number;
  longitude?: number;
  mapboxToken?: string;
}

const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoiYW56YWxpdmluZ25ibyIsImEiOiJjbWR0emZod3YxOWF5MmpzYWVsOGZsZzdwIn0.jou78c2_qlselxazx4Lecw';

// Coordinates for Nairobi neighbourhoods
const neighbourhoodCoordinates: Record<string, [number, number]> = {
  'kileleshwa': [36.7665, -1.2921],
  'westlands': [36.8095, -1.2630], 
  'lavington': [36.7698, -1.2921],
  'parklands': [36.8581, -1.2574]
};

export const RoomMap: React.FC<RoomMapProps> = ({ location, neighbourhood, latitude, longitude, mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    const token = mapboxToken || DEFAULT_MAPBOX_TOKEN;
    if (!token) return;

    // Get coordinates - use exact coordinates if available, otherwise fallback to neighborhood
    const coordinates: [number, number] = (latitude && longitude) 
      ? [longitude, latitude] 
      : neighbourhoodCoordinates[neighbourhood.toLowerCase()] || [36.8219, -1.2921]; // Default to Nairobi center

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: coordinates,
        zoom: 14,
        interactive: false, // Disable interaction for embedded maps
      });

      // Add a marker
      new mapboxgl.Marker({
        color: '#3B82F6', // Primary color
        scale: 0.8
      })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="font-medium">${location}</div><div class="text-sm text-gray-600">${neighbourhood}</div>`)
        )
        .addTo(map.current);

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [location, neighbourhood, latitude, longitude, mapboxToken]);

  const token = mapboxToken || DEFAULT_MAPBOX_TOKEN;
  if (!token) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-sm text-muted-foreground mb-1">📍 {neighbourhood}</div>
          <div className="text-xs text-muted-foreground">{location}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};