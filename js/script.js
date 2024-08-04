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
const stopsLaborDayFerrolCorunaUrl = `${baseUrl}/stops-ferrol-to-coruna.JSON`;
const stopsLaborDayCorunaFerrolUrl = `${baseUrl}/stops-coruna-to-ferrol.JSON`;

//Routes Url
const routesLaborDayFerrolCorunaUrl = `${baseUrl}/bus-laborDay-ferrol-to-coruna.JSON`;
const routesLaborDayCorunaFerrolUrl = `${baseUrl}/bus-laborDay-coruna-to-ferrol.json`;

//------------------
// Helper Functions
//------------------

async function loadData(stopsUrl, routesUrl) {
  try {
    // Fetch the stops data
    const stopsResponse = await fetch(stopsUrl);
    if (!stopsResponse.ok) {
      throw new Error("Failed to load stops data");
    }
    const stopList = await stopsResponse.json();

    // Fetch the route data
    const routesResponse = await fetch(routesUrl);
    if (!routesResponse.ok) {
      throw new Error("Failed to load route data");
    }
    const routeList = await routesResponse.json();

    // Return the fetched data
    return { stopList, routeList };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return empty arrays in case of an error
    return { stopList: [], routeList: [] };
  }
}

async function fillTableData(stopsUrl, routesUrl, tableId) {
  // load Data
  const { stopList, routeList } = await loadData(stopsUrl, routesUrl);
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
  console.log(tableBodyContainer);
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

function getButtonByTarget(target) {
  return document.querySelector(`button[data-bs-target="${target}"]`);
}
function printButtonTarget(btn) {
  console.log(`${btn.getAttribute("data-bs-target")}`);
}

// On Load
window.addEventListener("load", () => {
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
  loader.hidden = false;
  fillTableData(
    stopsLaborDayFerrolCorunaUrl,
    routesLaborDayFerrolCorunaUrl,
    "#tbl-labor-day-ferrol-coruna"
  );
  fillTableData(
    stopsLaborDayCorunaFerrolUrl,
    routesLaborDayCorunaFerrolUrl,
    "#tbl-labor-day-coruna-ferrol"
  );

  loader.hidden = true;
});
