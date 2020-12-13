import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  Box,
  Avatar,
  Grid,
  Slider,
} from "@material-ui/core/";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DoneIcon from "@material-ui/icons/Done";
import ImageCrop from "./ImageCrop";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "0 auto",
  },
  input: {
    display: "none",
  },
});

const UTSlider = withStyles((theme) => ({
  root: {
    color: "#ff8600", //Remplacer par la couleur secondary du thème
    height: 8,
    marginTop: 6,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}))(MuiDialogContent);

class AvatarChooser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      image: {
        url: "",
        file: "",
      },
      userProfilePic: "",
      editor: null,
      scaleValue: 1,
      isSetp1: true,
      isSetp2: false,
    };
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state.image);
    }
  }

  setEditorRef = (editor) => this.setState({ editor });

  onCrop = () => {
    const { editor } = this.state;
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      let imageSrc = { url: url, file: editor.getImageScaledToCanvas().toBlob };
      this.setState({ image: imageSrc });
    }
    this.props.handleClose();
  };

  handleChangePicture = () => {
    this.setState({
      isSetp1: true,
      isSetp2: false,
    });
  };

  onScaleChange = (scaleChangeEvent, newValue) => {
    const scaleValue = parseFloat(newValue);
    this.setState({ scaleValue });
  };

  DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  profilePicChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0];
    const { type } = file;
    if (
      !(
        type.endsWith("jpeg") ||
        type.endsWith("png") ||
        type.endsWith("jpg") ||
        type.endsWith("gif")
      )
    ) {
    } else {
      this.setState({
        openCropper: true,
        selectedImage: fileChangeEvent.target.files[0],
        fileUploadErrors: [],
        isSetp2: true,
        isSetp1: false,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.handleClose}
          ></DialogTitle>
          <DialogContent>
            {this.state.isSetp2 && (
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <ImageCrop
                    imageSrc={this.state.selectedImage}
                    setEditorRef={this.setEditorRef}
                    onCrop={this.onCrop}
                    scaleValue={this.state.scaleValue}
                    onScaleChange={this.onScaleChange}
                  />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <UTSlider
                    defaultValue={2}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                    onChange={this.onScaleChange}
                  />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" align="left" gutterBottom>
                    Zoom -
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" align="right" gutterBottom>
                    Zoom +
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={12}>
                  <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                      Sublime !
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Si cette photo vous convient, allez y!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box p={2}></Box>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    component="span"
                    disableElevation={true}
                    onClick={this.handleChangePicture}
                  >
                    Changer de photo
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DoneIcon />}
                    component="span"
                    disableElevation={true}
                    onClick={this.onCrop}
                  >
                    Valider
                  </Button>
                </Grid>
              </Grid>
            )}
            {this.state.isSetp1 && (
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                    className={classes.large}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box p={4}>
                    <Typography variant="h6" gutterBottom>
                      Photo de profil
                    </Typography>
                  </Box>
                  <Typography gutterBottom>
                    Nous sommes ravis de vous rencontrer pour de vrai !
                  </Typography>
                  <input
                    accept="image/png, image/jpeg"
                    onChange={this.profilePicChange}
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                  />
                  <label htmlFor="icon-button-file">
                    <Box p={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        component="span"
                        disableElevation={true}
                      >
                        Ajouter une photo
                      </Button>
                    </Box>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" gutterBottom>
                    Votre photo ne doit pas être contraire aux bonnes mœurs ou à
                    l'ordre public, ni porter atteinte aux droits de tiers.
                  </Typography>
                  <Box p={4}>
                    <Typography variant="caption" gutterBottom>
                      Nous acceptons les formats : jpg, jpeg, png • Poids max :
                      8 Mo
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(AvatarChooser);
