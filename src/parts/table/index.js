import React from "react";
import "./index.css";
import number from "numeral";

function index({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{number(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default index;
