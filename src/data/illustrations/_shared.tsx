import React from 'react';

// Shared color palette
export const C = {
  primary: '#FF6B35',
  secondary: '#4DACF7',
  correct: '#4CAF50',
  yellow: '#FFD93D',
  pink: '#FF8FAB',
  purple: '#B388FF',
  cream: '#FFF5E6',
  dark: '#2D2D2D',
  gray: '#9E9E9E',
  lightGray: '#E0E0E0',
  white: '#FFFFFF',
} as const;

interface SvgWrapProps {
  label: string;
  viewBox?: string;
  children: React.ReactNode;
}

export function SvgWrap({ label, viewBox = '0 0 200 120', children }: SvgWrapProps) {
  return (
    <svg
      viewBox={viewBox}
      className="w-full max-w-xs mx-auto"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

// Number line with optional highlighted positions
interface NumberLineProps {
  min: number;
  max: number;
  highlights?: number[];
  y?: number;
}

export function NumberLine({ min, max, highlights = [], y = 70 }: NumberLineProps) {
  const range = max - min;
  const pad = 20;
  const w = 160;
  const step = w / range;

  return (
    <g>
      <line x1={pad} y1={y} x2={pad + w} y2={y} stroke={C.dark} strokeWidth="2" />
      {Array.from({ length: range + 1 }, (_, i) => {
        const x = pad + i * step;
        const val = min + i;
        const isHighlight = highlights.includes(val);
        return (
          <g key={val}>
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke={C.dark} strokeWidth="1.5" />
            <text x={x} y={y + 18} textAnchor="middle" fontSize="10" fill={C.dark}>{val}</text>
            {isHighlight && (
              <circle cx={x} cy={y - 12} r="5" fill={C.primary} />
            )}
          </g>
        );
      })}
    </g>
  );
}

// A group of dots in a grid pattern
interface DotGroupProps {
  count: number;
  cols?: number;
  cx?: number;
  cy?: number;
  color?: string;
  r?: number;
  spacing?: number;
}

export function DotGroup({ count, cols = 5, cx = 100, cy = 60, color = C.primary, r = 6, spacing = 18 }: DotGroupProps) {
  const rows = Math.ceil(count / cols);
  const startX = cx - ((Math.min(count, cols) - 1) * spacing) / 2;
  const startY = cy - ((rows - 1) * spacing) / 2;

  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return (
          <circle
            key={i}
            cx={startX + col * spacing}
            cy={startY + row * spacing}
            r={r}
            fill={color}
          />
        );
      })}
    </g>
  );
}

// A row of shapes for pattern questions
interface ShapeRowProps {
  shapes: ('circle' | 'square' | 'triangle' | 'star')[];
  colors?: string[];
  y?: number;
}

export function ShapeRow({ shapes, colors, y = 60 }: ShapeRowProps) {
  const spacing = 30;
  const startX = 100 - ((shapes.length - 1) * spacing) / 2;

  return (
    <g>
      {shapes.map((shape, i) => {
        const x = startX + i * spacing;
        const color = colors?.[i] || C.primary;
        return (
          <g key={i}>
            {shape === 'circle' && <circle cx={x} cy={y} r="10" fill={color} />}
            {shape === 'square' && <rect x={x - 9} y={y - 9} width="18" height="18" rx="2" fill={color} />}
            {shape === 'triangle' && (
              <polygon points={`${x},${y - 11} ${x - 10},${y + 8} ${x + 10},${y + 8}`} fill={color} />
            )}
            {shape === 'star' && (
              <polygon
                points={`${x},${y - 11} ${x + 3},${y - 3} ${x + 11},${y - 3} ${x + 5},${y + 3} ${x + 7},${y + 11} ${x},${y + 6} ${x - 7},${y + 11} ${x - 5},${y + 3} ${x - 11},${y - 3} ${x - 3},${y - 3}`}
                fill={color}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

// Balance scale
interface BalanceScaleProps {
  leftItems: React.ReactNode;
  rightItems: React.ReactNode;
  balanced?: boolean;
}

export function BalanceScale({ leftItems, rightItems, balanced = true }: BalanceScaleProps) {
  const tilt = balanced ? 0 : 3;
  return (
    <g>
      {/* Base */}
      <polygon points="100,110 85,115 115,115" fill={C.dark} />
      <line x1="100" y1="50" x2="100" y2="110" stroke={C.dark} strokeWidth="3" />
      {/* Beam */}
      <line
        x1="35" y1={50 + tilt} x2="165" y2={50 - tilt}
        stroke={C.dark} strokeWidth="3"
      />
      {/* Left pan */}
      <line x1="35" y1={50 + tilt} x2="35" y2={65 + tilt} stroke={C.gray} strokeWidth="1.5" />
      <rect x="15" y={65 + tilt} width="40" height="6" rx="3" fill={C.gray} />
      <g transform={`translate(0, ${tilt})`}>{leftItems}</g>
      {/* Right pan */}
      <line x1="165" y1={50 - tilt} x2="165" y2={65 - tilt} stroke={C.gray} strokeWidth="1.5" />
      <rect x="145" y={65 - tilt} width="40" height="6" rx="3" fill={C.gray} />
      <g transform={`translate(0, ${-tilt})`}>{rightItems}</g>
    </g>
  );
}

// Simple colored block
interface BlockProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
}

export function Block({ x, y, size = 16, color = C.secondary }: BlockProps) {
  return <rect x={x} y={y} width={size} height={size} rx="2" fill={color} stroke={C.dark} strokeWidth="1" />;
}

// Small marble
interface MarbleProps {
  x: number;
  y: number;
  color?: string;
}

export function Marble({ x, y, color = C.primary }: MarbleProps) {
  return <circle cx={x} cy={y} r="5" fill={color} />;
}

// Simple basket shape
interface BasketProps {
  x: number;
  y: number;
  items?: number;
  itemColor?: string;
}

export function Basket({ x, y, items = 0, itemColor = C.primary }: BasketProps) {
  return (
    <g>
      <path
        d={`M${x - 14},${y - 5} L${x - 10},${y + 12} L${x + 10},${y + 12} L${x + 14},${y - 5} Z`}
        fill={C.yellow}
        stroke={C.dark}
        strokeWidth="1.5"
      />
      {Array.from({ length: items }, (_, i) => (
        <circle key={i} cx={x - 6 + i * 6} cy={y + 2} r="4" fill={itemColor} />
      ))}
    </g>
  );
}

// Person stick figure (tiny, for logic puzzles)
interface PersonProps {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export function Person({ x, y, label, color = C.secondary }: PersonProps) {
  return (
    <g>
      <circle cx={x} cy={y - 14} r="6" fill={color} />
      <line x1={x} y1={y - 8} x2={x} y2={y + 5} stroke={color} strokeWidth="2" />
      <line x1={x - 7} y1={y - 3} x2={x + 7} y2={y - 3} stroke={color} strokeWidth="2" />
      <line x1={x} y1={y + 5} x2={x - 6} y2={y + 16} stroke={color} strokeWidth="2" />
      <line x1={x} y1={y + 5} x2={x + 6} y2={y + 16} stroke={color} strokeWidth="2" />
      {label && (
        <text x={x} y={y + 28} textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>{label}</text>
      )}
    </g>
  );
}

// Colored box
interface ColorBoxProps {
  x: number;
  y: number;
  w?: number;
  h?: number;
  color: string;
  label?: string;
}

export function ColorBox({ x, y, w = 30, h = 25, color, label }: ColorBoxProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={color} stroke={C.dark} strokeWidth="1.5" />
      {label && (
        <text x={x + w / 2} y={y + h + 14} textAnchor="middle" fontSize="9" fill={C.dark}>{label}</text>
      )}
    </g>
  );
}

// Seat in a row
interface SeatRowProps {
  count: number;
  cushionIndices: number[];
  y?: number;
}

export function SeatRow({ count, cushionIndices, y = 60 }: SeatRowProps) {
  const spacing = 20;
  const startX = 100 - ((count - 1) * spacing) / 2;

  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const x = startX + i * spacing;
        const hasCushion = cushionIndices.includes(i);
        return (
          <g key={i}>
            <rect x={x - 8} y={y} width="16" height="16" rx="2" fill={C.lightGray} stroke={C.gray} strokeWidth="1" />
            {hasCushion && (
              <rect x={x - 6} y={y + 2} width="12" height="5" rx="2" fill={C.primary} />
            )}
            <text x={x} y={y + 28} textAnchor="middle" fontSize="8" fill={C.dark}>{i + 1}</text>
          </g>
        );
      })}
    </g>
  );
}
