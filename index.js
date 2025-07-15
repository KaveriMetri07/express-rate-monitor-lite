import "dotenv/config";
import http from "http";
import app from "./examples/app.js";
import { connectTODB } from "./src/db/connect.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
connectTODB().then(() => {
  server.listen(PORT, () => {
    console.log(`server is runnin on port ${PORT}`);
  });
});
