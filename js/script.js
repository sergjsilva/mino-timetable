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

// -------------------
// Listener Functions
// -------------------

btnLaborFerrolCoruna.addEventListener("click", () => {});

//------------------
// Helper Functions
//------------------
function getButtonByTarget(target) {
  return document.querySelector(`button[data-bs-target="${target}"]`);
}
function printButtonTarget(btn) {
  console.log(`${btn.getAttribute("data-bs-target")}`);
}
