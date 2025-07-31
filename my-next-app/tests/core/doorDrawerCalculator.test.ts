import {
  calculateSingleDoor,
  calculateDoubleDoors,
} from "../../src/core/doorDrawerCalculator";
import { OpeningDimensions, DoorOptions } from "../../src/core/types";

describe("doorDrawerCalculator", () => {
  describe("calculateSingleDoor", () => {
    it("calculates single door with overlay", () => {
      const opening: OpeningDimensions = { width: 400, height: 700 };
      const options: DoorOptions = { overlay: 18, gap: 2, type: "overlay" };
      const result = calculateSingleDoor(opening, options);
      expect(result).toEqual({ width: 436, height: 736 });
    });

    it("calculates single door with zero overlay", () => {
      const opening: OpeningDimensions = { width: 400, height: 700 };
      const options: DoorOptions = { overlay: 0, gap: 2, type: "overlay" };
      const result = calculateSingleDoor(opening, options);
      expect(result).toEqual({ width: 400, height: 700 });
    });
  });

  describe("calculateSingleDoor edge cases", () => {
    it("returns correct dimensions for zero opening size", () => {
      const opening: OpeningDimensions = { width: 0, height: 0 };
      const options: DoorOptions = { overlay: 18, gap: 2, type: "overlay" };
      const result = calculateSingleDoor(opening, options);
      expect(result).toEqual({ width: 36, height: 36 });
    });

    it("returns correct dimensions for negative overlay (should shrink door)", () => {
      const opening: OpeningDimensions = { width: 400, height: 700 };
      const options: DoorOptions = { overlay: -5, gap: 2, type: "overlay" };
      const result = calculateSingleDoor(opening, options);
      expect(result).toEqual({ width: 390, height: 690 });
    });
  });

  describe("calculateDoubleDoors", () => {
    it("calculates double doors with overlay and gap", () => {
      const opening: OpeningDimensions = { width: 500, height: 700 };
      const options: DoorOptions = { overlay: 18, gap: 2, type: "overlay" };
      const gapBetween = 3;
      const [left, right] = calculateDoubleDoors(opening, options, gapBetween);
      expect(left).toEqual({ width: 266.5, height: 736 });
      expect(right).toEqual({ width: 266.5, height: 736 });
    });

    it("calculates double doors with zero overlay and gap", () => {
      const opening: OpeningDimensions = { width: 500, height: 700 };
      const options: DoorOptions = { overlay: 0, gap: 2, type: "overlay" };
      const gapBetween = 0;
      const [left, right] = calculateDoubleDoors(opening, options, gapBetween);
      expect(left).toEqual({ width: 250, height: 700 });
      expect(right).toEqual({ width: 250, height: 700 });
    });
  });

  describe("calculateDoubleDoors edge cases", () => {
    it("handles very small gap between doors", () => {
      const opening: OpeningDimensions = { width: 500, height: 700 };
      const options: DoorOptions = { overlay: 18, gap: 2, type: "overlay" };
      const gapBetween = 0.1;
      const [left, right] = calculateDoubleDoors(opening, options, gapBetween);
      expect(left).toEqual({ width: 268.95, height: 736 });
      expect(right).toEqual({ width: 268.95, height: 736 });
    });

    it("returns zero width/height for zero opening and overlay", () => {
      const opening: OpeningDimensions = { width: 0, height: 0 };
      const options: DoorOptions = { overlay: 0, gap: 2, type: "overlay" };
      const gapBetween = 0;
      const [left, right] = calculateDoubleDoors(opening, options, gapBetween);
      expect(left).toEqual({ width: 0, height: 0 });
      expect(right).toEqual({ width: 0, height: 0 });
    });
  });
});
