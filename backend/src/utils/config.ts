import "dotenv/config";
import { isString } from "./typeguards";

const PORT = process.env.PORT;
const getUri = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (isString(MONGODB_URI)) {
    return MONGODB_URI;
  } else throw new Error("MongoDB Uri is missing");
};
const MONGODB_URI = getUri();

export default { PORT, MONGODB_URI };
