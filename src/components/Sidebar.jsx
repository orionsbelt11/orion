import styles from "./Sidebar.module.css";

const INDICATORS = [
  { id: "population", label: "Population" },
  { id: "median_income", label: "Median Household Income" },
  { id: "unemployment", label: "Unemployment Rate" },
];

const LEVELS = [
  { id: "states", label: "States" },
  { id: "counties", label: "Counties" },
];

export default function Sidebar({
  selectedIndicator,
  onIndicatorChange,
  geoLevel,
  onGeoLevelChange,
}) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Indicator</h2>
      <ul className={styles.list}>
        {INDICATORS.map((ind) => (
          <li key={ind.id} className={styles.item}>
            <label className={styles.label}>
              <input
                type="radio"
                name="indicator"
                value={ind.id}
                checked={selectedIndicator === ind.id}
                onChange={() => onIndicatorChange(ind.id)}
                className={styles.radio}
              />
              {ind.label}
            </label>
          </li>
        ))}
      </ul>

      <h2 className={styles.heading}>Geography Level</h2>
      <div className={styles.toggle}>
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            className={`${styles.toggleBtn} ${
              geoLevel === lvl.id ? styles.active : ""
            }`}
            onClick={() => onGeoLevelChange(lvl.id)}
          >
            {lvl.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
