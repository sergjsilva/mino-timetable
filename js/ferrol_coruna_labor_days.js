import { fillTableData } from "./main.js";
import {
  ListOfStopsFerrolCoruna,
  FerrolCorunaLaborDaysData,
} from "../db/busesRoute.js";

fillTableData(ListOfStopsFerrolCoruna, FerrolCorunaLaborDaysData);
