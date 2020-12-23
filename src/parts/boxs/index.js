import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./index.css";

function index({
  title,
  cases,
  active,
  isRed,
  isYellow,
  isGreen,
  total,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isYellow && "infoBox--yellow"}`}
    >
      <CardContent>
        {/* title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* 203 Cases */}
        <h2
          className={`infoBox__cases ${isGreen && "infoBox__cases--green"} ${
            isYellow && "infoBox__cases--yellow"
          }`}
        >
          {cases}
        </h2>
        {/* total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default index;
