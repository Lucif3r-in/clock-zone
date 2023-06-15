import React, { useState } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-autocomplete";
import moment from "moment-timezone";

import { addTimezone } from "../timezone/index";
import "./search_bar.css";

const SearchBar = ({ timezones, addTimezone }) => {
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();

    const found = moment.tz.names().includes(name);
    if (!found) {
      setAlertMessage("Time zone doesn't exist");
      return;
    }

    const isInList = timezones.includes(name);
    if (isInList) {
      setAlertMessage("Time zone is already in the list");
      return;
    }

    if (found && !isInList) {
      addTimezone(name);
      setName("");
      setAlertMessage("");
    }
  };

  const alertClass = alertMessage
    ? "search-alert opacity-1"
    : "search-alert opacity-0";

  return (
    <div className="SearchBar clearfix">
      <form className="input-group search-form" onSubmit={onFormSubmit}>
        <Autocomplete
          getItemValue={(item) => item}
          items={moment.tz.names()}
          shouldItemRender={(item, value) =>
            item.toLowerCase().includes(value.toLowerCase())
          }
          renderItem={(item, isHighlighted) => (
            <div
              key={item}
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item}
            </div>
          )}
          value={name}
          onChange={(event) => setName(event.target.value)}
          onSelect={(value) => setName(value)}
          inputProps={{
            className: "form-control",
            placeholder: "Time zone",
          }}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <div className={alertClass}>{alertMessage}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    timezones: state.timezones,
  };
};

export default connect(mapStateToProps, { addTimezone })(SearchBar);
