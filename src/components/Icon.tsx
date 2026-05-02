import React from 'react';

/**
 * Set unificato di icone in stile manuale D&D.
 * Tutte stroke-only, currentColor, viewBox 24x24.
 *
 * Uso:
 *   <Icon name="sword" size={24} />
 *
 * Per sostituire CustomIcon (PNG) basta importare Icon e mappare i nomi:
 *   sword, shield, skull, scroll, book, dragon, helm, potion,
 *   plus, minus, trash, edit, search, settings, dice, heart,
 *   bolt, flame, eye, chevron-up, chevron-down, chevron-left,
 *   chevron-right, check, x, party, monster, table, grimoire,
 *   note, history, defeated, save, download, upload
 */

const PATHS: Record<string, React.ReactNode> = {
  sword: (
    <>
      <path d="M14.5 3.5 L20.5 3.5 L20.5 9.5 L10 20 L7 21 L4 18 L5 15 Z" />
      <line x1="11" y1="13" x2="14" y2="16" />
      <line x1="4" y1="18" x2="2.5" y2="21.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 L20 5.5 V12 C20 16.5 16.5 19.5 12 21 C7.5 19.5 4 16.5 4 12 V5.5 Z" />
      <path d="M12 8 V15" />
      <path d="M9 11 H15" />
    </>
  ),
  skull: (
    <>
      <path d="M5 11 C5 7 8 4 12 4 C16 4 19 7 19 11 V14 L17 16 V19 H14 V17 H10 V19 H7 V16 L5 14 Z" />
      <circle cx="9" cy="12" r="1.4" />
      <circle cx="15" cy="12" r="1.4" />
      <path d="M11 16 L13 16" />
    </>
  ),
  scroll: (
    <>
      <path d="M5 5 C5 3.9 5.9 3 7 3 H17 C18.1 3 19 3.9 19 5 V18 C19 19.7 17.7 21 16 21 H7 C5.9 21 5 20.1 5 19 Z" />
      <path d="M5 5 H3 V7 C3 8 4 8 5 8" />
      <path d="M19 19 C19 20.1 18.1 21 17 21" />
      <line x1="9" y1="8"  x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </>
  ),
  book: (
    <>
      <path d="M4 4 H11 C11.6 4 12 4.4 12 5 V20 C12 19.4 11.6 19 11 19 H4 Z" />
      <path d="M20 4 H13 C12.4 4 12 4.4 12 5 V20 C12 19.4 12.4 19 13 19 H20 Z" />
      <path d="M12 5 V20" />
    </>
  ),
  dragon: (
    <>
      <path d="M3 13 C3 9 6 7 9 8 L12 6 L11 9 L14 9 L17 6 L17 10 L20 11 L17 13 L18 16 L15 15 L13 18 L11 16 L8 17 L8 14 L5 15 Z" />
      <circle cx="15" cy="9" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  helm: (
    <>
      <path d="M5 8 C5 5 8 3 12 3 C16 3 19 5 19 8 V14 H5 Z" />
      <path d="M5 14 H19 V18 H15 V21 H9 V18 H5 Z" />
      <line x1="9"  y1="9" x2="9"  y2="13" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="15" y1="9" x2="15" y2="13" />
    </>
  ),
  potion: (
    <>
      <path d="M9 3 H15" />
      <path d="M10 3 V8 L7 13 C5.5 15 6.5 19 9 20 H15 C17.5 19 18.5 15 17 13 L14 8 V3" />
      <path d="M7.5 14 H16.5" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: (
    <line x1="5" y1="12" x2="19" y2="12" />
  ),
  trash: (
    <>
      <path d="M5 7 H19" />
      <path d="M9 7 V4 H15 V7" />
      <path d="M7 7 L8 20 H16 L17 7" />
      <line x1="11" y1="11" x2="11" y2="17" />
      <line x1="13" y1="11" x2="13" y2="17" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20 H8 L19 9 L15 5 L4 16 Z" />
      <line x1="14" y1="6" x2="18" y2="10" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <line x1="15.5" y1="15.5" x2="20" y2="20" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2 L13 5 L16 4 L17 7 L20 8 L19 11 L22 12 L19 13 L20 16 L17 17 L16 20 L13 19 L12 22 L11 19 L8 20 L7 17 L4 16 L5 13 L2 12 L5 11 L4 8 L7 7 L8 4 L11 5 Z" />
    </>
  ),
  dice: (
    <>
      <path d="M12 3 L20 7 V17 L12 21 L4 17 V7 Z" />
      <path d="M4 7 L12 11 L20 7" />
      <line x1="12" y1="11" x2="12" y2="21" />
      <circle cx="8.5" cy="14" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path d="M12 20 C5 15 3 11 3 8 C3 5.5 5 4 7 4 C9 4 11 5 12 7 C13 5 15 4 17 4 C19 4 21 5.5 21 8 C21 11 19 15 12 20 Z" />
  ),
  bolt: (
    <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z" />
  ),
  flame: (
    <path d="M12 3 C12 7 8 8 8 13 C8 17 10 21 12 21 C14 21 16 17 16 13 C16 10 14 9 14 6 C13 8 12 7 12 3 Z" />
  ),
  eye: (
    <>
      <path d="M2 12 C5 7 8 5 12 5 C16 5 19 7 22 12 C19 17 16 19 12 19 C8 19 5 17 2 12 Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'chevron-up':    <polyline points="6 15 12 9 18 15" />,
  'chevron-down':  <polyline points="6  9 12 15 18  9" />,
  'chevron-left':  <polyline points="15 6 9 12 15 18" />,
  'chevron-right': <polyline points="9  6 15 12 9 18" />,
  check: <polyline points="4 12 10 18 20 6" />,
  x: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  party: (
    <>
      <circle cx="8" cy="9" r="3" />
      <path d="M2 20 C2 16 5 14 8 14 C11 14 14 16 14 20" />
      <circle cx="17" cy="11" r="2.5" />
      <path d="M13 20 C13 17 15 15 17 15 C19 15 22 17 22 20" />
    </>
  ),
  monster: (
    <>
      <path d="M5 11 C5 7 8 4 12 4 C16 4 19 7 19 11 V14 L17 16 V19 H14 V17 H10 V19 H7 V16 L5 14 Z" />
      <path d="M9 11 L10 13 L8 13 Z" fill="currentColor" stroke="none" />
      <path d="M15 11 L16 13 L14 13 Z" fill="currentColor" stroke="none" />
      <path d="M9 16 L11 18 L13 16 L15 18" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="10" x2="9" y2="18" />
      <line x1="15" y1="10" x2="15" y2="18" />
    </>
  ),
  grimoire: (
    <>
      <path d="M5 4 H17 C18.1 4 19 4.9 19 6 V20 C19 19 18.1 18 17 18 H5 Z" />
      <path d="M5 4 V20" />
      <path d="M12 8 L13 11 L16 11 L13.5 13 L14.5 16 L12 14 L9.5 16 L10.5 13 L8 11 L11 11 Z" />
    </>
  ),
  note: (
    <>
      <path d="M5 3 H15 L19 7 V21 H5 Z" />
      <polyline points="15 3 15 7 19 7" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="14" y2="16" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="8" />
      <polyline points="12 7 12 12 16 14" />
    </>
  ),
  defeated: (
    <>
      <path d="M5 11 C5 7 8 4 12 4 C16 4 19 7 19 11 V14 L17 16 V19 H14 V17 H10 V19 H7 V16 L5 14 Z" />
      <line x1="8" y1="10" x2="11" y2="13" />
      <line x1="11" y1="10" x2="8" y2="13" />
      <line x1="13" y1="10" x2="16" y2="13" />
      <line x1="16" y1="10" x2="13" y2="13" />
    </>
  ),
  save: (
    <>
      <path d="M5 4 H17 L20 7 V20 H4 V5 C4 4.4 4.4 4 5 4 Z" />
      <rect x="8" y="4" width="8" height="6" />
      <rect x="7" y="13" width="10" height="7" />
    </>
  ),
  download: (
    <>
      <line x1="12" y1="4" x2="12" y2="15" />
      <polyline points="7 11 12 16 17 11" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </>
  ),
  upload: (
    <>
      <line x1="12" y1="20" x2="12" y2="9" />
      <polyline points="7 13 12 8 17 13" />
      <line x1="4" y1="4" x2="20" y2="4" />
    </>
  ),
};

interface IconProps {
  name: keyof typeof PATHS | string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  title?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 22,
  color = 'currentColor',
  strokeWidth = 1.6,
  className,
  title,
}) => {
  const path = PATHS[name];
  if (!path) {
    // Fallback: cerchio vuoto (icona mancante)
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth={strokeWidth} />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
    >
      {path}
    </svg>
  );
};

export default Icon;
