import mongoose from "mongoose";

const DEFAULT_FLIGHT_NUMBER = 100;

export interface Launch {
  flightNumber: number;
  launchDate: Date;
  mission: string;
  rocket: string;
  target?: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

// Launch config
const LaunchSchema = new mongoose.Schema({
  flightNumber: { type: Number, require: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String },
  customers: { type: [String] },
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true, default: true },
});

export const LaunchModel = mongoose.model<Launch>("Launch", LaunchSchema);

// Actions
export const getAllLaunches = (skip: number, limit: number) => {
  return LaunchModel.find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

export const findLaunch = (filter: Partial<Launch>) => {
  return LaunchModel.findOne(filter);
};

export const getLaunchByFlightNumber = (flightNumber: number) => {
  return findLaunch({ flightNumber });
};

export const getLatestFlightNumber = async () => {
  const latestLaunch = await LaunchModel.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
};

export const saveLaunch = (launch: Launch) => {
  return LaunchModel.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
};
