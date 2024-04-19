import { fillTableDataFerrolCoruna } from "./main.js";
import {
  ListOfStopsFerrolCoruna,
  FerrolCorunaSundayData,
} from "./db/busesRoute.js";

fillTableDataFerrolCoruna(ListOfStopsFerrolCoruna, FerrolCorunaSundayData);
