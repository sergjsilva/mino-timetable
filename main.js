const routeList = document.querySelector(".route-list");
const tblBody = document.querySelector(".cities-data");

export function fillTableDataFerrolCoruna(ArrayOfCities, ArrayOfRoutes) {
  for (let data of ArrayOfRoutes) {
    let route = data.route;
    let tblHeader = document.createElement("th");
    tblHeader.setAttribute("scope", "col");
    tblHeader.innerText = route;
    routeList.appendChild(tblHeader);
  }

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
      tblData.style.textAlign = "center";
      tblData.innerText = timeScheduled;
      rowData.appendChild(tblData);
    }
    tblBody.appendChild(rowData);
  }
}
