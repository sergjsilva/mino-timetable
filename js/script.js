// Monday-Friday
// const laborFerrolCoruna = "#labor-day-ferrol-coruna";
// const laborCorunaFerrol = "#labor-day-coruna-ferrol";

// // Saturday
// const saturdayFerrolCoruna = "#saturday-ferrol-coruna";
// const saturdayCorunaFerrol = "#saturday-coruna-ferrol";

// // Sunday
// const sundayFerrolCoruna = "#sunday-ferrol-coruna";
// const sundayCorunaFerrol = "#sunday-coruna-ferrol";

// Buttons
// const btnLaborFerrolCoruna = getButtonByTarget(laborFerrolCoruna);
// const btnLaborCorunaFerrol = getButtonByTarget(laborCorunaFerrol);
// const btnSaturdayFerrolCoruna = getButtonByTarget(saturdayFerrolCoruna);
// const btnSaturdayCorunaFerrol = getButtonByTarget(saturdayCorunaFerrol);
// const btnSundayFerrolCoruna = getButtonByTarget(sundayFerrolCoruna);
// const btnSundayCorunaFerrol = getButtonByTarget(sundayCorunaFerrol);

const loader = document.querySelector("#loader");

const navTabs = document.querySelector(".nav-tabs");
const anchorList = navTabs.querySelectorAll(".nav-link");

const screenWidth = window.innerWidth;
const thresholdSize = 767;

// -------------
// Listener
// -------------
navTabs.addEventListener("animationend", () => {
  navTabs.classList.remove("fadeIn");
});

anchorList.forEach((anchorElement) => {
  anchorElement.addEventListener("click", (event) => {
    anchorList.forEach((anchor) => {
      if (screenWidth <= thresholdSize) {
        navTabs.classList.add("fadeIn");
        if (anchor.classList.contains("active")) {
          anchor.parentElement.style.order = 2;
        } else {
          anchor.parentElement.style.order = 1;
        }
      } else {
        anchor.parentElement.style.order = 1;
      }
    });
  });
});
// -------------------
// Listener Functions
// -------------------

const baseUrl = "https://sergjsilva.github.io/mino-timetable/JSON";

//Stops Url
const stopsFerrolCorunaUrl = `${baseUrl}/stops-ferrol-to-coruna.JSON`;
const stopsCorunaFerrolUrl = `${baseUrl}/stops-coruna-to-ferrol.JSON`;

//Routes Url
const routesLaborDayFerrolCorunaUrl = `${baseUrl}/bus-laborDay-ferrol-to-coruna.JSON`;
const routesLaborDayCorunaFerrolUrl = `${baseUrl}/bus-laborDay-coruna-to-ferrol.json`;

const routesSaturdayFerrolCorunaUrl = `${baseUrl}/bus-saturday-ferrol-to-coruna.json`;
const routesSaturdayCorunaFerrolUrl = `${baseUrl}/bus-saturday-coruna-to-ferrol.json`;

const routesSundayFerrolCorunaUrl = `${baseUrl}/bus-sunday-ferrol-to-coruna.json`;
const routesSundayCorunaFerrolUrl = `${baseUrl}/bus-sunday-coruna-to-ferrol.json`;

//------------------
// Helper Functions
//------------------

async function loadData(url) {
  try {
    // Fetch the stops data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to loading ${url}`);
    }
    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fillTableData(stopList, routesUrl, tableId) {
  // load Data
  const routeList = await loadData(routesUrl);
  const tableContainer = document.querySelector(tableId);

  if (!tableContainer) {
    console.error("Element not found:", tableId);
  }

  const routeListContainer = tableContainer.querySelector(".route-list");
  if (!routeListContainer) {
    console.error("Element not found:", tableId);
  }

  // Insert Table Headers
  for (let bus of routeList) {
    let tableHeader = document.createElement("th");
    tableHeader.setAttribute("scope", "col");
    tableHeader.innerText = bus.route;
    routeListContainer.appendChild(tableHeader);
  }

  const tableBodyContainer = tableContainer.querySelector(".cities-data");

  for (let i = 0; i < stopList.length; i++) {
    let rowData = document.createElement("tr");

    let city = stopList[i];

    if (city === "Miño") {
      rowData.classList.add("table-success");
    }

    let tdCity = document.createElement("td");
    //tblHeader.setAttribute("scope", "row");
    tdCity.innerText = city;
    tdCity.style.fontWeight = "bold";
    rowData.appendChild(tdCity); //cityName

    for (let bus of routeList) {
      let tableData = document.createElement("td");
      tableData.style.textAlign = "center";
      tableData.innerText = bus.stops[i]; // time schedule
      rowData.appendChild(tableData);
    }

    tableBodyContainer.appendChild(rowData);
  }
}

async function loadFerrolCorunaStops() {
  return await loadData(stopsFerrolCorunaUrl);
}

async function loadCorunaFerrolStops() {
  return await loadData(stopsCorunaFerrolUrl);
}

// On Load
window.addEventListener("load", async () => {
  const screenWidth = window.innerWidth;
  anchorList.forEach((anchor) => {
    if (screenWidth <= 767) {
      if (anchor.classList.contains("active")) {
        anchor.parentElement.style.order = 2;
      } else {
        anchor.parentElement.style.order = 1;
      }
    } else {
      anchor.parentElement.style.order = 1;
    }
  });

  if (loader) {
    loader.hidden = false;
  }

  const stopsFerrolCoruna = await loadFerrolCorunaStops();
  const stopsCorunaFerrol = await loadCorunaFerrolStops();

  // fillTableData(
  //   stopsFerrolCoruna,
  //   routesLaborDayFerrolCorunaUrl,
  //   "#tbl-labor-day-ferrol-coruna"
  // );
  // fillTableData(
  //   stopsCorunaFerrol,
  //   routesLaborDayCorunaFerrolUrl,
  //   "#tbl-labor-day-coruna-ferrol"
  // );
  // fillTableData(
  //   stopsFerrolCoruna,
  //   routesSaturdayFerrolCorunaUrl,
  //   "#tbl-saturday-ferrol-coruna"
  // );

  /* ----------------- */

  fillTableData(
    stopsCorunaFerrol,
    routesSaturdayCorunaFerrolUrl,
    "#tbl-saturday-coruna-ferrol"
  );

  /*------*/

  // fillTableData(
  //   stopsFerrolCoruna,
  //   routesSundayFerrolCorunaUrl,
  //   "#tbl-sunday-ferrol-coruna"
  // );

  // fillTableData(
  //   stopsCorunaFerrol,
  //   routesSundayCorunaFerrolUrl,
  //   "#tbl-sunday-coruna-ferrol"
  // );

  loader.hidden = true;
});
