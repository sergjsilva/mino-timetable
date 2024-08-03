// Monday-Friday
const laborFerrolCoruna = "#labor-day-ferrol-coruna";
const laborCorunaFerrol = "#labor-day-coruna-ferrol";

// Saturday
const saturdayFerrolCoruna = "#saturday-ferrol-coruna";
const saturdayCorunaFerrol = "#saturday-coruna-ferrol";

// Sunday
const sundayFerrolCoruna = "#sunday-ferrol-coruna";
const sundayCorunaFerrol = "#sunday-coruna-ferrol";

// Buttons
const btnLaborFerrolCoruna = getButtonByTarget(laborFerrolCoruna);
const btnLaborCorunaFerrol = getButtonByTarget(laborCorunaFerrol);
const btnSaturdayFerrolCoruna = getButtonByTarget(saturdayFerrolCoruna);
const btnSaturdayCorunaFerrol = getButtonByTarget(saturdayCorunaFerrol);
const btnSundayFerrolCoruna = getButtonByTarget(sundayFerrolCoruna);
const btnSundayCorunaFerrol = getButtonByTarget(sundayCorunaFerrol);

const loader = document.querySelector("#loader");

// -------------------
// Listener Functions
// -------------------

const baseUrl = "https://sergjsilva.github.io/mino-timetable/JSON";
const stopsUrl = `${baseUrl}/stops-ferrol-to-coruna.JSON`;
const routesUrl = `${baseUrl}/bus-laborDay-ferrol-to-coruna.JSON`;

fillTableData(stopsUrl, routesUrl, "#tbl-labor-day-ferrol-coruna");

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
  const routeListContainer = tableContainer.querySelector(".route-list");

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

function getButtonByTarget(target) {
  return document.querySelector(`button[data-bs-target="${target}"]`);
}
function printButtonTarget(btn) {
  console.log(`${btn.getAttribute("data-bs-target")}`);
}
