import { useMemo } from "react";
import { formatValue } from "../utils/colorScale";
import styles from "./Legend.module.css";

const SWATCH_COUNT = 60;

export default function Legend({ colorScale, domain, format }) {
  const swatches = useMemo(() => {
    if (!colorScale || !domain) return [];
    const [min, max] = domain;
    return Array.from({ length: SWATCH_COUNT }, (_, i) => {
      const t = min + (i / (SWATCH_COUNT - 1)) * (max - min);
      return colorScale(t);
    });
  }, [colorScale, domain]);

  if (!domain) return null;

  return (
    <div className={styles.legend}>
      <div className={styles.bar}>
        {swatches.map((color, i) => (
          <div
            key={i}
            className={styles.swatch}
            style={{ background: color }}
          />
        ))}
      </div>
      <div className={styles.labels}>
        <span>{formatValue(domain[0], format)}</span>
        <span>{formatValue(domain[1], format)}</span>
      </div>
    </div>
  );
}
