import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./parts/boxs/index";
import Map from "./parts/map/Maps";
import Table from "./parts/table/index";
import Chart from "./LineGraph";
import "leaflet/dist/leaflet.css";
import number from "numeral";

// get data from util.js with object, lempar data {}
import { sortData, numberFormat } from "./util";
import "./App.css";

function App() {
  // https://disease.sh/v3/covid-19/countries
  // get API all = json
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [casesType, setCasesType] = useState("cases");

  // get API id = object
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // leaflet
  const [mapCenter, setMapCenter] = useState({ lat: 34.80726, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  const monthNames = new Array([]);
  monthNames[1] = "January";
  monthNames[2] = "February";
  monthNames[3] = "March";
  monthNames[4] = "April";
  monthNames[5] = "May";
  monthNames[6] = "June";
  monthNames[7] = "July";
  monthNames[8] = "August";
  monthNames[9] = "September";
  monthNames[10] = "October";
  monthNames[11] = "November";
  monthNames[12] = "December";
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const time = dateObj.getHours() + ":" + dateObj.getMinutes();
  const newdate = day + " " + monthNames[month] + " " + year;
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            cases: country.cases,
            value: country.countryInfo.iso2,
          }));
          const orderByData = sortData(data);
          setMapCountries(data);
          setTableData(orderByData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  // get per id option

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    // selec box kondisi
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // get all data from country (id/vlue)
        setCountryInfo(data);
        // set map per ID
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  console.log("GET ID Country", countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div style={{ paddingRight: 10 }}>
            <h1>COVID-19 Tracker</h1>
            <p style={{ marginTop: 10 }}>
              Update Now : {newdate} {time}
            </p>
          </div>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => {
              setCasesType("cases");
            }}
            title="Coronavirus Cases"
            cases={numberFormat(countryInfo.todayCases)}
            total={number(countryInfo.cases).format("0,0")}
          />
          <InfoBox
            isGreen
            active={casesType === "recovered"}
            onClick={(e) => {
              setCasesType("recovered");
            }}
            title="Recovered"
            cases={numberFormat(countryInfo.todayRecovered)}
            total={number(countryInfo.recovered).format("0,0")}
          />
          <InfoBox
            isYellow
            active={casesType === "deaths"}
            onClick={(e) => {
              setCasesType("deaths");
            }}
            title="Deaths"
            cases={numberFormat(countryInfo.todayDeaths)}
            total={number(countryInfo.deaths).format("0,0")}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="cart__name">World new {casesType}</h3>
          <Chart className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
