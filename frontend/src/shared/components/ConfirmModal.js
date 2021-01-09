import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)",
    outline: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 4,
  },
  actions: {
    float: "right",
    marginTop: "1.5em",
  },
}));

export default function ConfirmModal(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal
        open={props.open}
        className={classes.modal}
        onClose={props.handleClose}
      >
        <div className={classes.paper} onClick={props.handleClose}>
          <div className={classes.text}>
            {props.title && (
              <Typography
                variant="h5"
                style={{ fontWeight: "500" }}
                gutterBottom
              >
                {props.title}
              </Typography>
            )}
            {props.subtitle && (
              <Typography variant="h6" color="secondary" gutterBottom>
                {props.subtitle}
              </Typography>
            )}
            {props.warning && (
              <Typography variant="caption" color="textSecondary" gutterBottom>
                {props.warning}
              </Typography>
            )}
          </div>
          <div className={classes.actions}>
            <Button color="primary" variant="outlined" style={{ marginRight: "1em" }} onClick={props.onCancel}>
              Annuler
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={props.onConfirm}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
