import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Modal, ButtonBase, Card } from "@material-ui/core";
import noPicture from "../../assets/no-picture.png";

const useStyles = makeStyles({
  carouselContainer: {
    maxWidth: "100%",
  },
  media: {
    width: "100%",
    height: "40vh",
    minWidth: "320px",
    minHeight: "240px",
  },
  imageSrc: {
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  paper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "zoom-out",
    outline: 0,
  },
  modalImg: {
    maxHeight: "90vh",
    maxWidth: "90vw",
  },
});

export default function PictureSlider(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openedPicture, setOpenedPicture] = React.useState();

  const handleOpen = (picture) => {
    setOpen(true);
    setOpenedPicture(picture);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {props.pictures && (
        <Card className={classes.carouselContainer}>
          {props.pictures.length > 1 ? (
            <Carousel
              className={classes.media}
              autoPlay={false}
              timeout={200}
              navButtonsAlwaysVisible
            >
              {props.pictures.map((picture) => (
                <ButtonBase
                  key={picture}
                  onClick={() => handleOpen(picture)}
                  className={classes.media}
                >
                  <span
                    style={{
                      backgroundImage: `url(${picture})`,
                      cursor: "zoom-in",
                    }}
                    className={classes.imageSrc}
                  />
                </ButtonBase>
              ))}
            </Carousel>
          ) : (
            <div className={classes.media}>
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${
                    props.pictures.length === 0 ? noPicture : props.pictures[0]
                  })`,
                }}
              ></div>
            </div>
          )}
          <Modal open={open} className={classes.modal} onClose={handleClose}>
            <div className={classes.paper} onClick={handleClose}>
              <img
                src={openedPicture}
                className={classes.modalImg}
                alt={`Annonce`}
              />
            </div>
          </Modal>
        </Card>
      )}
    </React.Fragment>
  );
}
