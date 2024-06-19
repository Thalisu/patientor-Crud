import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import axios from "axios";

const getAll = async () => {
  const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

export default { getAll };
