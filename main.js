import {
  ListOfStopsFerrolCoruna,
  FerrolCorunaLaborDaysData,
  FerrolCorunaSaturdayData,
} from "./db/busesRoute.js";

import { DaysOfWeek } from "./utility.js";

const routeList = document.querySelectorAll(".route-list");
const tblBody = document.querySelectorAll(".cities-data");

function fillTableDataFerrolCoruna(ArrayOfCities, ArrayOfRoutes, dayIndex) {
  for (let data of ArrayOfRoutes) {
    let route = data.route;
    let tblHeader = document.createElement("th");
    tblHeader.setAttribute("scope", "col");
    tblHeader.innerText = route;
    routeList[dayIndex].appendChild(tblHeader);
  }

  // Monday to Friday
  for (let i = 0; i < ArrayOfCities.length; i++) {
    let rowData = document.createElement("tr");

    let city = ArrayOfCities[i];

    let tdCity = document.createElement("td");
    //tblHeader.setAttribute("scope", "row");
    tdCity.innerText = city;
    tdCity.style.fontWeight = "bold";
    rowData.appendChild(tdCity); //cityName

    for (let data of ArrayOfRoutes) {
      let timeScheduled = data.stops[i];
      let tblData = document.createElement("td");
      tblData.innerText = timeScheduled;
      rowData.appendChild(tblData);
    }
    tblBody[dayIndex].appendChild(rowData);
  }
}

fillTableDataFerrolCoruna(
  ListOfStopsFerrolCoruna,
  FerrolCorunaLaborDaysData,
  DaysOfWeek.MONDAY_TO_FRIDAY
);
fillTableDataFerrolCoruna(
  ListOfStopsFerrolCoruna,
  FerrolCorunaSaturdayData,
  DaysOfWeek.SATURDAY
);
