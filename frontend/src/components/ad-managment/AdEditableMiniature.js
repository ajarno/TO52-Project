import React from "react";
import { deleteAd } from "../../api/AdsAPI";
import { makeStyles } from "@material-ui/core/styles";
import noPicture from "../../assets/no-picture.png";
import {
  Typography,
  Grid,
  Paper,
  IconButton,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import truncate from "../../shared/functions/TruncatePipe";
import ConfirmModal from "../../shared/components/ConfirmModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: "hidden",
    margin: "auto",
    maxWidth: "60vw",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(2) + `px !important`,
    minHeight: 125,
    margin: "auto",
    "& .MuiButton-root": {
      textTransform: "none",
    },
  },
  image: {
    width: 160,
    height: "100%",
    position: "relative",
  },
  img: {
    backgroundColor: theme.palette.grey[100],
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  picnumber: {
    display: "flex",
    position: "absolute",
    bottom: "3px",
    right: "10px",
  },
  icon: {
    marginRight: 5,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  secondary: {
    color: theme.palette.danger.dark,
  },
}));

export default function AdEditableMiniature(props) {
  const classes = useStyles();

  const ad = props.ad;
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // -------------------- MENU --------------------
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // -------------------- MODAL -------------------
  const [openModal, setOpenModal] = React.useState(false);

  const handleModalOpen = (event) => {
    setOpenModal(true);
  };

  const handleModalClose = (event) => {
    setOpenModal(false);
  };

  const handleModalConfirm = (event) => {
    setOpenModal(false);
    deleteAd(ad.id)
      .then(() => window.location.reload())
      .catch((err) => {
        return;
      });
  };

  return (
    <React.Fragment>
      <Paper variant="outlined" className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              {ad.total_pictures > 0 ? (
                <div
                  className={classes.img}
                  style={{ backgroundImage: `url(${ad.first_picture.pic})` }}
                  alt={"Image de l'annonce " + ad.headline}
                ></div>
              ) : (
                <div
                  className={classes.img}
                  style={{ backgroundImage: noPicture }}
                  alt={"Indisponible"}
                ></div>
              )}
              <Typography className={classes.picnumber} gutterBottom>
                <PhotoCameraIcon className={classes.icon} /> {ad.total_pictures}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm container className={classes.container}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {truncate(ad.headline, 50)}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {`publiée ${new Intl.DateTimeFormat(
                    "fr-FR",
                    dateOptions
                  ).format(new Date(ad.published))}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 5 }}
              >
                {ad.price}€
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                style={{ padding: 2 }}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <MoreVertIcon />
              </IconButton>
              <Popper
                style={{ zIndex: 100 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                          <MenuItem component={Link} to={`/ads/${ad.id}`}>
                            <EyeIcon className={classes.menuItemIcon} />
                            Consulter
                          </MenuItem>
                          <MenuItem component={Link} to={`/ads/edit/${ad.id}`}>
                            <EditIcon className={classes.menuItemIcon} />
                            Editer
                          </MenuItem>
                          <MenuItem
                            onClick={handleModalOpen}
                            className={classes.secondary}
                          >
                            <DeleteIcon className={classes.menuItemIcon} />
                            Retirer
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <ConfirmModal
        open={openModal}
        handleClose={handleModalClose}
        onCancel={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Êtes-vous sûr de vouloir retirer cette annonce ?"
        warning="Attention, cette action est définitive."
      />
    </React.Fragment>
  );
}
