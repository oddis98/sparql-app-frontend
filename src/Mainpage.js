import "./Mainpage.css";
import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

export default function GameSearch() {
  const [info, setInfo] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState("game");

  const search = () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchText: searchText.target.value,
          category: active,
        }),
      };
      fetch("http://localhost:5000/sparql/select", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            return setInfo(["Something went wrong"]);
          }

          const new_data = data.result.map((row) => {
            const key = Object.keys(row)
              .toString()
              .replace("http://example.org/", "")
              .replace("http://dbpedia.org/resource/", "")
              .replaceAll("_", " ");
            const value = Object.values(row);

            if (value == "None") {
              return "";
            }
            return (
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            );
          });

          setInfo(new_data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setActive(event.target.value);
  };

  return (
    <div className="main">
      <div className="background">
        <h1>Welcome to Gamesearch!</h1>
        <p>Please search for a game!</p>
        <a className="link" href="faq">
          How does this work?
        </a>
        <input
          type="text"
          placeholder="Please enter something ..."
          onChange={setSearchText}
        />
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="category"
            name="cat1"
            value={active}
            onChange={handleChange}
          >
            <FormControlLabel value="game" control={<Radio />} label="Game" />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>
        </FormControl>

        <button className={"search"} onClick={search}>
          Search
        </button>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th style={{ width: "50em" }}>Subject</th>
              <th style={{ width: "50em" }}>Object</th>
            </tr>
          </thead>
          <tbody>{info}</tbody>
        </table>
      </div>
    </div>
  );
}
