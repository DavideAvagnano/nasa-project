import mongoose from "mongoose";

// Planet config
const PlanetSchema = new mongoose.Schema({
  keplerName: { type: String, required: true },
});

export const PlanetModel = mongoose.model("Planet", PlanetSchema);

// Actions to interact with db
export const getAllPlanets = () => {
  return PlanetModel.find();
};

export const getAllPlanetsNames = () => {
  return PlanetModel.find({}, { keplerName: 1, _id: 0 });
};

export const getPlanetByName = (name: string) => {
  return PlanetModel.findOne({ keplerName: name });
};

export const createPlanet = (planet: { keplerName: string }) => {
  return PlanetModel.create(planet);
};
