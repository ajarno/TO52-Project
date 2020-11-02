import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffectOnlyOnce } from "../../api/Utils";
import { fetchAdById } from "../../api/AdsAPI";
import BackBar from "../../shared/components/BackBar";
import Carousel from "react-material-ui-carousel";
import { Modal, ButtonBase, Card, Container } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    marginTop: "1.5vw",
    marginBottom: "1.5vw",
  },
  carouselContainer: {
    width: "fit-content",
  },
  media: {
    width: "50vw",
    height: "40vh",
    minWidth: "320px",
    minHeight: "300px",
  },
  imageSrc: {
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    cursor: "zoom-in",
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

const AdDisplayer = (props) => {
  const classes = useStyles();
  const [ad, setAd] = useState();

  const [open, setOpen] = React.useState(false);
  const [openedPicture, setOpenedPicture] = React.useState();

  const handleOpen = (picture) => {
    setOpen(true);
    setOpenedPicture(picture);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffectOnlyOnce(() => {
    fetchAdById(props.match.params.id)
      .then((result) => {
        let _ad = result.data;
        _ad.pictures = _ad.pictures.map((picture) => picture.pic);
        console.log(_ad);
        setAd(_ad);
      })
      .catch((err) => {
        console.error(err.message);
        window.location.href = "/not-found";
      });
  });

  return (
    <React.Fragment>
      <BackBar />
      <Container className={classes.container}>
        {ad && (
          <div>
            {ad && ad.pictures.length > 0 ? (
              <Card className={classes.carouselContainer}>
                <Carousel
                  className={classes.media}
                  autoPlay={false}
                  timeout={200}
                  navButtonsAlwaysVisible
                >
                  {ad.pictures.map((picture) => (
                    <ButtonBase
                      onClick={() => handleOpen(picture)}
                      key={picture}
                      className={classes.media}
                    >
                      <span
                        style={{
                          backgroundImage: `url(${picture})`,
                        }}
                        className={classes.imageSrc}
                      />
                    </ButtonBase>
                  ))}
                </Carousel>
                <Modal
                  open={open}
                  className={classes.modal}
                  onClose={handleClose}
                >
                  <div className={classes.paper} onClick={handleClose}>
                    <img
                      src={openedPicture}
                      className={classes.modalImg}
                      alt={`Annonce ${ad.headline}`}
                    />
                  </div>
                </Modal>
              </Card>
            ) : (
              <div></div>
            )}
            <h3>{ad.headline}</h3>
            <p>{ad.description}</p>
            <h4>{ad.price}€</h4>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default AdDisplayer;
