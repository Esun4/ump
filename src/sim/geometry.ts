// Field geometry for the play simulator, in feet. Home plate is the
// origin, +y runs out through second base to center field, +x toward the
// first-base side. Keeping everything in feet means the 50/70 and 90-ft
// diamonds later are just a different set of constants.

export interface Pt {
  x: number;
  y: number;
}

export const BASEPATH = 60;
const HALF = BASEPATH / Math.SQRT2; // 42.43 — base-to-axis offset

export const HOME: Pt = { x: 0, y: 0 };
export const FIRST: Pt = { x: HALF, y: HALF };
export const SECOND: Pt = { x: 0, y: 2 * HALF };
export const THIRD: Pt = { x: -HALF, y: HALF };
export const MOUND: Pt = { x: 0, y: 46 }; // pitching rubber, 46 ft

export const FENCE_R = 185;
export const DIRT_R = 50; // skinned-infield circle around the mound
export const HOME_CIRCLE_R = 13;

// The drawable world: x spans the foul poles plus margin, y from behind
// the plate to the center-field fence. FieldCanvas maps this to pixels.
export const WORLD = { minX: -150, maxX: 150, minY: -35, maxY: 195 };
export const WORLD_W = WORLD.maxX - WORLD.minX;
export const WORLD_H = WORLD.maxY - WORLD.minY;

// ── Umpire landmarks (2026 LL manual) ────────────────────────────────────
export const PU_ISP: Pt = { x: 0, y: -11 }; // behind the catcher
export const POP: Pt = { x: 0, y: -7 }; // point of plate
export const A_POS: Pt = { x: 52, y: 47 }; // foul ground behind 1B
export const B_POS: Pt = { x: 29, y: 64 }; // outside, 1B-2B side
export const C_POS: Pt = { x: -16, y: 77 }; // outside, behind F6
export const D_POS: Pt = { x: -52, y: 47 }; // foul ground behind 3B (U3)
export const U2_B: Pt = { x: 14, y: 76 }; // 4-man U2, B side
export const U2_C: Pt = { x: -14, y: 76 }; // 4-man U2, C side

// Working Area (2-man) / Restricted Area (4-man): behind the mound,
// halfway to the 2B cutout, shaded to the side the play demands.
export const WA: Pt = { x: 0, y: 62 };
export const WA_1B: Pt = { x: 10, y: 60 };
export const WA_3B: Pt = { x: -10, y: 60 };

export const PO1: Pt = { x: 47, y: 41 }; // topside corner of 1B, foul
export const PO3: Pt = { x: -47, y: 41 }; // topside corner of 3B, foul
export const PO2_1B: Pt = { x: 9, y: 90 }; // point of 2B, 1B side
export const PO2_3B: Pt = { x: -9, y: 90 }; // point of 2B, 3B side

// Spots umpires move through that aren't bases: PU clearing the catcher
// up either line, the 2-man PU's fly-ball read near the dirt circle, and
// the cutouts BU closes into for imminent plays.
export const PU_3B_LINE: Pt = { x: -30, y: 26 }; // up the 3B line, foul
export const PU_3B_DEEP: Pt = { x: -44, y: 38 }; // nearly at 3B, foul
export const PU_1B_LINE: Pt = { x: 30, y: 26 }; // up the 1B line, foul
export const PU_READ_L: Pt = { x: -14, y: 6 }; // clearing left for a read
export const CUT_2B: Pt = { x: -4, y: 76 }; // closing into the 2B cutout
export const CUT_3B: Pt = { x: -34, y: 46 }; // closing toward 3B

// ── Defensive alignment (60-ft) ──────────────────────────────────────────
export const F1: Pt = MOUND;
export const F2: Pt = { x: 0, y: -5 };
export const F3: Pt = { x: 36, y: 50 };
export const F4: Pt = { x: 18, y: 68 };
export const F5: Pt = { x: -36, y: 50 };
export const F6: Pt = { x: -18, y: 68 };
export const F7: Pt = { x: -58, y: 122 };
export const F8: Pt = { x: 0, y: 140 };
export const F9: Pt = { x: 58, y: 122 };

export function midpoint(a: Pt, b: Pt, f = 0.5): Pt {
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}
