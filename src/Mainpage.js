import "./Mainpage.css";
import React from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

export default function GameSearch() {
  return (
    <div class="GameSearch">
      <div class="Background">
        <h1>Welcome to Gamesearch!</h1>
        <p>Please search for a game!</p>
        <a href="faq">How does this work?</a>
        <input
          type="text"
          class="SearchBar"
          placeholder="Please enter something ..."
        />
        <CardActions>
          <Button
            style={{ margin: "0 auto" }}
            variant="contained"
            color="secondary"
            href="/"
          >
            Add category
          </Button>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            style={{ margin: "0 auto" }}
            variant="contained"
            color="secondary"
            href="/"
          >
            Search
          </Button>
        </CardActions>
      </div>
    </div>
  );
}
