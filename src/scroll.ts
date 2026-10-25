/*
  Scroll choreography for the stage.

  Adapted from the Marlin timeline: a hold on the hero, one long move that
  carries the hero off and brings the services group up, a short hold, then a
  second move that hands over to the About group, which settles and holds
  before the page releases into ordinary flow.

      0.00 - 0.36   hero holds; photo 1 -> 2 crossfade at 0.20
      0.36 - 0.62   move 1: hero up and out, services rises; photo 2 -> 3
      0.62 - 0.72   services holds
      0.72 - 0.90   move 2: services up and out, About rises; photo 3 -> 4
      0.90 - 1.00   About holds, then the footer sections scroll in

  The hero's words are NOT on the scrollbar. In Marlin they were, which left
  the first screen empty until the visitor scrolled; here they play on load,
  on a clock, with Marlin's stagger (0 / 75 / 150ms, body at 200 / 275 / 350ms)
  stretched a little for a softer serif.
*/

export const SCROLL_VH = 560

/** Phase windows as scroll progress. */
export const P = {
  move1: [0.36, 0.62],
  move2: [0.72, 0.9],
  /* the four service tiles ride in during move 1, staggered by 0.02 */
  tiles: [0.4, 0.56],
} as const

/** Centre of each photo crossfade, and its half-width. */
export const SEQ = [0.2, 0.49, 0.81] as const
export const SEQ_BAND = 0.035

/** Load-time reveal windows, in ms after mount. */
export const INTRO = {
  word: [0, 700],
  word2: [90, 790],
  word3: [180, 880],
  body1: [300, 1000],
  body2: [380, 1080],
  body3: [460, 1160],
  card: [520, 1500],
} as const
export const INTRO_MS = 1600

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
