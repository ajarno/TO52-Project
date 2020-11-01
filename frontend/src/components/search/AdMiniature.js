import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, ButtonBase } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function AdMiniature(props) {
  const ad = props.ad;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  console.log("api/" + ad.pictures[0].pic)

  return (
    <React.Fragment>
      <ButtonBase href={"/ads/" + ad.id}
        // style={{
        //   : image.width,
        // }}
      >
        <Box width={210} marginRight={0.5} my={5}>
          {ad.pictures.length > 0  ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={ad.headline}
              src={"api/" + ad.pictures[0].pic}
            />
          ) : (
            <Skeleton
              variant="rect"
              width={210}
              height={118}
              animation={false}
            />
          )}
          <Box pr={2}>
            <Typography gutterBottom variant="body2">
              {ad.headline}
            </Typography>
            <Typography display="block" variant="caption" color="textSecondary">
              {ad.description}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {`${ad.price}€ • publiée ${new Intl.DateTimeFormat(
                "fr-FR",
                dateOptions
              ).format(new Date(ad.published))}`}
            </Typography>
          </Box>
        </Box>
      </ButtonBase>
    </React.Fragment>
  );
}
