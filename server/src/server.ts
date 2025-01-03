import http from "http";
import dotenv from "dotenv";

import { app } from "./app";
import { loadPlanetsData } from "./services/planets-service";

dotenv.config();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
};

startServer();
