import mongoose from "mongoose";

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

export const LaunchModel = mongoose.model("Launch", LaunchSchema);
