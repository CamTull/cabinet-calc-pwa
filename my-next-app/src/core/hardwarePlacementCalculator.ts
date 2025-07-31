import { HardwareLocation, DoorDimensions } from "./types";

/**
 * Calculates handle placement for a door (e.g., bottom right corner, offset in X/Y)
 * @param door DoorDimensions
 * @param offsetX Distance from the right edge
 * @param offsetY Distance from the bottom edge
 * @returns HardwareLocation
 */
export function calculateHandlePlacement(
  door: DoorDimensions,
  offsetX: number,
  offsetY: number
): HardwareLocation {
  return {
    x: door.width - offsetX,
    y: door.height - offsetY,
    pattern: "handle",
  };
}

/**
 * Calculates evenly spaced hinge locations along the height of a door
 * @param door DoorDimensions
 * @param count Number of hinges
 * @param edgeOffset Distance from top/bottom edge for first/last hinge
 * @returns HardwareLocation[]
 */
export function calculateHingePlacements(
  door: DoorDimensions,
  count: number,
  edgeOffset: number
): HardwareLocation[] {
  if (count < 2) {
    // Place a single hinge at the center
    return [{ x: 0, y: door.height / 2, pattern: "hinge" }];
  }
  const positions: HardwareLocation[] = [];
  const usableHeight = door.height - 2 * edgeOffset;
  for (let i = 0; i < count; i++) {
    const y = edgeOffset + (usableHeight * i) / (count - 1);
    positions.push({ x: 0, y, pattern: "hinge" });
  }
  return positions;
}

/**
 * Calculates drilling locations for Blum Clip Top hinge plates.
 * @param doorHeight Height of the door in mm
 * @param hingeType 'straight' | 'cranked'
 * @param topGap Distance from top edge to first hinge (mm)
 * @param bottomGap Distance from bottom edge to last hinge (mm)
 * @returns { topHinge: number; bottomHinge: number; middleHinges: number[] | null }
 */
export function calculateBlumClipTopHingePlate(
  doorHeight: number,
  hingeType: "straight" | "cranked" = "straight",
  topGap?: number,
  bottomGap?: number
): { topHinge: number; bottomHinge: number; middleHinges: number[] | null } {
  // Standard defaults
  const defaultTopGap = 100;
  const defaultBottomGap = 100;
  const minHeightFor3 = 900;
  const minHeightFor4 = 1600;

  const tGap = topGap ?? defaultTopGap;
  const bGap = bottomGap ?? defaultBottomGap;

  // Decide number of hinges
  let hingeCount = 2;
  if (doorHeight >= minHeightFor4) {
    hingeCount = 4;
  } else if (doorHeight >= minHeightFor3) {
    hingeCount = 3;
  }

  // Calculate positions
  const topHinge = tGap;
  const bottomHinge = doorHeight - bGap;
  let middleHinges: number[] | null = null;

  if (hingeCount === 3) {
    middleHinges = [doorHeight / 2];
  } else if (hingeCount === 4) {
    // Evenly space two middle hinges
    const span = bottomHinge - topHinge;
    middleHinges = [topHinge + span / 3, topHinge + (2 * span) / 3];
  }

  return { topHinge, bottomHinge, middleHinges };
}

/**
 * Calculates drilling points for Blum Tandembox drawer systems (M, B, D models).
 * Returns arrays of drill points for front bracket, side, and bottom.
 * @param drawerBoxWidth Width of the drawer box (mm)
 * @param drawerBoxDepth Depth of the drawer box (mm)
 * @param slideLength Length of the slide (mm)
 * @param model 'M' | 'B' | 'D'
 */
export function calculateBlumTandemboxDrillPoints(
  drawerBoxWidth: number,
  drawerBoxDepth: number,
  slideLength: number,
  model: "M" | "B" | "D"
): {
  frontBracket: { x: number; y: number }[];
  sideDrill: { x: number; y: number }[];
  bottomDrill: { x: number; y: number }[];
} {
  // Common drilling patterns (in mm) for demonstration
  // These are typical for Blum Tandembox, but should be checked against official docs for production
  let frontBracket: { x: number; y: number }[] = [];
  let sideDrill: { x: number; y: number }[] = [];
  let bottomDrill: { x: number; y: number }[] = [];

  if (model === "M") {
    // M: Standard pattern
    frontBracket = [
      { x: 37, y: 9 },
      { x: drawerBoxWidth - 37, y: 9 },
    ];
    sideDrill = [
      { x: 37, y: 37 },
      { x: drawerBoxWidth - 37, y: 37 },
    ];
    bottomDrill = [
      { x: 37, y: drawerBoxDepth - 37 },
      { x: drawerBoxWidth - 37, y: drawerBoxDepth - 37 },
    ];
  } else if (model === "B") {
    // B: Deeper box, slightly different pattern
    frontBracket = [
      { x: 42, y: 12 },
      { x: drawerBoxWidth - 42, y: 12 },
    ];
    sideDrill = [
      { x: 42, y: 42 },
      { x: drawerBoxWidth - 42, y: 42 },
    ];
    bottomDrill = [
      { x: 42, y: drawerBoxDepth - 42 },
      { x: drawerBoxWidth - 42, y: drawerBoxDepth - 42 },
    ];
  } else if (model === "D") {
    // D: Tallest box, more robust pattern
    frontBracket = [
      { x: 50, y: 15 },
      { x: drawerBoxWidth - 50, y: 15 },
    ];
    sideDrill = [
      { x: 50, y: 50 },
      { x: drawerBoxWidth - 50, y: 50 },
    ];
    bottomDrill = [
      { x: 50, y: drawerBoxDepth - 50 },
      { x: drawerBoxWidth - 50, y: drawerBoxDepth - 50 },
    ];
  }

  return { frontBracket, sideDrill, bottomDrill };
}
