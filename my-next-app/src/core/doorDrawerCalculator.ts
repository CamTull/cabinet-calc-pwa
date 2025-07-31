import {
  OpeningDimensions,
  DoorOptions,
  DoorDimensions,
  DrawerOptions,
  MaterialCut,
} from "./types";

// Calculates the dimensions for a cabinet door based on opening and options
export function calculateDoorDimensions(
  opening: OpeningDimensions,
  options: DoorOptions
): DoorDimensions {
  if (options.type === "inset") {
    return {
      width: opening.width - options.gap * 2,
      height: opening.height - options.gap * 2,
    };
  } else {
    // overlay
    return {
      width: opening.width + options.overlay * 2,
      height: opening.height + options.overlay * 2,
    };
  }
}

// Calculates the material cuts for a door
export function getDoorMaterialCuts(
  door: DoorDimensions,
  partName = "Door",
  quantity = 1
): MaterialCut[] {
  return [
    {
      partName,
      width: door.width,
      height: door.height,
      quantity,
    },
  ];
}

// Calculates the material cuts for a drawer front
export function getDrawerFrontMaterialCuts(
  opening: OpeningDimensions,
  options: DrawerOptions,
  partName = "Drawer Front",
  quantity = 1
): MaterialCut[] {
  let width: number;
  let height: number;
  if (options.type === "inset") {
    width = opening.width - options.gap * 2;
    height = options.frontHeight - options.gap * 2;
  } else {
    width = opening.width + options.overlay * 2;
    height = options.frontHeight + options.overlay * 2;
  }
  return [
    {
      partName,
      width,
      height,
      quantity,
    },
  ];
}

/**
 * Calculates the required door dimensions for a single door.
 * Assumes a standard overlay (applied to all four sides).
 */
export function calculateSingleDoor(
  opening: OpeningDimensions,
  options: DoorOptions
): DoorDimensions {
  // Overlay is applied to both sides (left/right or top/bottom)
  const width = opening.width + options.overlay * 2;
  const height = opening.height + options.overlay * 2;
  return { width, height };
}

/**
 * Calculates the required door dimensions for a pair of double doors.
 * Each door covers half the opening width, plus overlay, minus half the gap.
 * The gap is the space between the two doors.
 * Returns a tuple: [leftDoor, rightDoor]
 */
export function calculateDoubleDoors(
  opening: OpeningDimensions,
  options: DoorOptions,
  gapBetween: number
): [DoorDimensions, DoorDimensions] {
  // Each door covers half the opening, plus overlay, minus half the gap
  const singleDoorWidth =
    (opening.width + options.overlay * 2 - gapBetween) / 2;
  const height = opening.height + options.overlay * 2;
  return [
    { width: singleDoorWidth, height },
    { width: singleDoorWidth, height },
  ];
}
