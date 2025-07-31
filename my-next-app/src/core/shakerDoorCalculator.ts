import { DoorDimensions, MaterialCut } from "./types";

/**
 * Calculates the material cuts for a shaker door (rails, stiles, center panel).
 * @param door DoorDimensions
 * @param railWidth Width of the horizontal rails (mm)
 * @param stileWidth Width of the vertical stiles (mm)
 * @param panelGap Gap for panel expansion (mm, default 2)
 * @returns MaterialCut[]
 */
export function calculateShakerDoorParts(
  door: DoorDimensions,
  railWidth: number,
  stileWidth: number,
  panelGap: number = 2
): MaterialCut[] {
  // Two stiles (vertical)
  const stileHeight = door.height;
  // Two rails (horizontal)
  const railLength = door.width - 2 * stileWidth;
  // Center panel
  const panelWidth = door.width - 2 * stileWidth + panelGap;
  const panelHeight = door.height - 2 * railWidth + panelGap;

  return [
    { partName: "Stile", width: stileWidth, height: stileHeight, quantity: 2 },
    { partName: "Rail", width: railLength, height: railWidth, quantity: 2 },
    { partName: "Panel", width: panelWidth, height: panelHeight, quantity: 1 },
  ];
}

/**
 * Calculates the lengths and quantities of stiles and rails, and the dimensions for the center panel of a shaker door.
 * @param doorDimensions DoorDimensions
 * @param stileWidth Width of the vertical stiles (mm)
 * @param railWidth Width of the horizontal rails (mm)
 * @returns { topRail: number; bottomRail: number; stiles: number; panelWidth: number; panelHeight: number }
 */
export function calculateShakerDoorComponents(
  doorDimensions: DoorDimensions,
  stileWidth: number,
  railWidth: number
): {
  topRail: number;
  bottomRail: number;
  stiles: number;
  panelWidth: number;
  panelHeight: number;
} {
  const { width, height } = doorDimensions;
  // Top and bottom rails span between the stiles
  const topRail = width - 2 * stileWidth;
  const bottomRail = topRail;
  // Stiles run the full height
  const stiles = height;
  // Center panel fits between rails and stiles
  const panelWidth = width - 2 * stileWidth;
  const panelHeight = height - 2 * railWidth;

  return {
    topRail,
    bottomRail,
    stiles,
    panelWidth,
    panelHeight,
  };
}
