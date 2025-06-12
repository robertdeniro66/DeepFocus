import * as React from 'react';
import { useDepthTimer } from './useDepthTimer';
import { getZoneColor } from '../utils/depth';
import InfoPanel from './InfoPanel';
import fauna from '../data/fauna.json';
import i18n from '../i18n/en.json';

const DEFAULT_OPACITY = 0.06;
const BOOSTED_OPACITY = 0.10;

// Add zone characteristics for each zone
const ZONE_CHARACTERISTICS: Record<string, string> = {
  Surface: "Bright, well-lit waters where photosynthesis occurs.",
  Epipelagic: "The sunlit zone where most ocean life is found. Many fish, turtles, and marine mammals live here.",
  Mesopelagic: "The twilight zone where light begins to fade. Many species here migrate vertically daily.",
  Bathypelagic: "The midnight zone, pitch dark and cold. Home to bioluminescent creatures and large predators.",
  Abyssal: "The abyss, near freezing and high pressure. Life here is adapted to extreme conditions."
};

const DEPTH_RANGES = {
  Surface: { start: 0, end: 0 },
  Epipelagic: { start: 0, end: 200 },
  Mesopelagic: { start: 200, end: 1000 },
  Bathypelagic: { start: 1000, end: 4000 },
  Abyssal: { start: 4000, end: 6000 },
};

function isLightPage() {
  // Simple heuristic: check background color brightness
  const bg = window.getComputedStyle(document.body).backgroundColor;
  if (!bg) return false;
  const rgb = bg.match(/\d+/g)?.map(Number) || [255,255,255];
  const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000;
  return brightness > 220;
}

const Overlay: React.FC = () => {
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [idleTimeout, setIdleTimeout] = React.useState(300); // 5 min default
  const [overlayOn, setOverlayOn] = React.useState(true);
  const [colorBlind, setColorBlind] = React.useState(false);
  const [depthInfo, idle] = useDepthTimer(panelOpen || !overlayOn, idleTimeout, () => {/* onIdle */});

  // Keyboard shortcuts
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey && e.code === 'KeyO') setOverlayOn(o => !o);
      if (e.altKey && e.code === 'KeyI') setPanelOpen(p => !p);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Overlay opacity
  const opacity = isLightPage() ? BOOSTED_OPACITY : DEFAULT_OPACITY;

  // Find fauna for current zone
  const faunaZone = fauna.find(z => z.zone === depthInfo.zone);

  // Badge label
  const badgeLabel = i18n.badge.meters
    .replace('{{zone}}', i18n.badge[depthInfo.zone.toLowerCase() as keyof typeof i18n.badge])
    .replace('{{meters}}', depthInfo.meters.toString());

  // Shadow DOM disables pointer events by default, so re-enable for badge/panel
  const pointerEvents = overlayOn ? 'auto' : 'none';

  // Get depth range string for the current zone
  const depthRange = DEPTH_RANGES[depthInfo.zone]
    ? `${DEPTH_RANGES[depthInfo.zone].start}\u2013${DEPTH_RANGES[depthInfo.zone].end}`
    : '';

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-[2147483647]"
      style={{
        background: getZoneColor(depthInfo.zone, depthInfo.progress),
        opacity,
        transition: 'background 1s, opacity 0.5s',
        pointerEvents,
      }}
      aria-hidden={!overlayOn}
    >
      {/* Floating badge */}
      {overlayOn && (
        <button
          className={`absolute top-6 right-6 px-4 py-2 rounded-full shadow-lg bg-white/80 text-gray-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400 ${colorBlind ? 'border-2 border-black' : ''}`}
          style={{ pointerEvents: 'auto' }}
          aria-label={badgeLabel}
          onClick={() => setPanelOpen(p => !p)}
        >
          {badgeLabel}
        </button>
      )}
      {/* Info Panel */}
      {panelOpen && (
        <InfoPanel
          open={panelOpen}
          onClose={() => setPanelOpen(false)}
          zone={depthInfo.zone}
          meters={depthInfo.meters}
          fauna={faunaZone?.species || []}
          zoneChar={ZONE_CHARACTERISTICS[depthInfo.zone] || ''}
          depthRange={depthRange}
        />
      )}
    </div>
  );
};

export default Overlay; 