import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "50%",
    borderRadius: 4,
    boxShadow:
      "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
});

export default function AdDisplayer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.location && (
        <MapContainer
          className={classes.map}
          center={[props.location.lat, props.location.lng]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.location.lat, props.location.lng]}>
            <Popup>
              Le bien proposé est situé à{" "}
              {props.location.street ? props.location.street + ", " : ""}{" "}
              {props.location.city}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </React.Fragment>
  );
}
