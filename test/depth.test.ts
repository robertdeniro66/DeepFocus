import { describe, it, expect } from 'vitest';
import { calculateDepth, getZoneColor, type OceanZone } from '../src/utils/depth';

describe('calculateDepth', () => {
  it('should return Surface zone at 0 seconds', () => {
    const result = calculateDepth(0);
    expect(result.zone).toBe('Surface');
    expect(result.meters).toBe(0);
    expect(result.progress).toBe(0);
  });

  it('should transition to Epipelagic at 30 seconds', () => {
    const result = calculateDepth(30);
    expect(result.zone).toBe('Epipelagic');
    expect(result.meters).toBe(0);
    expect(result.progress).toBe(0);
  });

  it('should be in middle of Epipelagic at 75 seconds', () => {
    const result = calculateDepth(75);
    expect(result.zone).toBe('Epipelagic');
    expect(result.meters).toBe(100);
    expect(result.progress).toBe(0.5);
  });

  it('should transition to Mesopelagic at 2 minutes', () => {
    const result = calculateDepth(120);
    expect(result.zone).toBe('Mesopelagic');
    expect(result.meters).toBe(200);
    expect(result.progress).toBe(0);
  });

  it('should be in middle of Mesopelagic at 8.5 minutes', () => {
    const result = calculateDepth(510);
    expect(result.zone).toBe('Mesopelagic');
    expect(result.meters).toBe(600);
    expect(result.progress).toBe(0.5);
  });

  it('should transition to Bathypelagic at 15 minutes', () => {
    const result = calculateDepth(900);
    expect(result.zone).toBe('Bathypelagic');
    expect(result.meters).toBe(1000);
    expect(result.progress).toBe(0);
  });

  it('should be in middle of Bathypelagic at 30 minutes', () => {
    const result = calculateDepth(1800);
    expect(result.zone).toBe('Bathypelagic');
    expect(result.meters).toBe(2500);
    expect(result.progress).toBe(0.5);
  });

  it('should transition to Abyssal at 45 minutes', () => {
    const result = calculateDepth(2700);
    expect(result.zone).toBe('Abyssal');
    expect(result.meters).toBe(4000);
    expect(result.progress).toBe(0);
  });

  it('should cap Abyssal progress at 30 minutes', () => {
    const result = calculateDepth(3600);
    expect(result.zone).toBe('Abyssal');
    expect(result.meters).toBe(6000);
    expect(result.progress).toBe(1);
  });
});

describe('getZoneColor', () => {
  it('should return correct colors for each zone', () => {
    const zones: OceanZone[] = ['Surface', 'Epipelagic', 'Mesopelagic', 'Bathypelagic', 'Abyssal'];
    const colors = zones.map(zone => getZoneColor(zone, 0));
    
    expect(colors).toEqual([
      'rgb(173, 216, 230)', // Surface
      'rgb(0, 119, 182)',   // Epipelagic
      'rgb(0, 53, 102)',    // Mesopelagic
      'rgb(0, 24, 48)',     // Bathypelagic
      'rgb(0, 0, 0)',       // Abyssal
    ]);
  });
}); 