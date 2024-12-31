import http from "http";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
