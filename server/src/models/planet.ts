import mongoose from "mongoose";

const PlanetSchema = new mongoose.Schema({
  keplerName: { type: String, required: true },
});

export const PlanetModel = mongoose.model("Planet", PlanetSchema);
