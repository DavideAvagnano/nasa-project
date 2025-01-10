import { Launch, LaunchModel } from "../models/launch";

// Loading initial data
const loadLaunchesData = () => {
  /*
    controlla se i dati dei lanci sono gia stati caricati cercando il primo lancio nel database, se esiste termina il caricamento, altrimenti richiama la funzione populateLaunches() per scaricare e salvere i dati da SpaceX
  */
};

// Download and save data
const populateLaunches = () => {
  /*
    Effettua richiesta POST all'API SpaceX per ottenere tutti i lanci, elabora i dati per estrarre info necessarie (missione, razzo, ecc), chiama la funzinoe per salvare ogni lancio nel database
  */
};

// Handling launches
const scheduleNewLaunch = () => {};
const abortLaunchById = () => {};

/*
CARICAMENTO INIZIALE
loadLaunchData() → chiama → findLaunch() per controllare i dati → altrimenti → populateLaunches() → usa → saveLaunch().

AGGIUNTA DI UN NUOVO LANCIO
scheduleNewLaunch() → chiama → getPlanetByName() per validare il target → usa → getLatestFlightNumber() per generare un numero di volo → chiama → saveLaunch() per salvare il nuovo lancio.

ANULLAMENTO DI UN LANCIO
abortLaunchById() → aggiorna il database con lo stato annullato.
*/

const saveLaunch = async (launch: Launch) => {
  await LaunchModel.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

// --------------------------
// ---------- HOLD ----------
// --------------------------
import { Launch1 } from "../models/launch";

export const launchesMap = new Map<number | undefined, Launch1>();

let latestFlightNumber = 100;

const initialLaunch: Launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launchesMap.set(initialLaunch.flightNumber, initialLaunch);
saveLaunch(initialLaunch);

// export const getAllLaunches = (): Launch1[] => {
//   return Array.from(launchesMap.values());
// };
export const getAllLaunches = async () => {
  return await LaunchModel.find({}, { _id: 0, __v: 0 });
};

export const addNewLaunch = (launch: Launch1) => {
  latestFlightNumber++;
  launchesMap.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
};

export const existsLaunchWithId = (launchId: number) => {
  return launchesMap.has(launchId);
};

export const abortLaunchById1 = (launchId: number) => {
  const aborted = launchesMap.get(launchId);
  if (aborted?.upcoming) {
    aborted.upcoming = false;
  }
  if (aborted?.success) {
    aborted.success = false;
  }
  return aborted;
};
