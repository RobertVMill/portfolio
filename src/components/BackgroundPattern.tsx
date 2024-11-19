'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import { usePattern } from '@/context/PatternContext';

interface Point {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  baseColor: string;
  currentColor: string;
  targetColor: string;
  colorTransition: number;
  displayColor: string;
}

interface Connection {
  start: Point;
  end: Point;
  opacity: number;
  targetOpacity: number;
}

const BackgroundPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number>();
  const { isAnimating } = usePattern();

  const generatePoints = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: Point[] = [];
    const numPoints = Math.floor((canvas.width * canvas.height) / 15000); // Adjust density

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        rotation: Math.random() * Math.PI * 2,
        baseColor: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`, // Blue-ish base color
        currentColor: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
        targetColor: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
        colorTransition: 0,
        displayColor: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
      });
    }
    pointsRef.current = points;
  }, []);

  const generateConnections = useCallback(() => {
    const points = pointsRef.current;
    const connections: Connection[] = [];
    const maxConnections = 3; // Maximum connections per point

    points.forEach((point, i) => {
      const pointConnections: Connection[] = [];
      for (let j = i + 1; j < points.length; j++) {
        const distance = Math.hypot(points[j].x - point.x, points[j].y - point.y);
        if (distance < 100) { // Maximum distance for connection
          pointConnections.push({
            start: point,
            end: points[j],
            opacity: 0,
            targetOpacity: 0
          });
        }
        if (pointConnections.length >= maxConnections) break;
      }
      connections.push(...pointConnections);
    });
    connectionsRef.current = connections;
  }, []);

  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw points
    pointsRef.current.forEach(point => {
      if (isAnimating) {
        // Update color transition
        point.colorTransition += 0.05;
        if (point.colorTransition >= 1) {
          point.colorTransition = 0;
          point.currentColor = point.targetColor;
          point.targetColor = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`; // New target color
        }
        
        // Interpolate between current and target color
        const currentHue = parseInt(point.currentColor.match(/\d+/)![0]);
        const targetHue = parseInt(point.targetColor.match(/\d+/)![0]);
        const interpolatedHue = currentHue + (targetHue - currentHue) * point.colorTransition;
        point.displayColor = `hsl(${interpolatedHue}, 70%, 50%)`;
      } else {
        point.displayColor = point.baseColor;
      }

      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = point.displayColor;
      ctx.fill();
    });

    // Update and draw connections
    connectionsRef.current.forEach(connection => {
      if (isAnimating) {
        // Slowly increase opacity when animating
        connection.targetOpacity = 0.15;
      } else {
        connection.targetOpacity = 0;
      }
      
      // Smooth opacity transition
      connection.opacity += (connection.targetOpacity - connection.opacity) * 0.05;

      if (connection.opacity > 0.01) {
        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        ctx.strokeStyle = `rgba(100, 149, 237, ${connection.opacity})`; // Cornflower blue with opacity
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isAnimating]);

  useEffect(() => {
    generatePoints();
    generateConnections();
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[40vh] overflow-hidden -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-gray-900"
        style={{ opacity: 0.9 }}
      />
    </div>
  );
};

export default BackgroundPattern;
