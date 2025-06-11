// Ocean zones and their time/depth mappings
const ZONES = {
  SURFACE: { name: 'Surface', timeRange: [0, 30], depthRange: [0, 0] },
  EPIPELAGIC: { name: 'Epipelagic', timeRange: [30, 120], depthRange: [0, 200] },
  MESOPELAGIC: { name: 'Mesopelagic', timeRange: [120, 900], depthRange: [200, 1000] },
  BATHYPELAGIC: { name: 'Bathypelagic', timeRange: [900, 2700], depthRange: [1000, 4000] },
  ABYSSAL: { name: 'Abyssal', timeRange: [2700, Infinity], depthRange: [4000, 6000] }
};

// Calculate current zone and depth based on elapsed seconds
function calculateDepth(elapsedSeconds) {
  // Find the current zone
  const currentZone = Object.values(ZONES).find(zone => 
    elapsedSeconds >= zone.timeRange[0] && elapsedSeconds < zone.timeRange[1]
  ) || ZONES.ABYSSAL;

  // Calculate depth within the zone
  const zoneTimeRange = currentZone.timeRange[1] - currentZone.timeRange[0];
  const zoneDepthRange = currentZone.depthRange[1] - currentZone.depthRange[0];
  const timeInZone = elapsedSeconds - currentZone.timeRange[0];
  
  const depth = currentZone.depthRange[0] + 
    (timeInZone / zoneTimeRange) * zoneDepthRange;

  return {
    zone: currentZone.name,
    depth: Math.round(depth),
    elapsedSeconds
  };
}

// Get color for current depth
function getDepthColor(depth) {
  // Color gradient from surface to abyssal
  const colors = {
    0: 'rgba(0, 119, 182, 0.06)',    // Surface blue
    200: 'rgba(0, 105, 148, 0.06)',  // Epipelagic
    1000: 'rgba(0, 90, 117, 0.06)',  // Mesopelagic
    4000: 'rgba(0, 75, 93, 0.06)',   // Bathypelagic
    6000: 'rgba(0, 60, 73, 0.06)'    // Abyssal
  };

  // Find the two closest depth points
  const depths = Object.keys(colors).map(Number).sort((a, b) => a - b);
  const lowerDepth = depths.filter(d => d <= depth).pop() || 0;
  const upperDepth = depths.find(d => d > depth) || 6000;

  // Interpolate between the two colors
  const ratio = (depth - lowerDepth) / (upperDepth - lowerDepth);
  return colors[lowerDepth];
}

export { calculateDepth, getDepthColor, ZONES }; 