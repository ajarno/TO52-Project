import React from "react";
import { Container, Button } from "@material-ui/core";
import picture from "../../assets/under_construction.svg";

export default function UnderConstruction(props) {
  return (
    <Container component="main" maxWidth="sm">
      <section className="page">
        <div className="container">
          <div className="explanation">
            <h3>Fonctionnalité en cours de développement</h3>
            <p>
              La fonctionnalité à laquelle vous tentez d'accéder n'est pas encore disponible. Nous travaillons dessus pour la rendre disponible au plus vite !
            </p>
            <p>
              Revenez bientôt !
            </p>
            <img src={picture} alt="Under construction" style={{ width: "20rem", maxWidth: "100%" }}/>
          </div>
        </div>
      </section>
    </Container>
  );
}
