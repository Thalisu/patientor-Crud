import app from "./src/app";
import { info } from "./src/utils/logger";

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  info(`Server running on port http://localhost:${PORT}`);
});
