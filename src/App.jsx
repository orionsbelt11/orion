import { useState, useEffect, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import Sidebar from "./components/Sidebar";
import MapChart from "./components/MapChart";
import Legend from "./components/Legend";
import { buildColorScale } from "./utils/colorScale";
import styles from "./App.module.css";

const INDICATOR_FILES = {
  population: "/data/population.json",
  median_income: "/data/median_income.json",
  unemployment: "/data/unemployment.json",
};

export default function App() {
  const [selectedIndicator, setSelectedIndicator] = useState("population");
  const [geoLevel, setGeoLevel] = useState("states");
  const [indicatorData, setIndicatorData] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    const url = INDICATOR_FILES[selectedIndicator];
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIndicatorData(data);
      })
      .catch((err) => console.error("Failed to load indicator data:", err));
    return () => {
      cancelled = true;
    };
  }, [selectedIndicator]);

  const dataMap = indicatorData ? indicatorData[geoLevel] || {} : {};
  const { colorScale, domain } = buildColorScale(selectedIndicator, dataMap);
  const format = indicatorData?.format || ",";
  const indicatorName = indicatorData?.name || selectedIndicator;

  const handleTooltip = useCallback((content) => {
    setTooltipContent(content);
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>US Data Dashboard</h1>
        {indicatorName && (
          <span className={styles.subtitle}>{indicatorName}</span>
        )}
      </header>

      <div className={styles.body}>
        <Sidebar
          selectedIndicator={selectedIndicator}
          onIndicatorChange={setSelectedIndicator}
          geoLevel={geoLevel}
          onGeoLevelChange={setGeoLevel}
        />

        <main className={styles.main}>
          <MapChart
            geoLevel={geoLevel}
            dataMap={dataMap}
            colorScale={colorScale}
            format={format}
            indicatorName={indicatorName}
            setTooltipContent={handleTooltip}
          />
          <Legend colorScale={colorScale} domain={domain} format={format} />
        </main>
      </div>

      <Tooltip id="map-tooltip" content={tooltipContent} float />

      <footer className={styles.footer}>
        Data based on publicly available US Census &amp; Bureau of Labor
        Statistics estimates.
      </footer>
    </div>
  );
}
