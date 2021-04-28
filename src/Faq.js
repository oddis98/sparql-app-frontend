import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

function Faq() {
  return (
    <div class="GameSearch">
      <div class="Background">
        <h1>How does this work?</h1>
        <div class="faq">
          <p>
            By typing in any criteria after selecting a category (
            <em>titles, developer, release date</em>), you can quickly search
            for a game that fits all of your criterias.
          </p>
        </div>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            style={{ margin: "0 auto" }}
            variant="contained"
            color="secondary"
            href="/"
          >
            Back to Search
          </Button>
        </CardActions>
      </div>
    </div>
  );
}

export default Faq;
