import { memo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { formatValue } from "../utils/colorScale";
import styles from "./MapChart.module.css";

const STATES_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const COUNTIES_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

function MapChart({
  geoLevel,
  dataMap,
  colorScale,
  format,
  indicatorName,
  setTooltipContent,
}) {
  const geoUrl = geoLevel === "counties" ? COUNTIES_URL : STATES_URL;
  const featureKey = geoLevel === "counties" ? "counties" : "states";

  const handleMouseEnter = useCallback(
    (geo) => {
      const fips = geo.id;
      const name = geo.properties.name || `FIPS ${fips}`;
      const value = dataMap[fips];
      setTooltipContent(`${name}: ${formatValue(value, format)}`);
    },
    [dataMap, format, setTooltipContent]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltipContent("");
  }, [setTooltipContent]);

  return (
    <div className={styles.wrapper}>
      <ComposableMap
        projection="geoAlbersUsa"
        className={styles.map}
        projectionConfig={{ scale: 1000 }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = geo.id;
                const value = dataMap[fips];
                const fill =
                  value != null && colorScale ? colorScale(value) : "#eee";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#fff"
                    strokeWidth={geoLevel === "counties" ? 0.2 : 0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#ffd43b", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => handleMouseEnter(geo)}
                    onMouseLeave={handleMouseLeave}
                    data-tooltip-id="map-tooltip"
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default memo(MapChart);
