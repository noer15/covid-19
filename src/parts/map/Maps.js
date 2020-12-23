import React from "react";
import { Map as MapLeaflet, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./mapUtil";
import "./index.css";

function Maps({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapLeaflet center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* loop countries circle */}
        {showDataOnMap(countries, casesType)}
      </MapLeaflet>
    </div>
  );
}

export default Maps;
