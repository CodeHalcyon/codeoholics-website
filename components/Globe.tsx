"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.1, 0.1],
        markers: [
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [28.6139, 77.2090], size: 0.1 }, // New Delhi, India
        { location: [40.7128, -74.006], size: 0.1 }, // New York
        { location: [48.8566, 2.3522], size: 0.1 }, // Paris
        { location: [51.5074, -0.1278], size: 0.1 }, // London
        { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
        { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
        { location: [-33.9249, 18.4241], size: 0.1 }, // Cape Town
        { location: [25.276987, 55.296249], size: 0.1 }, // Dubai
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 800, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
