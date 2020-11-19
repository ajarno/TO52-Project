import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles({
  mapContainer: {
    width: "100%",
    height: "25vh",
    borderRadius: 4,
    boxShadow:
      "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  map: {
    width: "100%",
    height: "100%",

    "& .leaflet-marker-icon": {
      filter: "grayscale(100%)",
      WebkitFilter: "grayscale(100%)",
    }
  },
  rounded: {
    borderRadius: 4,
  },
});

export default function AdDisplayer(props) {
  const classes = useStyles();

  const center = [props.location.lat, props.location.lng];

  return (
    <React.Fragment>
      {props.location && (
        <div className={classes.mapContainer}>
          <MapContainer
            className={[
              classes.map,
              props.variant === "rounded" ? classes.rounded : classes.square,
            ].join(" ")}
            center={center}
            zoom={12}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
              center={center}
              pathOptions={{ color: 'transparent', fillColor: '#ffa43f', fillOpacity: 0.3 }}
              radius={500}
            />
            <Circle
              center={center}
              pathOptions={{ color: 'transparent', fillColor: '#ff8600', fillOpacity: 0.3 }}
              radius={200}
            />
            <Marker position={[props.location.lat, props.location.lng]}>
              <Popup>
                Le bien proposé est situé à <br />
                {props.location.street ? props.location.street + ", " : ""}
                {props.location.city}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </React.Fragment>
  );
}
