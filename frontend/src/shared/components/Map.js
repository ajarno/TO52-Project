import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "50%",
  },
});

export default function AdDisplayer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.location && (
        <MapContainer
          className={classes.map}
          center={[props.location.lat, props.location.lg]}
          zoom={11}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.location.lat, props.location.lg]}>
            <Popup>
              Le bien proposé est situé à {props.location.city}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </React.Fragment>
  );
}
