import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

export default function CategoryMenu() {
  const history = useHistory();

  return (
    <React.Fragment>
      <section className="page-404">
        <div className="container">
          <div className="img-404">
            <h1 className="text-center">404</h1>
          </div>
          <div className="explanation-404">
            <h3 className="">On dirait que vous êtes perdu</h3>
            <p>
              La page à laquelle vous essayez d'accéder n'est pas disponible...
            </p>
            <Button
              variant="contained"
              color="secondary"
              onClick={history.goBack}
              disableElevation={true}
            >
              Retour à la page précédente
            </Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
