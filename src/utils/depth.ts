export type OceanZone = 'Surface' | 'Epipelagic' | 'Mesopelagic' | 'Bathypelagic' | 'Abyssal';

export interface DepthInfo {
  zone: OceanZone;
  meters: number;
  progress: number; // 0-1 progress within the zone
}

const ZONE_BOUNDARIES = {
  Surface: { start: 0, end: 30 }, // 0-30 seconds
  Epipelagic: { start: 30, end: 120 }, // 30s-2min
  Mesopelagic: { start: 120, end: 900 }, // 2-15min
  Bathypelagic: { start: 900, end: 2700 }, // 15-45min
  Abyssal: { start: 2700, end: Infinity }, // 45min+
};

const DEPTH_RANGES = {
  Surface: { start: 0, end: 0 },
  Epipelagic: { start: 0, end: 200 },
  Mesopelagic: { start: 200, end: 1000 },
  Bathypelagic: { start: 1000, end: 4000 },
  Abyssal: { start: 4000, end: 6000 },
};

export function calculateDepth(elapsedSeconds: number): DepthInfo {
  // Find the current zone
  const zone = Object.entries(ZONE_BOUNDARIES).find(([_, range]) => 
    elapsedSeconds >= range.start && elapsedSeconds < range.end
  )?.[0] as OceanZone || 'Surface';

  const zoneBoundary = ZONE_BOUNDARIES[zone];
  const depthRange = DEPTH_RANGES[zone];

  // Calculate progress within the zone (0-1)
  const progress = zone === 'Abyssal' 
    ? Math.min(1, (elapsedSeconds - zoneBoundary.start) / 1800) // Cap at 30min in Abyssal
    : (elapsedSeconds - zoneBoundary.start) / (zoneBoundary.end - zoneBoundary.start);

  // Calculate current depth in meters
  const meters = Math.round(
    depthRange.start + (depthRange.end - depthRange.start) * progress
  );

  return {
    zone,
    meters,
    progress,
  };
}

export function getZoneColor(zone: OceanZone, progress: number): string {
  const colors = {
    Surface: 'rgb(173, 216, 230)', // Light blue
    Epipelagic: 'rgb(0, 119, 182)', // Medium blue
    Mesopelagic: 'rgb(0, 53, 102)', // Deep blue
    Bathypelagic: 'rgb(0, 24, 48)', // Dark blue
    Abyssal: 'rgb(0, 0, 0)', // Black
  };

  return colors[zone];
}

export function shouldThrottleAnimation(): boolean {
  if (!navigator.getBattery) return false;
  
  return navigator.getBattery().then(battery => {
    return !battery.charging;
  }).catch(() => false);
} 