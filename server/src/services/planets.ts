import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import {
  createPlanet,
  getPlanetByName,
  getAllPlanetsNames,
} from "../models/planet";

const isHabitablePlanet = (planet: Record<string, any>): boolean => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

export const loadPlanetsData = () => {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data: Record<string, any>) => {
        if (isHabitablePlanet(data)) {
          try {
            const existingPlanet = await getPlanetByName(data.kepler_name);

            if (!existingPlanet) {
              await createPlanet({ keplerName: data.kepler_name });
            }
          } catch (error) {
            console.error("Error saving planet:", data.kepler_name, error);
          }
        }
      })
      .on("error", (err: Error) => {
        console.error("Error reading CSV file:", err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanetsNames()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
};
