import { scaleSequential, scaleQuantize } from "d3-scale";
import {
  interpolateBlues,
  interpolateGreens,
  interpolateOranges,
} from "d3-scale-chromatic";

const palettes = {
  population: interpolateBlues,
  median_income: interpolateGreens,
  unemployment: interpolateOranges,
};

/**
 * Build a sequential colour scale for the given indicator + dataset.
 * Returns { colorScale, domain } where domain = [min, max].
 */
export function buildColorScale(indicatorId, dataMap) {
  const values = Object.values(dataMap).filter((v) => v != null);
  if (values.length === 0) {
    return { colorScale: () => "#eee", domain: [0, 1] };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const interpolator = palettes[indicatorId] || interpolateBlues;

  const colorScale = scaleSequential(interpolator).domain([min, max]);

  return { colorScale, domain: [min, max] };
}

/**
 * Format a value for display using the indicator's format hint.
 */
export function formatValue(value, format) {
  if (value == null) return "N/A";

  if (format === "$,") {
    return "$" + Math.round(value).toLocaleString("en-US");
  }
  if (format === ",") {
    return Math.round(value).toLocaleString("en-US");
  }
  if (format === ".1f") {
    return value.toFixed(1) + "%";
  }
  return String(value);
}
