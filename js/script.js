// Lunes - Viernes
const laborFerrolCoruna = "#labor-day-ferrol-coruna";
const laborCorunaFerrol = "#labor-day-coruna-ferrol";
const btnLaborFerrolCoruna = getButtonByTarget(laborFerrolCoruna);
const btnLaborCorunaFerrol = getButtonByTarget(laborCorunaFerrol);

// Sabado
const saturdayFerrolCoruna = "#saturday-ferrol-coruna";
const saturdayCorunaFerrol = "#saturday-coruna-ferrol";
const btnSaturdayFerrolCoruna = getButtonByTarget(saturdayFerrolCoruna);
const btnSaturdayCorunaFerrol = getButtonByTarget(saturdayCorunaFerrol);

const sundayFerrolCoruna = "#sunday-ferrol-coruna";
const sundayCorunaFerrol = "#sunday-coruna-ferrol";
const btnSundayFerrolCoruna = getButtonByTarget(sundayFerrolCoruna);
const btnSundayCorunaFerrol = getButtonByTarget(sundayCorunaFerrol);

printButtonTarget(btnLaborFerrolCoruna);
printButtonTarget(btnLaborCorunaFerrol);
printButtonTarget(btnSaturdayFerrolCoruna);
printButtonTarget(btnSaturdayCorunaFerrol);
printButtonTarget(btnSundayFerrolCoruna);
printButtonTarget(btnSundayCorunaFerrol);
//------------------
// Helper Functions
//------------------
function getButtonByTarget(target) {
  return document.querySelector(`button[data-bs-target="${target}"]`);
}
function printButtonTarget(btn) {
  console.log(`${btn.getAttribute("data-bs-target")}`);
}
