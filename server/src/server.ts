import http from "http";
import dotenv from "dotenv";

import { app } from "./app";
import { mongoConnect } from "./services/mongo";
import { loadPlanetsData } from "./services/planets";

dotenv.config();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
  try {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Error while starting server:", err);
  }
};

startServer();
