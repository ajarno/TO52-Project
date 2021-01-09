import React from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

export default function AdMiniatureLoading() {

  return (
      <Box width={220} marginRight={0.5} my={5}>
        <Skeleton variant="rect" width={220} height={118} />

        <Box pt={0.5}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
  );
}
