/*
  Artboard coordinates.

  As in Marlin, the stage is a fixed artboard with everything absolutely
  positioned at design pixels, then scaled as one piece. Two changes:

  - There are two artboards. A 1440x810 landscape one, and a 390x780 portrait
    one for phones and portrait tablets. A single landscape artboard scaled to
    a 390px phone would set 17px body copy at under 5px.
  - The artboard is scaled to FIT the viewport (min of the two ratios) and
    centred, not width-locked. Width-locking let the bottom of the artboard
    fall below the fold on any window shorter than 16:9, which is most
    laptops once the browser chrome is counted. Every background layer is
    viewport-wide, so the spare margin reads as more of the scene, not as bars.

  If you change the design, change the numbers here. Do not wrap the stage in
  flex or grid.
*/

/** The travelling photo frame. rt/rb are top/bottom corner radii; o is opacity. */
export type Frame = { x: number; y: number; w: number; h: number; rt: number; rb: number; o: number }

export type Layout = {
  W: number
  H: number
  /** frame keyframes: hero, services, about */
  frame: readonly [Frame, Frame, Frame]
  hero: {
    x: number
    w: number
    /** group translateY before and after move 1 */
    y: readonly [number, number]
    size: number
    line: number
    tops: readonly [number, number, number]
    body: { top: number; size: number; line: number; w: number; lines: readonly string[] }
    buttons: number
    card: null | { x: number; y: number; w: number; h: number }
  }
  services: {
    x: number
    w: number
    /** enter, after move 1, after move 2 */
    y: readonly [number, number, number]
    tile: { w: number; h: number; r: number; label: number }
    tiles: readonly (readonly [number, number])[]
    title: { top: number; size: number; line: number }
    text: { top: number; w: number; size: number; line: number }
  }
  about: {
    x: number
    w: number
    y: readonly [number, number, number]
    rule: number
    head: { top: number; w: number; size: number; line: number }
    para: { x: number; top: number; w: number; size: number; line: number }
    link: number
  }
  rail: null | { x: number; y: number }
}

const DW = 1440
const DS = 96 // safe margin
const DGW = DW - DS * 2

export const DESKTOP: Layout = {
  W: DW,
  H: 810,
  frame: [
    { x: 830, y: 120, w: 370, h: 560, rt: 185, rb: 28, o: 1 },
    { x: 595, y: 100, w: 250, h: 380, rt: 125, rb: 24, o: 1 },
    { x: 904, y: 96, w: 440, h: 410, rt: 36, rb: 36, o: 1 },
  ],
  hero: {
    x: DS,
    w: 700,
    y: [150, -860],
    size: 112,
    line: 104,
    tops: [0, 104, 208],
    body: {
      top: 352,
      size: 17,
      line: 28,
      w: 460,
      lines: [
        'Braids, cornrows and protective styles',
        'for every hair type, crafted by hand',
        'in Saxonwold, Rosebank, Johannesburg.',
      ],
    },
    buttons: 470,
    card: { x: 544, y: 300, w: 300, h: 236 },
  },
  services: {
    x: DS,
    w: DGW,
    y: [1050, 110, -1100],
    tile: { w: 255, h: 215, r: 46, label: 19 },
    tiles: [
      [0, 0],
      [DGW - 255, 0],
      [116, 230],
      [DGW - 371, 230],
    ],
    title: { top: 440, size: 64, line: 72 },
    text: { top: 524, w: 640, size: 19, line: 30 },
  },
  about: {
    x: DS,
    w: DGW,
    y: [1350, 760, 120],
    rule: 404,
    head: { top: 428, w: 640, size: 64, line: 68 },
    para: { x: DGW - 440, top: 434, w: 440, size: 16, line: 27 },
    link: 610,
  },
  rail: { x: 1380, y: 300 },
}

const MW = 390
const MS = 24
const MGW = MW - MS * 2

export const MOBILE: Layout = {
  W: MW,
  H: 780,
  frame: [
    { x: MS, y: 80, w: MGW, h: 340, rt: 171, rb: 24, o: 1 },
    { x: MS + 41, y: 60, w: MGW - 82, h: 280, rt: 130, rb: 24, o: 0 },
    { x: MS, y: 80, w: MGW, h: 270, rt: 24, rb: 24, o: 1 },
  ],
  hero: {
    x: MS,
    w: MGW,
    y: [0, -900],
    size: 54,
    line: 54,
    tops: [436, 486, 536],
    body: {
      top: 606,
      size: 15,
      line: 22,
      w: MGW,
      lines: ['Braids, cornrows & protective styles', 'for every hair type, crafted by hand', 'in Saxonwold, Rosebank.'],
    },
    buttons: 690,
    card: null,
  },
  services: {
    x: MS,
    w: MGW,
    y: [1000, 80, -1000],
    tile: { w: 165, h: 140, r: 30, label: 16 },
    tiles: [
      [0, 0],
      [177, 0],
      [0, 152],
      [177, 152],
    ],
    title: { top: 312, size: 40, line: 44 },
    text: { top: 412, w: MGW, size: 15, line: 23 },
  },
  about: {
    x: MS,
    w: MGW,
    y: [1200, 900, 0],
    rule: 372,
    head: { top: 388, w: MGW, size: 40, line: 44 },
    para: { x: 0, top: 492, w: MGW, size: 15, line: 23 },
    link: 628,
  },
  rail: null,
}

/** Portrait viewports and phones get the portrait artboard. */
export const pick = (vw: number, vh: number) => (vw < 640 || vw / vh < 1 ? MOBILE : DESKTOP)
