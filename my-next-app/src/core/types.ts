// Shared TypeScript types for CabinetCalc

export type Cabinet = {
  id: string;
  width: number;
  height: number;
  depth: number;
  material: string;
};

export type Project = {
  id: string;
  name: string;
  cabinets: Cabinet[];
  createdAt: Date;
};

export interface OpeningDimensions {
  width: number;
  height: number;
}

export interface DoorOptions {
  overlay: number; // e.g., mm or inches
  gap: number; // e.g., mm or inches
  type: "inset" | "overlay";
}

export interface DoorDimensions {
  width: number;
  height: number;
}

export interface DrawerOptions {
  boxHeight: number;
  frontHeight: number;
  overlay: number;
  gap: number;
  type: "inset" | "overlay";
}

export interface HardwareLocation {
  x: number;
  y: number;
  pattern?: string; // e.g., '32mm', 'custom', etc.
}

export interface MaterialCut {
  partName: string;
  width: number;
  height: number;
  quantity: number;
}
