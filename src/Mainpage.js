import "./Mainpage.css";
import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
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
          searchText:
            searchText === ""
              ? searchText
              : searchText.target.value.replace(" ", "_"),
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

            if (value.toString() === "None") {
              return "";
            }
            return value[0].length === 5 ? (
              <tr>
                <td>{key}</td>
                <td>
                  <ul>
                    <li>
                      Platform: {value[0][0].replace("http://example.org/", "")}
                    </li>
                    <li>{value[0][1]}</li>
                    <li>Released: {value[0][2]}</li>
                    <li>
                      Made by:{" "}
                      {value[0][3]
                        .replace("http://example.org/", "")
                        .replace("http://dbpedia.org/resource/", "")
                        .replace("_", " ")}
                    </li>
                    {value[0][4].includes("dbpedia") ? (
                      <li>Same as: {value[0][4]}</li>
                    ) : (
                      ""
                    )}
                  </ul>
                </td>
              </tr>
            ) : value[0].length === 2 ? (
              value[0][1].includes("dbpedia") ? (
                <tr>
                  <td>{key}</td>
                  <td>
                    <ul>
                      <li>{value[0][0]}</li>

                      <li>
                        Same as:
                        <span>
                          <a
                            href={value[0][1]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {" " + value[0][1]}
                          </a>
                        </span>
                      </li>
                    </ul>
                  </td>
                </tr>
              ) : (
                ""
              )
            ) : (
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
        <input
          type="text"
          placeholder="Search for something..."
          onChange={setSearchText}
        />
        <div>
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
              <FormControlLabel
                value="genre"
                control={<Radio />}
                label="Genre"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <button className={"search"} onClick={search}>
          Search
        </button>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th style={{ width: "50em" }}>Name</th>
              <th style={{ width: "50em" }}>Info</th>
            </tr>
          </thead>
          <tbody>{info}</tbody>
        </table>
      </div>
    </div>
  );
}
