'use client';

import { useEffect, useRef, useState } from 'react';

interface MapViewProps {
  address: string;
  googleMapsLoaded: boolean;
}

export default function MapView({ address, googleMapsLoaded }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current || !window.google?.maps?.Map) {
      console.log('Map not ready:', { googleMapsLoaded, hasRef: !!mapRef.current, hasGoogle: !!window.google });
      return;
    }

    console.log('Initializing map...');

    // Create map centered on US
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // Center of US
      zoom: 4,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'greedy',
    });

    mapInstanceRef.current = map;

    console.log('Map initialized');
  }, [googleMapsLoaded]);

  // Geocode and zoom to address when it changes
  useEffect(() => {
    if (!address || address.length < 10 || !mapInstanceRef.current || !window.google) return;

    console.log('Geocoding address:', address);
    setIsGeocoding(true);

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      setIsGeocoding(false);

      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;

        console.log('Geocoding successful:', location.lat(), location.lng());

        // Switch to satellite view
        mapInstanceRef.current?.setMapTypeId('satellite');

        // Zoom to the location
        mapInstanceRef.current?.setCenter(location);
        mapInstanceRef.current?.setZoom(20); // Close zoom for roof view

        // Remove old marker if exists
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Add marker
        const marker = new window.google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: address,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#F59E0B', // Gold color
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
        });

        markerRef.current = marker;
      } else {
        console.error('Geocoding failed:', status);
      }
    });
  }, [address]);

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Indicator */}
      {isGeocoding && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-navy">Locating property...</span>
        </div>
      )}

      {/* Default Message (when no address) */}
      {!address && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#e8f0f8] to-[#c5d9ef] pointer-events-none">
          <div className="text-center">
            <div className="text-[4rem] mb-4">🏠</div>
            <p className="text-navy font-serif text-2xl">Your solar journey starts here</p>
          </div>
        </div>
      )}
    </div>
  );
}
