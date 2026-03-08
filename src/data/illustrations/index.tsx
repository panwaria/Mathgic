import React from 'react';
import { geometryIllustrations } from './geometry';
import { numberSenseIllustrations } from './number-sense';
import { logicIllustrations } from './logic';

/**
 * Map of question ID to its inline SVG illustration component.
 * AI-generated questions won't have entries here and will gracefully show no illustration.
 */
export const illustrationMap: Record<string, React.FC> = {
  ...geometryIllustrations,
  ...numberSenseIllustrations,
  ...logicIllustrations,
};
