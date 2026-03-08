import React from 'react';
import { SvgWrap, C, ShapeRow, NumberLine, Person, ColorBox, BalanceScale, Block, Marble, SeatRow } from './_shared';

// log-e1: Red, blue, red, blue, red, ___
export function LogE1() {
  return (
    <SvgWrap label="Color pattern: red, blue, red, blue, red, question mark">
      {[C.primary, C.secondary, C.primary, C.secondary, C.primary].map((color, i) => (
        <circle key={i} cx={25 + i * 28} cy={50} r="11" fill={color} />
      ))}
      {/* Question mark */}
      <circle cx={25 + 5 * 28} cy={50} r="11" fill={C.lightGray} stroke={C.gray} strokeWidth="2" strokeDasharray="3,2" />
      <text x={25 + 5 * 28} y={55} textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.gray}>?</text>
    </SvgWrap>
  );
}

// log-e2: Cat, dog, bird in a line
export function LogE2() {
  return (
    <SvgWrap label="Three animals in a line: cat, dog, bird" viewBox="0 0 220 110">
      {/* Cat */}
      <g>
        <circle cx="45" cy="40" r="16" fill={C.primary} opacity="0.8" />
        <polygon points="33,28 37,38 29,36" fill={C.primary} />
        <polygon points="57,28 53,38 61,36" fill={C.primary} />
        <text x="45" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.white}>🐱</text>
        <text x="45" y="72" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>Cat</text>
        <text x="45" y="85" textAnchor="middle" fontSize="8" fill={C.gray}>Front</text>
      </g>
      {/* Arrow */}
      <text x="80" y="43" fontSize="14" fill={C.dark}>→</text>
      {/* Dog - highlighted middle */}
      <g>
        <circle cx="110" cy="40" r="16" fill={C.secondary} stroke={C.correct} strokeWidth="2.5" />
        <text x="110" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.white}>🐶</text>
        <text x="110" y="72" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>Dog</text>
        <text x="110" y="85" textAnchor="middle" fontSize="8" fill={C.correct}>Middle!</text>
      </g>
      {/* Arrow */}
      <text x="145" y="43" fontSize="14" fill={C.dark}>→</text>
      {/* Bird */}
      <g>
        <circle cx="175" cy="40" r="16" fill={C.correct} opacity="0.8" />
        <text x="175" y="44" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.white}>🐦</text>
        <text x="175" y="72" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>Bird</text>
        <text x="175" y="85" textAnchor="middle" fontSize="8" fill={C.gray}>Behind</text>
      </g>
    </SvgWrap>
  );
}

// log-e3: Circle, square, circle, square, circle, ___
export function LogE3() {
  return (
    <SvgWrap label="Shape pattern: circle, square, circle, square, circle, question mark">
      <ShapeRow
        shapes={['circle', 'square', 'circle', 'square', 'circle']}
        colors={[C.secondary, C.primary, C.secondary, C.primary, C.secondary]}
        y={50}
      />
      {/* Question mark shape */}
      <rect x={100 + 2.5 * 30 - 10} y={40} width="20" height="20" rx="2" fill={C.lightGray} stroke={C.gray} strokeWidth="2" strokeDasharray="3,2" />
      <text x={100 + 2.5 * 30} y={55} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.gray}>?</text>
    </SvgWrap>
  );
}

// log-e4: Amy > Bob > Cleo height comparison
export function LogE4() {
  return (
    <SvgWrap label="Three people of different heights: Amy tallest, Cleo shortest" viewBox="0 0 200 130">
      {/* Amy - tallest */}
      <rect x="30" y="20" width="30" height="70" rx="6" fill={C.secondary} />
      <circle cx="45" cy="14" r="10" fill={C.secondary} />
      <text x="45" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill={C.white}>😊</text>
      <text x="45" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>Amy</text>
      {/* Bob - medium */}
      <rect x="85" y="35" width="30" height="55" rx="6" fill={C.primary} />
      <circle cx="100" cy="29" r="10" fill={C.primary} />
      <text x="100" y="33" textAnchor="middle" fontSize="8" fontWeight="bold" fill={C.white}>😊</text>
      <text x="100" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>Bob</text>
      {/* Cleo - shortest, highlighted */}
      <rect x="140" y="50" width="30" height="40" rx="6" fill={C.correct} />
      <circle cx="155" cy="44" r="10" fill={C.correct} />
      <text x="155" y="48" textAnchor="middle" fontSize="8" fontWeight="bold" fill={C.white}>😊</text>
      <text x="155" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>Cleo</text>
      <text x="155" y="118" textAnchor="middle" fontSize="8" fill={C.correct}>Shortest!</text>
    </SvgWrap>
  );
}

// log-e5: Every apple is red
export function LogE5() {
  return (
    <SvgWrap label="Several red apples showing that every apple is red">
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <circle cx={30 + i * 35} cy={48} r="14" fill="#E53935" />
          <line x1={30 + i * 35} y1={32} x2={33 + i * 35} y2={26} stroke={C.correct} strokeWidth="2.5" />
        </g>
      ))}
      <text x="100" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#E53935">ALL red!</text>
    </SvgWrap>
  );
}

// log-m1: 2, 4, 6, 8, ___
export function LogM1() {
  return (
    <SvgWrap label="Number pattern: 2, 4, 6, 8, question mark">
      {[2, 4, 6, 8].map((n, i) => (
        <g key={n}>
          <circle cx={25 + i * 35} cy={45} r="14" fill={C.secondary} />
          <text x={25 + i * 35} y={50} textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.white}>{n}</text>
          {i < 3 && (
            <text x={43 + i * 35} y={40} fontSize="9" fontWeight="bold" fill={C.primary}>+2</text>
          )}
        </g>
      ))}
      {/* Question */}
      <circle cx={25 + 4 * 35} cy={45} r="14" fill={C.cream} stroke={C.primary} strokeWidth="2.5" strokeDasharray="4,2" />
      <text x={25 + 4 * 35} y={50} textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.primary}>?</text>
      <text x={25 + 3 * 35 + 18} y={40} fontSize="9" fontWeight="bold" fill={C.primary}>+2</text>
    </SvgWrap>
  );
}

// log-m2: Tom, Sam, Mia pets puzzle
export function LogM2() {
  return (
    <SvgWrap label="Logic puzzle: three people and three pets" viewBox="0 0 220 110">
      {/* People */}
      <Person x={40} y={30} label="Tom" color={C.secondary} />
      <Person x={110} y={30} label="Sam" color={C.primary} />
      <Person x={180} y={30} label="Mia" color={C.correct} />
      {/* Pets as text */}
      <text x="40" y="80" textAnchor="middle" fontSize="18">🐱</text>
      <text x="110" y="80" textAnchor="middle" fontSize="18">🐟</text>
      <text x="180" y="80" textAnchor="middle" fontSize="18">🐶</text>
      <text x="40" y="95" textAnchor="middle" fontSize="8" fill={C.gray}>Cat?</text>
      <text x="110" y="95" textAnchor="middle" fontSize="8" fill={C.gray}>Fish</text>
      <text x="180" y="95" textAnchor="middle" fontSize="8" fill={C.gray}>Dog?</text>
    </SvgWrap>
  );
}

// log-m3: A, C, E, G, ___
export function LogM3() {
  return (
    <SvgWrap label="Letter pattern: A, C, E, G, question mark">
      {['A', 'C', 'E', 'G'].map((letter, i) => (
        <g key={letter}>
          <rect x={15 + i * 38} y={30} width="28" height="32" rx="6" fill={C.secondary} />
          <text x={29 + i * 38} y={52} textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.white}>{letter}</text>
          {i < 3 && (
            <text x={43 + i * 38} y={40} fontSize="7" fill={C.gray}>skip</text>
          )}
        </g>
      ))}
      {/* Question */}
      <rect x={15 + 4 * 38} y={30} width="28" height="32" rx="6" fill={C.cream} stroke={C.primary} strokeWidth="2" strokeDasharray="3,2" />
      <text x={29 + 4 * 38} y={52} textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.primary}>?</text>
      <text x="100" y="85" textAnchor="middle" fontSize="9" fill={C.dark}>A, (B), C, (D), E, (F), G, (?)</text>
    </SvgWrap>
  );
}

// log-m4: 5 children in a circle, handshakes
export function LogM4() {
  return (
    <SvgWrap label="5 children sitting in a circle, shaking hands with neighbors">
      {/* Circle of 5 dots */}
      {[0, 1, 2, 3, 4].map(i => {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const cx = 100 + 35 * Math.cos(angle);
        const cy = 55 + 35 * Math.sin(angle);
        return (
          <circle key={i} cx={cx} cy={cy} r="10" fill={C.secondary} />
        );
      })}
      {/* Lines between neighbors */}
      {[0, 1, 2, 3, 4].map(i => {
        const a1 = (i * 72 - 90) * (Math.PI / 180);
        const a2 = (((i + 1) % 5) * 72 - 90) * (Math.PI / 180);
        return (
          <line
            key={`l${i}`}
            x1={100 + 35 * Math.cos(a1)}
            y1={55 + 35 * Math.sin(a1)}
            x2={100 + 35 * Math.cos(a2)}
            y2={55 + 35 * Math.sin(a2)}
            stroke={C.primary}
            strokeWidth="2"
            opacity="0.6"
          />
        );
      })}
      <text x="100" y="108" textAnchor="middle" fontSize="9" fill={C.dark}>5 handshakes total</text>
    </SvgWrap>
  );
}

// log-m5: Ball in one of 3 boxes
export function LogM5() {
  return (
    <SvgWrap label="Three colored boxes: red, blue, green. Ball is in one of them.">
      <ColorBox x={20} y={35} color="#E53935" label="Red" />
      <text x="35" y="80" textAnchor="middle" fontSize="10" fill="#E53935">✗</text>
      <ColorBox x={85} y={35} color={C.secondary} label="Blue" />
      <text x="100" y="80" textAnchor="middle" fontSize="14" fill={C.correct}>●</text>
      <ColorBox x={150} y={35} color={C.correct} label="Green" />
      <text x="165" y="80" textAnchor="middle" fontSize="10" fill="#E53935">✗</text>
      <text x="100" y="100" textAnchor="middle" fontSize="9" fill={C.dark}>Where is the ball?</text>
    </SvgWrap>
  );
}

// log-h1: Ana has more than 3 but fewer than 6, even number
export function LogH1() {
  return (
    <SvgWrap label="Numbers 4 and 5 highlighted between 3 and 6, with 4 circled as even">
      <NumberLine min={1} max={7} highlights={[4, 5]} y={50} />
      {/* Bracket for range */}
      <line x1="68" y1="30" x2="68" y2="35" stroke={C.primary} strokeWidth="2" />
      <line x1="68" y1="30" x2="118" y2="30" stroke={C.primary} strokeWidth="2" />
      <line x1="118" y1="30" x2="118" y2="35" stroke={C.primary} strokeWidth="2" />
      <text x="93" y="26" textAnchor="middle" fontSize="8" fill={C.primary}>between 3 and 6</text>
      {/* Even highlight on 4 */}
      <circle cx={86} cy={38} r="10" fill="none" stroke={C.correct} strokeWidth="2.5" />
      <text x="86" y="18" textAnchor="middle" fontSize="7" fill={C.correct}>even!</text>
    </SvgWrap>
  );
}

// log-h2: Hat color logic puzzle
export function LogH2() {
  return (
    <SvgWrap label="Three friends with colored hats: Dan, Eve, and a third person" viewBox="0 0 220 110">
      {/* Dan */}
      <Person x={40} y={35} label="Dan" color={C.secondary} />
      <text x="40" y="14" textAnchor="middle" fontSize="9" fill="#E53935">Not red</text>
      {/* Eve */}
      <Person x={110} y={35} label="Eve" color={C.primary} />
      <text x="110" y="8" textAnchor="middle" fontSize="8" fill="#E53935">Not blue,</text>
      <text x="110" y="17" textAnchor="middle" fontSize="8" fill="#E53935">not red</text>
      {/* Third friend */}
      <Person x={180} y={35} label="Friend" color={C.correct} />
      {/* Hat options */}
      <rect x="15" y="85" width="14" height="10" rx="2" fill="#E53935" />
      <text x="35" y="93" fontSize="8" fill={C.dark}>Red</text>
      <rect x="65" y="85" width="14" height="10" rx="2" fill={C.secondary} />
      <text x="85" y="93" fontSize="8" fill={C.dark}>Blue</text>
      <rect x="115" y="85" width="14" height="10" rx="2" fill={C.yellow} />
      <text x="135" y="93" fontSize="8" fill={C.dark}>Yellow</text>
    </SvgWrap>
  );
}

// log-h3: Frog jumps up 3, slides back 1
export function LogH3() {
  return (
    <SvgWrap label="A frog on stairs jumping up 3 and sliding back 1" viewBox="0 0 240 120">
      {/* Stairs */}
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x={20 + i * 35}
          y={95 - i * 15}
          width="35"
          height={(i + 1) * 15}
          fill={C.cream}
          stroke={C.gray}
          strokeWidth="1"
        />
      ))}
      {/* Step numbers */}
      {Array.from({ length: 6 }, (_, i) => (
        <text key={`t${i}`} x={37 + i * 35} y={100 - i * 15 + 10} textAnchor="middle" fontSize="8" fill={C.dark}>{(i + 1) * 2}</text>
      ))}
      {/* Frog */}
      <text x="32" y="87" fontSize="16">🐸</text>
      {/* Jump arrow up */}
      <path d="M 45,80 C 50,55 70,50 75,60" fill="none" stroke={C.correct} strokeWidth="2" />
      <text x="65" y="52" fontSize="8" fontWeight="bold" fill={C.correct}>+3</text>
      {/* Slide back */}
      <path d="M 75,65 C 72,72 62,74 58,70" fill="none" stroke={C.primary} strokeWidth="1.5" />
      <text x="58" y="78" fontSize="7" fontWeight="bold" fill={C.primary}>−1</text>
    </SvgWrap>
  );
}

// log-h4: Balance scale with blocks and marbles
export function LogH4() {
  return (
    <SvgWrap label="A balance scale with 2 blocks on one side and 1 block plus 5 marbles on the other">
      <BalanceScale
        leftItems={
          <>
            <Block x={20} y={48} color={C.secondary} />
            <Block x={40} y={48} color={C.secondary} />
          </>
        }
        rightItems={
          <>
            <Block x={150} y={48} color={C.secondary} />
            {[0, 1, 2, 3, 4].map(i => (
              <Marble key={i} x={152 + i * 11} y={42} color={C.primary} />
            ))}
          </>
        }
      />
      <text x="35" y="15" textAnchor="middle" fontSize="9" fill={C.dark}>2 blocks</text>
      <text x="165" y="15" textAnchor="middle" fontSize="9" fill={C.dark}>1 block + 5 marbles</text>
    </SvgWrap>
  );
}

// log-h5: 8 seats, every second has a cushion starting from seat 1
export function LogH5() {
  return (
    <SvgWrap label="8 seats in a row with cushions on seats 1, 3, 5, and 7">
      <SeatRow count={8} cushionIndices={[0, 2, 4, 6]} y={45} />
      <text x="100" y="90" textAnchor="middle" fontSize="9" fill={C.dark}>Cushions on seats 1, 3, 5, 7</text>
    </SvgWrap>
  );
}

export const logicIllustrations: Record<string, React.FC> = {
  'log-e1': LogE1,
  'log-e2': LogE2,
  'log-e3': LogE3,
  'log-e4': LogE4,
  'log-e5': LogE5,
  'log-m1': LogM1,
  'log-m2': LogM2,
  'log-m3': LogM3,
  'log-m4': LogM4,
  'log-m5': LogM5,
  'log-h1': LogH1,
  'log-h2': LogH2,
  'log-h3': LogH3,
  'log-h4': LogH4,
  'log-h5': LogH5,
};
