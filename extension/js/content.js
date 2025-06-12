// Ocean zones and their timing
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

const ZONE_COLORS = {
  Surface: 'rgb(173, 216, 230)', // Light blue
  Epipelagic: 'rgb(0, 119, 182)', // Medium blue
  Mesopelagic: 'rgb(0, 53, 102)', // Deep blue
  Bathypelagic: 'rgb(0, 24, 48)', // Dark blue
  Abyssal: 'rgb(0, 0, 0)', // Black
};

// Define gradients for each zone
const ZONE_GRADIENTS = {
  Surface: 'linear-gradient(180deg, rgba(229,247,255,0) 0%, rgba(229,247,255,1) 25%, #7EC8E3 100%)',
  Epipelagic: 'linear-gradient(180deg, rgba(229,247,255,0) 0%, #E5F7FF 25%, #7EC8E3 60%, #2563EB 100%)',
  Mesopelagic: 'linear-gradient(180deg, rgba(229,247,255,0) 0%, #7EC8E3 25%, #2563EB 80%, #0B1A2F 100%)',
  Bathypelagic: 'linear-gradient(180deg, rgba(229,247,255,0) 0%, #2563EB 25%, #0B1A2F 100%)',
  Abyssal: 'linear-gradient(180deg, rgba(229,247,255,0) 0%, #0B1A2F 25%, #000814 100%)'
};

// Fauna data
const FAUNA = [
  {
    zone: "Surface",
    depthRangeMeters: "0",
    species: [
      {
        name: "Surface Waters",
        fact: "The ocean surface is where most marine life begins its journey.",
        learnMore: "https://oceanservice.noaa.gov/facts/light_travel.html"
      }
    ]
  },
  {
    zone: "Epipelagic",
    depthRangeMeters: "0-200",
    species: [
      {
        name: "Green Sea Turtle",
        fact: "Migrates up to 2 600 km between nesting and feeding grounds.",
        learnMore: "https://www.fisheries.noaa.gov/species/green-turtle"
      },
      {
        name: "Short-Beaked Common Dolphin",
        fact: "Can reach speeds of 60 km/h in short bursts.",
        learnMore: "https://www.fisheries.noaa.gov/species/short-beaked-common-dolphin"
      }
    ]
  },
  {
    zone: "Mesopelagic",
    depthRangeMeters: "200-1 000",
    species: [
      {
        name: "Lanternfish",
        fact: "Accounts for roughly 65 % of all deep-sea fish biomass.",
        learnMore: "https://oceanexplorer.noaa.gov/explorations/islands01/log/sep20/media/lanternfish.html"
      },
      {
        name: "Humboldt Squid",
        fact: "Displays flashes of red and white when hunting.",
        learnMore: "https://oceanexplorer.noaa.gov/explorations/06davidson/logs/summary/media/squid_600.html"
      },
      {
        name: "Vampire Squid",
        fact: "Neither squid nor octopus, but its own unique order.",
        learnMore: "https://en.wikipedia.org/wiki/Vampire_squid"
      }
    ]
  },
  {
    zone: "Bathypelagic",
    depthRangeMeters: "1 000-4 000",
    species: [
      {
        name: "Giant Isopod",
        fact: "Can survive five years without food in captivity.",
        learnMore: "https://oceanexplorer.noaa.gov/facts/isopod.html"
      },
      {
        name: "Bluntnose Sixgill Shark",
        fact: "One of the few sharks with six gill slits.",
        learnMore: "https://www.fisheries.noaa.gov/feature-story/revealing-unknowns-unusual-catch"
      }
    ]
  },
  {
    zone: "Abyssal",
    depthRangeMeters: "4 000-6 000",
    species: [
      {
        name: "Tripod Fish (Bathypterois viridensis)",
        fact: "Perches on the seafloor using elongated fin rays.",
        learnMore: "https://oceanexplorer.noaa.gov/okeanos/explorations/ex1811/dailyupdates/nov6/nov6.html"
      },
      {
        name: "Swimming Sea Cucumber (Enypniastes eximia)",
        fact: "Scavenges marine snow with feathery tentacles.",
        learnMore: "https://oceanexplorer.noaa.gov/okeanos/explorations/ex1811/logs/nov7/welcome.html"
      }
    ]
  }
];

// Map species to image filenames
const SPECIES_IMAGES = {
  'Green Sea Turtle': 'images/Green sea turtle_0-200m-epipelagic.jpeg',
  'Lanternfish': 'images/Lanternfish-200-1000m-mesopelagic.jpeg',
  'Giant Isopod': 'images/Giant isopod-1000-4000m-mesopelagic.jpeg',
  'Deep-Sea Blackfish': 'images/Deep-sea blackfish-4000-6000m-abyssal.jpeg'
};

// UI text
const UI_TEXT = {
  badge: {
    surface: "Ocean Surface",
    epipelagic: "Epipelagic",
    mesopelagic: "Mesopelagic",
    bathypelagic: "Bathypelagic",
    abyssal: "Abyssal",
    meters: "{meters} m • {time}s"
  },
  infoPanel: {
    title: "Ocean Life at this Depth",
    close: "Close",
    learnMore: "Learn more",
    noFauna: "No fauna data for this zone."
  }
};

// Add zone characteristics for each zone
const ZONE_CHARACTERISTICS = {
  Surface: "Bright, well-lit waters where photosynthesis occurs.",
  Epipelagic: "The sunlit zone where most ocean life is found. Many fish, turtles, and marine mammals live here.",
  Mesopelagic: "The twilight zone where light begins to fade. Many species here migrate vertically daily.",
  Bathypelagic: "The midnight zone, pitch dark and cold. Home to bioluminescent creatures and large predators.",
  Abyssal: "The abyss, near freezing and high pressure. Life here is adapted to extreme conditions."
};

const PANEL_INFO_TEXT = `
  <strong>As you spend time on this page, you'll descend through the ocean layers:</strong><br><br>
  <b>Surface (0-30 seconds):</b> Bright, clear water<br>
  <b>Epipelagic Zone (0.5-2 minutes):</b> Sunlight zone with dolphins and sea turtles<br>
  <b>Mesopelagic Zone (2-15 minutes):</b> Twilight zone with lanternfish<br>
  <b>Bathypelagic Zone (15-45 minutes):</b> Midnight zone with giant isopods<br>
  <b>Abyssal Zone (45+ minutes):</b> Deep ocean with tripod fish<br><br>
  The floating depth badge in the corner shows your current depth and can be clicked to open an information panel with fascinating facts about the creatures found at your current depth.
`;

// Calculate depth info
function calculateDepth(elapsedSeconds) {
  const zone = Object.entries(ZONE_BOUNDARIES).find(([_, range]) => 
    elapsedSeconds >= range.start && elapsedSeconds < range.end
  )?.[0] || 'Surface';

  const zoneBoundary = ZONE_BOUNDARIES[zone];
  const depthRange = DEPTH_RANGES[zone];

  const progress = zone === 'Abyssal' 
    ? Math.min(1, (elapsedSeconds - zoneBoundary.start) / 1800)
    : (elapsedSeconds - zoneBoundary.start) / (zoneBoundary.end - zoneBoundary.start);

  const meters = Math.round(
    depthRange.start + (depthRange.end - depthRange.start) * progress
  );

  return { zone, meters, progress };
}

// Create and mount overlay
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'deepfocus-overlay';
  document.body.appendChild(overlay);

  const badge = document.createElement('button');
  badge.className = 'deepfocus-badge';
  badge.setAttribute('aria-label', '');
  document.body.appendChild(badge);

  return { overlay, badge };
}

// Create info panel
function createInfoPanel() {
  const panel = document.createElement('div');
  panel.className = 'deepfocus-info-panel';
  panel.style.display = 'none';
  
  panel.innerHTML = `
    <button class="close-button" aria-label="Close">×</button>
    <div class="zone"></div>
    <div class="species-list"></div>
  `;
  
  document.body.appendChild(panel);
  return panel;
}

let panelUpdateInterval = null;
let lastPanelZone = null;

// Update info panel content
function updateInfoPanel(panel, zone, fauna, meters) {
  const zoneEl = panel.querySelector('.zone');
  const speciesList = panel.querySelector('.species-list');
  lastPanelZone = zone;

  // Panel header (always show current zone)
  let zoneTitle = zone === 'Surface' ? 'Ocean Surface' : zone;
  let zoneSub;
  let maxDepth = DEPTH_RANGES[zone].end || 1;
  let pct = Math.max(0, Math.min(100, (meters / maxDepth) * 100));
  if (zone === 'Surface') {
    zoneSub = `As you spend time on this page, you'll descend through the ocean layers.`;
  } else {
    zoneSub = `Depth: ${DEPTH_RANGES[zone].start.toLocaleString()}${DEPTH_RANGES[zone].end ? `–${DEPTH_RANGES[zone].end.toLocaleString()}` : ''}m • Current: <span class="df-current-depth">${meters}m</span>`;
  }
  zoneEl.innerHTML = `
    <div class="df-zone-title">${zoneTitle}</div>
    <div class="df-zone-sub">${zoneSub}</div>
  `;

  // Marine life section
  const zoneFauna = FAUNA.find(z => z.zone === zone);
  if (!zoneFauna?.species.length) {
    speciesList.innerHTML = `<div>${UI_TEXT.infoPanel.noFauna}</div>`;
  } else if (zone === 'Surface') {
    // Special card for surface
    const s = zoneFauna.species[0];
    speciesList.innerHTML = `
      <div class="df-marine-title">Marine Life at This Depth</div>
      <div class="df-species-card">
        <div class="df-species-header">
          <span class="df-species-name">${s.name}</span>
        </div>
        <div class="df-species-fact">${s.fact}</div>
        <a href="${s.learnMore}" class="df-learn-more" target="_blank" rel="noopener"><span class="emoji">🌊</span> Learn more</a>
      </div>
    `;
  } else {
    speciesList.innerHTML = `
      <div class="df-marine-title">Marine Life at This Depth</div>
      ${zoneFauna.species.map(species => {
        const emoji = getSpeciesEmoji(species.name);
        return `
          <div class="df-species-card">
            <div class="df-species-header">
              <span class="df-species-name">${species.name}</span>
            </div>
            <div class="df-species-fact">${species.fact}</div>
            <a href="${species.learnMore || 'https://www.noaa.gov/'}" class="df-learn-more" target="_blank" rel="noopener"><span class="emoji">${emoji}</span> Learn more</a>
          </div>
        `;
      }).join('')}
    `;
  }

  // Zone characteristics
  const zoneChar = ZONE_CHARACTERISTICS[zone] || '';
  if (!panel.querySelector('.df-zone-char')) {
    const charDiv = document.createElement('div');
    charDiv.className = 'df-zone-char';
    panel.appendChild(charDiv);
  }
  panel.querySelector('.df-zone-char').innerHTML = `
    <div class="df-zone-char-title">Zone Characteristics</div>
    <div class="df-zone-char-desc">${zoneChar}</div>
  `;

  // Remove panel footer and subtext if present
  const footer = panel.querySelector('.df-panel-footer');
  if (footer) footer.remove();
  const subtext = panel.querySelector('.df-panel-subtext');
  if (subtext) subtext.remove();
}

// Main initialization
function init() {
  const { overlay, badge } = createOverlay();
  const infoPanel = createInfoPanel();
  
  let elapsedSeconds = 0;
  let timer = null;
  let isInfoPanelOpen = false;
  let isInitialized = false;
  
  // Update depth and UI
  function update() {
    const { zone, meters } = calculateDepth(elapsedSeconds);
    // Overlay color/gradient logic for surface and depth
    if (zone === 'Surface' && meters < 10) {
      overlay.style.transition = 'background 1s';
      overlay.style.background = ZONE_GRADIENTS.Surface;
    } else {
      overlay.style.transition = 'background 1s';
      overlay.style.background = ZONE_GRADIENTS[zone];
    }

    // Pre-dive state: show 'Preparing to dive…' and bubbles if depth === 0
    const isPreDive = meters === 0;
    if (isPreDive) {
      badge.innerHTML = `
        <div class="df-badge-label">${UI_TEXT.badge[zone.toLowerCase()]}</div>
        <p class="pre-dive-row">
          <span class="arrow animate-bounce-slow">⬇︎</span>
          <span class="arrow animate-bounce-slow delay-200">⬇︎</span>
          <span class="arrow animate-bounce-slow delay-400">⬇︎</span>
          <span class="animate-fadeOut">Preparing&nbsp;to&nbsp;dive…</span>
        </p>
      `;
    } else {
      badge.innerHTML = `
        <div class="df-badge-label">${UI_TEXT.badge[zone.toLowerCase()]}</div>
        <div class="df-badge-depth">${meters} m&nbsp;deep</div>
      `;
    }
  }
  
  // Start timer
  function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
      elapsedSeconds++;
      update();
    }, 1000);
  }
  
  // Reset timer
  function resetTimer() {
    elapsedSeconds = 0;
    update();
  }
  
  // Toggle info panel
  function toggleInfoPanel() {
    isInfoPanelOpen = !isInfoPanelOpen;
    infoPanel.style.display = isInfoPanelOpen ? 'block' : 'none';
    badge.style.display = isInfoPanelOpen ? 'none' : '';
    if (isInfoPanelOpen) {
      const { zone, meters } = calculateDepth(elapsedSeconds);
      updateInfoPanel(infoPanel, zone, FAUNA, meters);
      // Start interval to update current depth in panel
      panelUpdateInterval = setInterval(() => {
        const { zone: liveZone, meters: liveMeters } = calculateDepth(elapsedSeconds);
        // Only update if still open
        if (isInfoPanelOpen) {
          // Update the header zone and current depth
          const zoneEl = infoPanel.querySelector('.zone');
          if (zoneEl) {
            let liveZoneTitle = liveZone === 'Surface' ? 'Ocean Surface' : liveZone;
            let liveZoneSub;
            let maxDepth = DEPTH_RANGES[liveZone].end || 1;
            let pct = Math.max(0, Math.min(100, (liveMeters / maxDepth) * 100));
            if (liveZone === 'Surface') {
              liveZoneSub = `As you spend time on this page, you'll descend through the ocean layers.`;
            } else {
              liveZoneSub = `Depth: ${DEPTH_RANGES[liveZone].start.toLocaleString()}${DEPTH_RANGES[liveZone].end ? `–${DEPTH_RANGES[liveZone].end.toLocaleString()}` : ''}m • Current: <span class="df-current-depth">${liveMeters}m</span>`;
            }
            zoneEl.innerHTML = `
              <div class="df-zone-title">${liveZoneTitle}</div>
              <div class="df-zone-sub">${liveZoneSub}</div>
            `;
            // Update marine life cards if zone changes
            if (lastPanelZone !== liveZone) {
              const speciesList = infoPanel.querySelector('.species-list');
              const zoneFauna = FAUNA.find(z => z.zone === liveZone);
              if (!zoneFauna?.species.length) {
                speciesList.innerHTML = `<div>${UI_TEXT.infoPanel.noFauna}</div>`;
              } else if (liveZone === 'Surface') {
                const s = zoneFauna.species[0];
                speciesList.innerHTML = `
                  <div class="df-marine-title">Marine Life at This Depth</div>
                  <div class="df-species-card">
                    <div class="df-species-header">
                      <span class="df-species-name">${s.name}</span>
                    </div>
                    <div class="df-species-fact">${s.fact}</div>
                    <a href="${s.learnMore}" class="df-learn-more" target="_blank" rel="noopener"><span class="emoji">🌊</span> Learn more</a>
                  </div>
                `;
              } else {
                speciesList.innerHTML = `
                  <div class="df-marine-title">Marine Life at This Depth</div>
                  ${zoneFauna.species.map(species => {
                    const emoji = getSpeciesEmoji(species.name);
                    return `
                      <div class="df-species-card">
                        <div class="df-species-header">
                          <span class="df-species-name">${species.name}</span>
                        </div>
                        <div class="df-species-fact">${species.fact}</div>
                        <a href="${species.learnMore || 'https://www.noaa.gov/'}" class="df-learn-more" target="_blank" rel="noopener"><span class="emoji">${emoji}</span> Learn more</a>
                      </div>
                    `;
                  }).join('')}
                `;
              }
              lastPanelZone = liveZone;
            }
          }
        }
      }, 1000);
    } else {
      if (panelUpdateInterval) clearInterval(panelUpdateInterval);
    }
  }
  
  // Event listeners
  badge.addEventListener('click', toggleInfoPanel);
  infoPanel.querySelector('.close-button').addEventListener('click', toggleInfoPanel);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.code === 'KeyI') {
      toggleInfoPanel();
    }
  });
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'reset') {
      resetTimer();
      // Send response to acknowledge receipt
      sendResponse({ success: true });
    }
    return true; // Keep the message channel open for async response
  });
  
  // Start
  startTimer();
  update();
  isInitialized = true;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function getSpeciesEmoji(name) {
  if (/turtle/i.test(name)) return '🐢';
  if (/shark/i.test(name)) return '🦈';
  if (/dolphin/i.test(name)) return '🐬';
  if (/isopod/i.test(name)) return '🦐';
  if (/squid|octopus/i.test(name)) return '🦑';
  if (/cucumber/i.test(name)) return '🥒'; // fun, but can use 🐟 if preferred
  return '🐟';
} 