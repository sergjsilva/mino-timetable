import { fillTableDataFerrolCoruna } from "./main.js";
import {
  ListOfStopsFerrolCoruna,
  FerrolCorunaLaborDaysData,
} from "./db/busesRoute.js";

fillTableDataFerrolCoruna(ListOfStopsFerrolCoruna, FerrolCorunaLaborDaysData);
