import React from 'react';
import { SvgWrap, C, NumberLine, DotGroup, Basket } from './_shared';

// num-e1: 3 + 4 = 7
export function NumE1() {
  return (
    <SvgWrap label="3 blue dots plus 4 orange dots equals 7">
      <DotGroup count={3} cols={3} cx={50} cy={45} color={C.secondary} r={8} spacing={22} />
      <text x="85" y="50" fontSize="18" fontWeight="bold" fill={C.dark}>+</text>
      <DotGroup count={4} cols={4} cx={130} cy={45} color={C.primary} r={8} spacing={22} />
      <text x="100" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.dark}>3 + 4 = ?</text>
    </SvgWrap>
  );
}

// num-e2: 10 - 6 = 4
export function NumE2() {
  return (
    <SvgWrap label="Number line from 0 to 10 with jumps from 10 back to 4">
      <NumberLine min={0} max={10} highlights={[4, 10]} y={55} />
      {/* Arc showing subtraction */}
      <path d="M 172,43 C 160,15 80,15 68,43" fill="none" stroke={C.primary} strokeWidth="2" markerEnd="" />
      <text x="120" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.primary}>−6</text>
    </SvgWrap>
  );
}

// num-e3: 10 fingers on both hands
export function NumE3() {
  return (
    <SvgWrap label="Two hands showing 5 fingers each" viewBox="0 0 200 130">
      {/* Left hand - 5 fingers */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={`l${i}`} x={22 + i * 14} y={30 - (i === 2 ? 8 : i === 1 || i === 3 ? 4 : 0)} width="10" height="30" rx="5" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      ))}
      <rect x="22" y="55" width="66" height="25" rx="8" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <text x="55" y="100" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C.secondary}>5</text>
      {/* Plus sign */}
      <text x="100" y="65" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C.dark}>+</text>
      {/* Right hand - 5 fingers */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={`r${i}`} x={118 + i * 14} y={30 - (i === 2 ? 8 : i === 1 || i === 3 ? 4 : 0)} width="10" height="30" rx="5" fill={C.primary} stroke={C.dark} strokeWidth="1" />
      ))}
      <rect x="118" y="55" width="66" height="25" rx="8" fill={C.primary} stroke={C.dark} strokeWidth="1" />
      <text x="151" y="100" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C.primary}>5</text>
      {/* Total */}
      <text x="100" y="122" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C.dark}>= ?</text>
    </SvgWrap>
  );
}

// num-e4: Number after 19
export function NumE4() {
  return (
    <SvgWrap label="Number line showing 18, 19, and a question mark">
      <NumberLine min={17} max={22} highlights={[19]} y={55} />
      <text x="100" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.primary}>What comes after 19?</text>
    </SvgWrap>
  );
}

// num-e5: 5 red apples + 3 green apples
export function NumE5() {
  return (
    <SvgWrap label="5 red apples and 3 green apples" viewBox="0 0 220 100">
      {/* Red apples */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={`r${i}`}>
          <circle cx={25 + i * 24} cy={40} r="10" fill="#E53935" />
          <line x1={25 + i * 24} y1={28} x2={28 + i * 24} y2={24} stroke={C.correct} strokeWidth="2" />
        </g>
      ))}
      <text x="73" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#E53935">5 red</text>
      {/* Plus */}
      <text x="140" y="44" fontSize="16" fontWeight="bold" fill={C.dark}>+</text>
      {/* Green apples */}
      {[0, 1, 2].map(i => (
        <g key={`g${i}`}>
          <circle cx={160 + i * 24} cy={40} r="10" fill={C.correct} />
          <line x1={160 + i * 24} y1={28} x2={163 + i * 24} y2={24} stroke="#2E7D32" strokeWidth="2" />
        </g>
      ))}
      <text x="184" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.correct}>3 green</text>
    </SvgWrap>
  );
}

// num-e6: Comparing numbers - biggest
export function NumE6() {
  return (
    <SvgWrap label="Numbers 12, 21, 9, 15, 18 with 21 highlighted as biggest">
      {[
        { n: 12, h: 36 },
        { n: 21, h: 63 },
        { n: 9, h: 27 },
        { n: 15, h: 45 },
        { n: 18, h: 54 },
      ].map((item, i) => {
        const x = 25 + i * 36;
        const isBiggest = item.n === 21;
        return (
          <g key={item.n}>
            <rect
              x={x}
              y={95 - item.h}
              width="28"
              height={item.h}
              rx="3"
              fill={isBiggest ? C.primary : C.secondary}
              opacity={isBiggest ? 1 : 0.5}
            />
            <text x={x + 14} y={108} textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>{item.n}</text>
          </g>
        );
      })}
    </SvgWrap>
  );
}

// num-m1: 15 stickers - 7 + 4
export function NumM1() {
  return (
    <SvgWrap label="15 stickers minus 7 plus 4 equals 12" viewBox="0 0 240 100">
      {/* 15 stickers */}
      <DotGroup count={15} cols={5} cx={45} cy={40} color={C.secondary} r={5} spacing={13} />
      <text x="45" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.dark}>15</text>
      {/* Minus 7 */}
      <text x="90" y="42" fontSize="14" fontWeight="bold" fill={C.primary}>−7</text>
      {/* 8 stickers */}
      <DotGroup count={8} cols={4} cx={130} cy={38} color={C.secondary} r={5} spacing={13} />
      <text x="130" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.dark}>8</text>
      {/* Plus 4 */}
      <text x="168" y="42" fontSize="14" fontWeight="bold" fill={C.correct}>+4</text>
      {/* 12 stickers */}
      <DotGroup count={12} cols={4} cx={210} cy={40} color={C.correct} r={5} spacing={13} />
      <text x="210" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.dark}>?</text>
    </SvgWrap>
  );
}

// num-m2: Halfway between 4 and 10
export function NumM2() {
  return (
    <SvgWrap label="Number line from 4 to 10 with 7 highlighted in the middle">
      <NumberLine min={4} max={10} highlights={[7]} y={60} />
      {/* Bracket showing equal distances */}
      <path d="M 40,45 L 68,35 L 96,45" fill="none" stroke={C.primary} strokeWidth="1.5" />
      <text x="68" y="30" textAnchor="middle" fontSize="9" fill={C.primary}>3</text>
      <path d="M 96,45 L 124,35 L 152,45" fill="none" stroke={C.primary} strokeWidth="1.5" />
      <text x="124" y="30" textAnchor="middle" fontSize="9" fill={C.primary}>3</text>
    </SvgWrap>
  );
}

// num-m3: Toy costs 20, Anna has 8, Ben has 9
export function NumM3() {
  return (
    <SvgWrap label="A toy costing 20 coins, with 8 and 9 coins shown" viewBox="0 0 220 110">
      {/* Toy */}
      <rect x="80" y="5" width="60" height="30" rx="6" fill={C.yellow} stroke={C.dark} strokeWidth="1.5" />
      <text x="110" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.dark}>20 🪙</text>
      {/* Anna's coins */}
      <DotGroup count={8} cols={4} cx={55} cy={70} color={C.secondary} r={6} spacing={15} />
      <text x="55" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.dark}>Anna: 8</text>
      {/* Ben's coins */}
      <DotGroup count={9} cols={5} cx={160} cy={70} color={C.primary} r={6} spacing={15} />
      <text x="160" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.dark}>Ben: 9</text>
    </SvgWrap>
  );
}

// num-m4: Which sum is biggest?
export function NumM4() {
  return (
    <SvgWrap label="Five addition problems to compare" viewBox="0 0 220 100">
      {[
        { expr: '5+6', val: 11 },
        { expr: '4+8', val: 12 },
        { expr: '7+3', val: 10 },
        { expr: '9+2', val: 11 },
        { expr: '6+7', val: 13 },
      ].map((item, i) => {
        const x = 22 + i * 40;
        const isBiggest = item.val === 13;
        return (
          <g key={item.expr}>
            <rect
              x={x - 14} y={20} width="32" height="50" rx="6"
              fill={isBiggest ? C.primary : C.cream}
              stroke={isBiggest ? C.primary : C.gray}
              strokeWidth={isBiggest ? 2.5 : 1.5}
            />
            <text x={x + 2} y={42} textAnchor="middle" fontSize="9" fontWeight="bold" fill={isBiggest ? C.white : C.dark}>{item.expr}</text>
            <text x={x + 2} y={60} textAnchor="middle" fontSize="11" fontWeight="bold" fill={isBiggest ? C.white : C.dark}>={item.val}</text>
          </g>
        );
      })}
      <text x="110" y="90" textAnchor="middle" fontSize="9" fill={C.dark}>Which is biggest?</text>
    </SvgWrap>
  );
}

// num-m5: Digits 1 through 9
export function NumM5() {
  return (
    <SvgWrap label="Numbers 1 through 9 each shown as a single digit">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
        <g key={n}>
          <circle cx={20 + i * 20} cy={50} r="9" fill={C.secondary} opacity="0.8" />
          <text x={20 + i * 20} y={54} textAnchor="middle" fontSize="11" fontWeight="bold" fill={C.white}>{n}</text>
        </g>
      ))}
      <text x="100" y="80" textAnchor="middle" fontSize="10" fill={C.dark}>9 digits total</text>
    </SvgWrap>
  );
}

// num-m6: 5 baskets with 4 oranges each
export function NumM6() {
  return (
    <SvgWrap label="5 baskets each containing 4 oranges" viewBox="0 0 220 100">
      {[0, 1, 2, 3, 4].map(i => (
        <Basket key={i} x={30 + i * 42} y={40} items={4} itemColor={C.primary} />
      ))}
      <text x="110" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.dark}>5 × 4 = ?</text>
    </SvgWrap>
  );
}

// num-h1: Two-digit number: tens digit = ones + 3, ones = 2
export function NumH1() {
  return (
    <SvgWrap label="A two-digit number with tens digit 3 more than ones digit 2">
      {/* Tens box */}
      <rect x="50" y="25" width="45" height="55" rx="6" fill={C.primary} opacity="0.8" stroke={C.dark} strokeWidth="2" />
      <text x="72" y="60" textAnchor="middle" fontSize="26" fontWeight="bold" fill={C.white}>?</text>
      <text x="72" y="95" textAnchor="middle" fontSize="9" fill={C.dark}>tens</text>
      {/* Ones box */}
      <rect x="105" y="25" width="45" height="55" rx="6" fill={C.secondary} opacity="0.8" stroke={C.dark} strokeWidth="2" />
      <text x="127" y="60" textAnchor="middle" fontSize="26" fontWeight="bold" fill={C.white}>2</text>
      <text x="127" y="95" textAnchor="middle" fontSize="9" fill={C.dark}>ones</text>
      {/* Arrow showing +3 relationship */}
      <path d="M 127,22 C 127,5 72,5 72,22" fill="none" stroke={C.correct} strokeWidth="2" />
      <text x="100" y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.correct}>+3</text>
    </SvgWrap>
  );
}

// num-h2: 8 + ★ = 5 + 9
export function NumH2() {
  return (
    <SvgWrap label="Equation: 8 plus star equals 5 plus 9">
      {/* Left side */}
      <rect x="15" y="30" width="70" height="45" rx="8" fill={C.secondary} opacity="0.2" stroke={C.secondary} strokeWidth="2" />
      <text x="35" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C.secondary}>8</text>
      <text x="52" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.dark}>+</text>
      <text x="70" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C.primary}>★</text>
      {/* Equals */}
      <text x="100" y="58" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C.dark}>=</text>
      {/* Right side */}
      <rect x="115" y="30" width="70" height="45" rx="8" fill={C.primary} opacity="0.2" stroke={C.primary} strokeWidth="2" />
      <text x="135" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C.correct}>5</text>
      <text x="150" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.dark}>+</text>
      <text x="167" y="60" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C.correct}>9</text>
    </SvgWrap>
  );
}

// num-h3: Double a number and add 3 to get 13
export function NumH3() {
  return (
    <SvgWrap label="A mystery number doubled plus 3 equals 13" viewBox="0 0 240 100">
      {/* Mystery number */}
      <circle cx="30" cy="45" r="18" fill={C.primary} opacity="0.8" />
      <text x="30" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.white}>?</text>
      {/* x2 */}
      <text x="62" y="50" fontSize="14" fontWeight="bold" fill={C.dark}>×2</text>
      {/* Arrow */}
      <text x="85" y="48" fontSize="14" fill={C.dark}>→</text>
      {/* Doubled */}
      <circle cx="110" cy="45" r="18" fill={C.secondary} opacity="0.8" />
      <text x="110" y="50" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.white}>??</text>
      {/* +3 */}
      <text x="140" y="50" fontSize="14" fontWeight="bold" fill={C.dark}>+3</text>
      {/* Arrow */}
      <text x="162" y="48" fontSize="14" fill={C.dark}>→</text>
      {/* Result */}
      <circle cx="190" cy="45" r="18" fill={C.correct} />
      <text x="190" y="51" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.white}>13</text>
    </SvgWrap>
  );
}

// num-h4: Arrange 1,2,3 to make largest 3-digit number
export function NumH4() {
  return (
    <SvgWrap label="Digits 1, 2, 3 to arrange into the largest number">
      {/* Available digits */}
      {[1, 2, 3].map((n, i) => (
        <g key={n}>
          <circle cx={40 + i * 35} cy={35} r="14" fill={C.secondary} />
          <text x={40 + i * 35} y={40} textAnchor="middle" fontSize="16" fontWeight="bold" fill={C.white}>{n}</text>
        </g>
      ))}
      {/* Arrow */}
      <text x="100" y="70" textAnchor="middle" fontSize="12" fill={C.dark}>↓ Arrange for biggest! ↓</text>
      {/* Slots */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={50 + i * 38} y={80} width="30" height="30" rx="4" fill={C.cream} stroke={C.primary} strokeWidth="2" />
      ))}
      <text x="65" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.primary}>?</text>
      <text x="103" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.primary}>?</text>
      <text x="141" y="100" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.primary}>?</text>
    </SvgWrap>
  );
}

// num-h5: Three consecutive numbers sum to 18
export function NumH5() {
  return (
    <SvgWrap label="Three consecutive numbers that add up to 18">
      {/* Three boxes */}
      {['?', '?+1', '?+2'].map((label, i) => (
        <g key={i}>
          <rect x={30 + i * 55} y={25} width="42" height="42" rx="6" fill={[C.secondary, C.primary, C.correct][i]} opacity="0.8" />
          <text x={51 + i * 55} y={52} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.white}>{label}</text>
        </g>
      ))}
      {/* Plus signs */}
      <text x="79" y="50" fontSize="14" fontWeight="bold" fill={C.dark}>+</text>
      <text x="134" y="50" fontSize="14" fontWeight="bold" fill={C.dark}>+</text>
      {/* Equals */}
      <text x="100" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.dark}>= 18</text>
    </SvgWrap>
  );
}

// num-h6: Coins puzzle: give away 5 = 3 left; get 4 more = ?
export function NumH6() {
  return (
    <SvgWrap label="Coin puzzle: start unknown, minus 5 equals 3, plus 4 equals what" viewBox="0 0 240 100">
      {/* Start */}
      <circle cx="30" cy="40" r="18" fill={C.yellow} stroke={C.dark} strokeWidth="1.5" />
      <text x="30" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.dark}>?</text>
      <text x="30" y="75" textAnchor="middle" fontSize="8" fill={C.dark}>Start</text>
      {/* -5 arrow */}
      <text x="60" y="38" fontSize="11" fontWeight="bold" fill={C.primary}>−5</text>
      <text x="75" y="44" fontSize="12" fill={C.dark}>→</text>
      {/* 3 left */}
      <circle cx="100" cy="40" r="18" fill={C.secondary} />
      <text x="100" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.white}>3</text>
      <text x="100" y="75" textAnchor="middle" fontSize="8" fill={C.dark}>Left</text>
      {/* Divider */}
      <line x1="130" y1="15" x2="130" y2="90" stroke={C.lightGray} strokeWidth="1" strokeDasharray="3,3" />
      {/* Start again */}
      <circle cx="155" cy="40" r="18" fill={C.yellow} stroke={C.dark} strokeWidth="1.5" />
      <text x="155" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.dark}>?</text>
      {/* +4 arrow */}
      <text x="185" y="38" fontSize="11" fontWeight="bold" fill={C.correct}>+4</text>
      <text x="198" y="44" fontSize="12" fill={C.dark}>→</text>
      {/* Result */}
      <circle cx="220" cy="40" r="18" fill={C.correct} />
      <text x="220" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C.white}>??</text>
    </SvgWrap>
  );
}

export const numberSenseIllustrations: Record<string, React.FC> = {
  'num-e1': NumE1,
  'num-e2': NumE2,
  'num-e3': NumE3,
  'num-e4': NumE4,
  'num-e5': NumE5,
  'num-e6': NumE6,
  'num-m1': NumM1,
  'num-m2': NumM2,
  'num-m3': NumM3,
  'num-m4': NumM4,
  'num-m5': NumM5,
  'num-m6': NumM6,
  'num-h1': NumH1,
  'num-h2': NumH2,
  'num-h3': NumH3,
  'num-h4': NumH4,
  'num-h5': NumH5,
  'num-h6': NumH6,
};
