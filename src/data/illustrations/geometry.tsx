import React from 'react';
import { SvgWrap, C } from './_shared';

// geo-e1: How many sides does a triangle have?
export function GeoE1() {
  return (
    <SvgWrap label="A colorful triangle">
      <polygon
        points="100,20 40,95 160,95"
        fill={C.secondary}
        stroke={C.dark}
        strokeWidth="3"
        opacity="0.85"
      />
      {/* Side labels */}
      <text x="60" y="55" fontSize="14" fontWeight="bold" fill={C.primary}>1</text>
      <text x="135" y="55" fontSize="14" fontWeight="bold" fill={C.primary}>2</text>
      <text x="100" y="112" fontSize="14" fontWeight="bold" fill={C.primary}>3</text>
    </SvgWrap>
  );
}

// geo-e2: Which shape is a circle?
export function GeoE2() {
  return (
    <SvgWrap label="Four shapes: square, triangle, circle, pentagon">
      {/* Square */}
      <rect x="15" y="35" width="35" height="35" rx="2" fill={C.yellow} stroke={C.dark} strokeWidth="2" />
      {/* Triangle */}
      <polygon points="85,35 65,70 105,70" fill={C.correct} stroke={C.dark} strokeWidth="2" />
      {/* Circle - highlighted */}
      <circle cx="140" cy="52" r="20" fill={C.secondary} stroke={C.primary} strokeWidth="3" />
      {/* Pentagon */}
      <polygon
        points="185,37 172,52 177,70 193,70 198,52"
        fill={C.pink} stroke={C.dark} strokeWidth="2"
      />
      {/* Labels */}
      <text x="32" y="85" textAnchor="middle" fontSize="8" fill={C.dark}>Square</text>
      <text x="85" y="85" textAnchor="middle" fontSize="8" fill={C.dark}>Triangle</text>
      <text x="140" y="85" textAnchor="middle" fontSize="8" fill={C.dark}>Circle</text>
      <text x="185" y="85" textAnchor="middle" fontSize="8" fill={C.dark}>Pentagon</text>
    </SvgWrap>
  );
}

// geo-e3: How many corners does a square have?
export function GeoE3() {
  return (
    <SvgWrap label="A square with highlighted corners">
      <rect x="55" y="20" width="70" height="70" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="2.5" opacity="0.8" />
      {/* Corner dots */}
      <circle cx="55" cy="20" r="7" fill={C.primary} />
      <circle cx="125" cy="20" r="7" fill={C.primary} />
      <circle cx="55" cy="90" r="7" fill={C.primary} />
      <circle cx="125" cy="90" r="7" fill={C.primary} />
      {/* Corner labels */}
      <text x="55" y="17" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.white}>1</text>
      <text x="125" y="17" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.white}>2</text>
      <text x="55" y="106" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.primary}>3</text>
      <text x="125" y="106" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.primary}>4</text>
    </SvgWrap>
  );
}

// geo-e4: Which shape has NO straight sides?
export function GeoE4() {
  return (
    <SvgWrap label="Shapes: square, triangle, rectangle, circle, pentagon">
      <rect x="8" y="40" width="28" height="28" fill={C.lightGray} stroke={C.dark} strokeWidth="2" />
      <polygon points="58,40 43,68 73,68" fill={C.lightGray} stroke={C.dark} strokeWidth="2" />
      <rect x="85" y="42" width="34" height="24" fill={C.lightGray} stroke={C.dark} strokeWidth="2" />
      {/* Circle highlighted */}
      <circle cx="148" cy="54" r="16" fill={C.primary} stroke={C.dark} strokeWidth="2.5" />
      <text x="148" y="58" textAnchor="middle" fontSize="8" fontWeight="bold" fill={C.white}>No straight</text>
      <text x="148" y="67" textAnchor="middle" fontSize="8" fontWeight="bold" fill={C.white}>sides!</text>
      <polygon points="190,40 178,50 182,66 198,66 202,50" fill={C.lightGray} stroke={C.dark} strokeWidth="2" />
    </SvgWrap>
  );
}

// geo-e5: Rectangle sides - 2 long and 2 short
export function GeoE5() {
  return (
    <SvgWrap label="A rectangle with labeled long and short sides">
      <rect x="35" y="30" width="120" height="60" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="2.5" opacity="0.7" />
      {/* Long side arrows/labels */}
      <text x="95" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.primary}>Long</text>
      <text x="95" y="106" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.primary}>Long</text>
      {/* Short side labels */}
      <text x="22" y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.correct}>Short</text>
      <text x="170" y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.correct}>Short</text>
    </SvgWrap>
  );
}

// geo-e6: Which shape has the most sides?
export function GeoE6() {
  return (
    <SvgWrap label="Shapes with side counts: triangle 3, square 4, pentagon 5">
      {/* Triangle */}
      <polygon points="40,30 20,75 60,75" fill={C.secondary} stroke={C.dark} strokeWidth="2" />
      <text x="40" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>3</text>
      {/* Square */}
      <rect x="80" y="35" width="40" height="40" fill={C.yellow} stroke={C.dark} strokeWidth="2" />
      <text x="100" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>4</text>
      {/* Pentagon - highlighted as winner */}
      <polygon
        points="160,32 143,50 149,72 171,72 177,50"
        fill={C.correct} stroke={C.dark} strokeWidth="2.5"
      />
      <text x="160" y="90" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.correct}>5 ★</text>
    </SvgWrap>
  );
}

// geo-m1: Cut a square in half -> 2 rectangles
export function GeoM1() {
  return (
    <SvgWrap label="A square cut in half making two rectangles">
      {/* Original square */}
      <rect x="20" y="25" width="60" height="60" fill={C.secondary} stroke={C.dark} strokeWidth="2" opacity="0.6" />
      <line x1="50" y1="25" x2="50" y2="85" stroke={C.primary} strokeWidth="2" strokeDasharray="4,3" />
      <text x="50" y="105" textAnchor="middle" fontSize="9" fill={C.dark}>Cut!</text>
      {/* Arrow */}
      <text x="100" y="58" fontSize="18" fill={C.dark}>→</text>
      {/* Two rectangles */}
      <rect x="120" y="25" width="28" height="60" fill={C.primary} stroke={C.dark} strokeWidth="2" opacity="0.7" />
      <rect x="155" y="25" width="28" height="60" fill={C.correct} stroke={C.dark} strokeWidth="2" opacity="0.7" />
    </SvgWrap>
  );
}

// geo-m2: Big triangle split into 4 small triangles — count all triangles
export function GeoM2() {
  return (
    <SvgWrap label="A big triangle divided into 4 smaller triangles">
      {/* Outer triangle */}
      <polygon points="100,15 30,100 170,100" fill="none" stroke={C.dark} strokeWidth="2.5" />
      {/* Inner lines */}
      <line x1="65" y1="57" x2="135" y2="57" stroke={C.dark} strokeWidth="2" />
      <line x1="65" y1="57" x2="100" y2="100" stroke={C.dark} strokeWidth="2" />
      <line x1="135" y1="57" x2="100" y2="100" stroke={C.dark} strokeWidth="2" />
      {/* Color fills */}
      <polygon points="100,15 65,57 135,57" fill={C.primary} opacity="0.3" />
      <polygon points="65,57 30,100 100,100" fill={C.secondary} opacity="0.3" />
      <polygon points="135,57 100,100 170,100" fill={C.correct} opacity="0.3" />
      <polygon points="65,57 135,57 100,100" fill={C.yellow} opacity="0.3" />
      {/* Count labels */}
      <text x="100" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>1</text>
      <text x="60" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>2</text>
      <text x="140" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>3</text>
      <text x="100" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>4</text>
    </SvgWrap>
  );
}

// geo-m3: Cube with 6 faces
export function GeoM3() {
  return (
    <SvgWrap label="A 3D cube showing its faces">
      {/* Front face */}
      <rect x="60" y="45" width="55" height="55" fill={C.secondary} stroke={C.dark} strokeWidth="2" opacity="0.8" />
      {/* Top face */}
      <polygon points="60,45 85,22 140,22 115,45" fill={C.primary} stroke={C.dark} strokeWidth="2" opacity="0.7" />
      {/* Right face */}
      <polygon points="115,45 140,22 140,77 115,100" fill={C.correct} stroke={C.dark} strokeWidth="2" opacity="0.7" />
      <text x="88" y="78" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.white}>front</text>
      <text x="100" y="36" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.white}>top</text>
      <text x="128" y="65" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.white}>side</text>
    </SvgWrap>
  );
}

// geo-m4: Fold paper and cut triangle -> diamond
export function GeoM4() {
  return (
    <SvgWrap label="Paper folded, triangle cut, unfolds to diamond shape" viewBox="0 0 240 120">
      {/* Step 1: folded paper */}
      <rect x="10" y="25" width="40" height="70" fill={C.cream} stroke={C.dark} strokeWidth="2" />
      <line x1="30" y1="25" x2="30" y2="95" stroke={C.gray} strokeWidth="1" strokeDasharray="3,2" />
      <polygon points="20,50 30,35 30,65" fill={C.primary} opacity="0.4" stroke={C.primary} strokeWidth="1.5" />
      <text x="30" y="110" textAnchor="middle" fontSize="8" fill={C.dark}>Fold + cut</text>
      {/* Arrow */}
      <text x="68" y="63" fontSize="16" fill={C.dark}>→</text>
      {/* Step 2: unfolded paper with diamond hole */}
      <rect x="85" y="25" width="70" height="70" fill={C.cream} stroke={C.dark} strokeWidth="2" />
      <polygon points="120,38 105,60 120,82 135,60" fill={C.white} stroke={C.primary} strokeWidth="2" />
      <text x="120" y="110" textAnchor="middle" fontSize="8" fill={C.dark}>Diamond!</text>
    </SvgWrap>
  );
}

// geo-m5: Two squares side by side -> rectangle
export function GeoM5() {
  return (
    <SvgWrap label="Two squares placed side by side forming a rectangle">
      {/* Square 1 */}
      <rect x="20" y="30" width="45" height="45" fill={C.secondary} stroke={C.dark} strokeWidth="2" opacity="0.7" />
      {/* Square 2 */}
      <rect x="72" y="30" width="45" height="45" fill={C.primary} stroke={C.dark} strokeWidth="2" opacity="0.7" />
      {/* Arrow */}
      <text x="132" y="57" fontSize="16" fill={C.dark}>→</text>
      {/* Rectangle result */}
      <rect x="148" y="30" width="45" height="45" fill={C.correct} stroke={C.dark} strokeWidth="2" opacity="0.5" />
      <rect x="148" y="30" width="45" height="45" fill="none" stroke={C.dark} strokeWidth="2.5" />
      <line x1="170.5" y1="30" x2="170.5" y2="75" stroke={C.dark} strokeWidth="1" strokeDasharray="3,2" />
    </SvgWrap>
  );
}

// geo-m6: Mirror symmetry of letter A
export function GeoM6() {
  return (
    <SvgWrap label="Letter A and its mirror reflection showing symmetry">
      {/* Letter A */}
      <text x="60" y="80" textAnchor="middle" fontSize="50" fontWeight="bold" fill={C.secondary}>A</text>
      {/* Mirror line */}
      <line x1="100" y1="15" x2="100" y2="105" stroke={C.gray} strokeWidth="2" strokeDasharray="5,3" />
      <text x="100" y="115" textAnchor="middle" fontSize="8" fill={C.gray}>mirror</text>
      {/* Reflected A */}
      <g transform="translate(240,0) scale(-1,1)">
        <text x="100" y="80" textAnchor="middle" fontSize="50" fontWeight="bold" fill={C.primary}>A</text>
      </g>
    </SvgWrap>
  );
}

// geo-h1: Large square divided into 4, then one divided into 4 more
export function GeoH1() {
  return (
    <SvgWrap label="A large square divided into smaller squares">
      {/* Big square */}
      <rect x="40" y="10" width="80" height="80" fill="none" stroke={C.dark} strokeWidth="2.5" />
      {/* 4 quadrants */}
      <line x1="80" y1="10" x2="80" y2="90" stroke={C.dark} strokeWidth="2" />
      <line x1="40" y1="50" x2="120" y2="50" stroke={C.dark} strokeWidth="2" />
      {/* Top-right quadrant subdivided */}
      <line x1="100" y1="10" x2="100" y2="50" stroke={C.primary} strokeWidth="1.5" />
      <line x1="80" y1="30" x2="120" y2="30" stroke={C.primary} strokeWidth="1.5" />
      {/* Color the tiny squares */}
      <rect x="80" y="10" width="20" height="20" fill={C.primary} opacity="0.15" />
      <rect x="100" y="10" width="20" height="20" fill={C.secondary} opacity="0.15" />
      <rect x="80" y="30" width="20" height="20" fill={C.correct} opacity="0.15" />
      <rect x="100" y="30" width="20" height="20" fill={C.yellow} opacity="0.15" />
      {/* Count hint */}
      <text x="100" y="108" textAnchor="middle" fontSize="9" fill={C.dark}>How many squares total?</text>
    </SvgWrap>
  );
}

// geo-h2: Triangle inequality — sticks of length 2, 3, 6
export function GeoH2() {
  return (
    <SvgWrap label="Three sticks of lengths 2, 3, and 6">
      {/* Stick 1: length 2 */}
      <rect x="30" y="25" width="24" height="8" rx="3" fill={C.primary} stroke={C.dark} strokeWidth="1.5" />
      <text x="42" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.primary}>2</text>
      {/* Stick 2: length 3 */}
      <rect x="30" y="50" width="36" height="8" rx="3" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      <text x="48" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.secondary}>3</text>
      {/* Stick 3: length 6 */}
      <rect x="30" y="75" width="72" height="8" rx="3" fill={C.correct} stroke={C.dark} strokeWidth="1.5" />
      <text x="66" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.correct}>6</text>
      {/* Comparison */}
      <text x="150" y="40" fontSize="10" fill={C.dark}>2 + 3 = 5</text>
      <text x="150" y="58" fontSize="12" fontWeight="bold" fill={C.primary}>5 &lt; 6</text>
      <text x="150" y="80" fontSize="9" fill={C.gray}>Can&apos;t make</text>
      <text x="150" y="92" fontSize="9" fill={C.gray}>a triangle!</text>
    </SvgWrap>
  );
}

// geo-h3: Two overlapping squares
export function GeoH3() {
  return (
    <SvgWrap label="Two overlapping squares sharing a small square in the middle">
      {/* Square 1 */}
      <rect x="35" y="20" width="60" height="60" fill={C.secondary} stroke={C.dark} strokeWidth="2" opacity="0.5" />
      {/* Square 2 */}
      <rect x="75" y="40" width="60" height="60" fill={C.primary} stroke={C.dark} strokeWidth="2" opacity="0.5" />
      {/* Overlap region */}
      <rect x="75" y="40" width="20" height="40" fill={C.purple} stroke={C.dark} strokeWidth="1.5" opacity="0.6" />
      {/* Labels */}
      <text x="55" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.white}>9</text>
      <text x="115" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.white}>9</text>
      <text x="85" y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.white}>1</text>
    </SvgWrap>
  );
}

// geo-h4: 3x3 dot grid for counting squares
export function GeoH4() {
  return (
    <SvgWrap label="A 3 by 3 grid of dots">
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={60 + col * 40}
            cy={25 + row * 40}
            r="5"
            fill={C.dark}
          />
        ))
      )}
      {/* Show one small square example */}
      <rect x="58" y="23" width="42" height="42" fill="none" stroke={C.secondary} strokeWidth="2" strokeDasharray="4,2" opacity="0.7" />
      {/* Show the big square */}
      <rect x="56" y="21" width="84" height="84" fill="none" stroke={C.primary} strokeWidth="2" strokeDasharray="4,2" opacity="0.5" />
    </SvgWrap>
  );
}

// geo-h5: Rectangle with one corner cut off -> pentagon
export function GeoH5() {
  return (
    <SvgWrap label="A rectangle with one corner cut off, making a 5-sided shape">
      {/* Original rectangle faded */}
      <rect x="25" y="25" width="60" height="50" fill={C.lightGray} stroke={C.gray} strokeWidth="1.5" strokeDasharray="3,2" />
      {/* Arrow */}
      <text x="100" y="55" fontSize="16" fill={C.dark}>→</text>
      {/* Pentagon result */}
      <polygon
        points="115,25 175,25 175,75 115,75 115,25"
        fill="none" stroke={C.lightGray} strokeWidth="1" strokeDasharray="2,2"
      />
      <polygon
        points="115,25 155,25 175,45 175,75 115,75"
        fill={C.secondary}
        stroke={C.dark}
        strokeWidth="2"
        opacity="0.6"
      />
      {/* Cut line */}
      <line x1="155" y1="25" x2="175" y2="45" stroke={C.primary} strokeWidth="2.5" />
      {/* Side count */}
      <text x="145" y="108" textAnchor="middle" fontSize="9" fill={C.dark}>5 sides!</text>
    </SvgWrap>
  );
}

// geo-h6: Paper folded twice, corners cut
export function GeoH6() {
  return (
    <SvgWrap label="Paper folded twice with corners cut, showing 1 hole when unfolded" viewBox="0 0 260 120">
      {/* Step 1: full paper */}
      <rect x="10" y="25" width="50" height="50" fill={C.cream} stroke={C.dark} strokeWidth="1.5" />
      <text x="35" y="90" textAnchor="middle" fontSize="7" fill={C.dark}>Paper</text>
      {/* Arrow */}
      <text x="70" y="53" fontSize="12" fill={C.dark}>→</text>
      {/* Step 2: folded once */}
      <rect x="82" y="25" width="25" height="50" fill={C.cream} stroke={C.dark} strokeWidth="1.5" />
      <text x="94" y="90" textAnchor="middle" fontSize="7" fill={C.dark}>Fold 1</text>
      {/* Arrow */}
      <text x="118" y="53" fontSize="12" fill={C.dark}>→</text>
      {/* Step 3: folded twice */}
      <rect x="132" y="37" width="25" height="25" fill={C.cream} stroke={C.dark} strokeWidth="1.5" />
      {/* Cut corners */}
      <polygon points="132,37 138,37 132,43" fill={C.white} stroke={C.primary} strokeWidth="1" />
      <polygon points="157,37 157,43 151,37" fill={C.white} stroke={C.primary} strokeWidth="1" />
      <polygon points="132,62 132,56 138,62" fill={C.white} stroke={C.primary} strokeWidth="1" />
      <polygon points="157,62 151,62 157,56" fill={C.white} stroke={C.primary} strokeWidth="1" />
      <text x="144" y="90" textAnchor="middle" fontSize="7" fill={C.dark}>Fold 2 + Cut</text>
      {/* Arrow */}
      <text x="172" y="53" fontSize="12" fill={C.dark}>→</text>
      {/* Step 4: unfolded with hole */}
      <rect x="185" y="25" width="50" height="50" fill={C.cream} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="210" cy="50" r="8" fill={C.white} stroke={C.primary} strokeWidth="2" />
      <text x="210" y="90" textAnchor="middle" fontSize="7" fill={C.dark}>1 hole!</text>
    </SvgWrap>
  );
}

export const geometryIllustrations: Record<string, React.FC> = {
  'geo-e1': GeoE1,
  'geo-e2': GeoE2,
  'geo-e3': GeoE3,
  'geo-e4': GeoE4,
  'geo-e5': GeoE5,
  'geo-e6': GeoE6,
  'geo-m1': GeoM1,
  'geo-m2': GeoM2,
  'geo-m3': GeoM3,
  'geo-m4': GeoM4,
  'geo-m5': GeoM5,
  'geo-m6': GeoM6,
  'geo-h1': GeoH1,
  'geo-h2': GeoH2,
  'geo-h3': GeoH3,
  'geo-h4': GeoH4,
  'geo-h5': GeoH5,
  'geo-h6': GeoH6,
};
