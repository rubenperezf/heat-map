import "./App.css";
import { geoAlbers, geoAlbersUsa, geoCentroid } from "d3-geo";
// import * as d3 from "d3";
// import * as topojson from "topojson";
import simpleheat from "./simpleheat.js";
import latLong from "./latlong.js";
import {
  ComposableMap,
  Geographies,
  Geography,
  // Marker,
  // Annotation,
} from "react-simple-maps";
import { useEffect } from "react";

let data = [];

const projection = geoAlbersUsa()
  .scale(800)
  .translate([800 / 2, 450 / 2]);

function App() {
  useEffect(() => {
    const elem = document.getElementById("heatmap");
    if (elem) {
      let canvas = elem.getContext("2d");
      latLong.map((x) => data.push(projection([x[0], x[1]])));

      simpleheat("heatmap").radius(5, 5).max(100).data(data).draw();
    }
  }, [document.getElementById("heatmap")]);
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  return (
    <div style={{ position: "relative", width: "800px", height: "450px" }}>
      <canvas
        id="heatmap"
        width="800px"
        height="450px"
        style={{
          position: "absolute",
          left: "0",
          opacity: 0.5,
        }}
      ></canvas>
      <ComposableMap
        style={{
          display: "block",
          zIndex: 1,
          opacity: 1,
          width: "800px",
          height: "450px",
        }}
        projection="geoAlbersUsa"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#DDD"
                />
              ))}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default App;
