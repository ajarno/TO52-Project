import React from "react";
import { Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import picture from "../../assets/authentication.svg";

export default function Unauthorized(props) {
  return (
    <Container component="main" maxWidth="xs">
      <section className="page-403">
        <div className="container">
          <div className="explanation-403">
            <h3>Veuillez d'abord vous connecter</h3>
            <p>
              La fonctionnalité à laquelle vous tentez d'accéder nécessite que
              vous soyez authentifié. Cliquez-sur le bouton ci-dessous pour vous
              connecter.
            </p>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/auth/sign-in"
              disableElevation={true}
            >
              Me connecter
            </Button>
            <img src={picture} alt="Need authentication" style={{ marginTop: "1rem", width: "20rem", maxWidth: "100%" }}/>
          </div>
        </div>
      </section>
    </Container>
  );
}
