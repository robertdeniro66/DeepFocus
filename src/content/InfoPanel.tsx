import * as React from 'react';
import i18n from '../i18n/en.json';

interface Species {
  name: string;
  fact: string;
  noaaId: string;
  infoUrl?: string;
}

interface InfoPanelProps {
  open: boolean;
  onClose: () => void;
  zone: string;
  meters: number;
  fauna: Species[];
  zoneChar: string;
  depthRange?: string;
}

// Emoji mapping for marine life
const speciesEmoji: Record<string, string> = {
  'Green Sea Turtle': '🐢',
  'Common Dolphin': '🐬',
  'Lanternfish': '🐟',
  'Humboldt Squid': '🦑',
  'Giant Isopod': '🦐',
  'Sixgill Shark': '🦈',
  'Tripod Fish': '🐠',
  'Deep-sea Cucumber': '🥒',
  'Surface Waters': '🌊',
};

const InfoPanel: React.FC<InfoPanelProps> = ({ open, onClose, zone, meters, fauna, zoneChar, depthRange }) => {
  if (!open) return null;
  // Zone title and subheading
  const zoneTitle = zone === 'Surface' ? 'Ocean Surface' : zone;
  const zoneSub = zone === 'Surface'
    ? `As you spend time on this page, you'll descend through the ocean layers.`
    : `Depth: ${depthRange || ''}${depthRange ? 'm' : ''} • Current: ${meters}m`;

  return (
    <aside
      className="deepfocus-info-panel"
      style={{ pointerEvents: 'auto' }}
      role="dialog"
      aria-modal="true"
      aria-label={i18n.infoPanel.title}
    >
      <button
        className="close-button"
        onClick={onClose}
        aria-label={i18n.infoPanel.close}
      >
        ×
      </button>
      <div className="zone">
        <div className="df-zone-title">{zoneTitle}</div>
        <div className="df-zone-sub">{zoneSub}</div>
      </div>
      <div>
        <div className="df-marine-title">Marine Life at This Depth</div>
        {fauna.length === 0 ? (
          <div className="text-gray-600">{i18n.infoPanel.noFauna}</div>
        ) : (
          fauna.map((creature) => (
            <div className="df-species-card" key={creature.noaaId}>
              <div className="df-species-header">
                <span className="df-species-name">
                  <span className="emoji" style={{ marginRight: 6 }}>{speciesEmoji[creature.name] || '🐟'}</span>
                  {creature.name}
                </span>
              </div>
              <div className="df-species-fact">{creature.fact}</div>
              {creature.infoUrl && (
                <a
                  href={creature.infoUrl}
                  className="df-learn-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="emoji">{speciesEmoji[creature.name] || '🐟'}</span> {i18n.infoPanel.learnMore}
                </a>
              )}
            </div>
          ))
        )}
      </div>
      <div className="df-zone-char">
        <div className="df-zone-char-title">Zone Characteristics</div>
        <div className="df-zone-char-desc">{zoneChar}</div>
      </div>
    </aside>
  );
};

export default InfoPanel; 