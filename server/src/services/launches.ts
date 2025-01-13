import axios from "axios";
import { getPlanetByName } from "../models/planet";
import { Launch, LaunchModel } from "../models/launch";

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
const DEFAULT_FLIGHT_NUMBER = 100;

interface Payload {
  id: string;
  customers: string[];
}

const saveLaunch = async (launch: Launch) => {
  await LaunchModel.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
};

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

saveLaunch(initialLaunch);

// Loading initial data
export const loadLaunchesData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launches data already loaded!");
  } else {
    await populateLaunches();
  }
};

// Download and save data
const populateLaunches = async () => {
  console.log("Downloading launches data...");

  const res = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: { name: 1 },
        },
        {
          path: "payloads",
          select: { customers: 1 },
        },
      ],
    },
  });

  if (res.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data download failed");
  }

  const launchDocs = res.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads: Payload[] = launchDoc["payloads"];
    const customers = payloads.flatMap((payloads) => payloads["customers"]);

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  }
};

// Handling launches
export const getAllLaunches = async () => {
  return await LaunchModel.find({}, { _id: 0, __v: 0 });
};

const findLaunch = async (filter: Partial<Launch>) => {
  return await LaunchModel.findOne(filter);
};

export const getLaunchByFlightNumber = async (flightNumber: number) => {
  return await findLaunch({ flightNumber });
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await LaunchModel.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
};

export const scheduleNewLaunch = async (launch: Launch) => {
  const planet = await getPlanetByName(launch.target!);

  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Davide", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

export const abortLaunchByFlightNumber = async (flightNumber: number) => {
  const aborted = await LaunchModel.updateOne(
    { flightNumber },
    { upcoming: false, success: false }
  );

  return aborted.acknowledged && aborted.modifiedCount > 0;
};
