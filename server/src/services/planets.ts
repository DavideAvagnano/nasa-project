import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

export const habitablePlanet: Record<string, any>[] = [];

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
      .on("data", (data: Record<string, any>) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on("error", (err: Error) => {
        console.error(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanet.length} habitable planets found`);
        resolve();
      });
  });
};

export const getAllPlanets = () => {
  return habitablePlanet;
};
