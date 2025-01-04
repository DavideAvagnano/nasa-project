import { Launch } from "../models/launch-model";

export const launches = new Map<any, Launch>();

let latestFlightNumber = 100;

const initialLaunch: Launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// map in which launch details are associated with each flight number
launches.set(initialLaunch.flightNumber, initialLaunch);

export const getAllLaunches = (): Launch[] => {
  return Array.from(launches.values());
};

export const addNewLaunch = (launch: Launch) => {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
};
