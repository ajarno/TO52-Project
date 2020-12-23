import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  fileDropzone: {
    width: "80%",
    "& .MuiGrid-spacing-xs-8": {
      margin: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
    },
    "& .MuiGrid-item": {
      padding: "10px",
      maxWidth: "max-content",
    },
    "& .MuiDropzonePreviewList-removeButton": {
      top: "34%",
      right: "36%",
    },
  },
}));

export default function PicturesDropzone(props) {
  const classes = useStyles();

  return (
    <div className={classes.fileDropzone}>
    <DropzoneArea
      initialFiles={props.initFiles}
      showAlerts={["error"]}
      getFileLimitExceedMessage={(filesLimit) =>
        `Nombre maximal de fichiers autorisé dépassé. Seulement ${filesLimit} images autorisées.`
      }
      getDropRejectMessage={(rejectedFile) =>
        `Le fichier ${rejectedFile.name} a été rejeté.`
      }
      filesLimit={5}
      acceptedFiles={["image/*"]}
      dropzoneText={
        "Glissez-déposez une image ici ou cliquez pour choisir votre fichier"
      }
      onChange={props.onChange}
    />
  </div>
  );
}
