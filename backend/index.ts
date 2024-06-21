import app from "./src/app";
import config from "./src/utils/config";
import logger from "./src/utils/logger";

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port http://localhost:${config.PORT}`);
});
