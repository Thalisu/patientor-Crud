import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const deleteOne = async (id: string) => {
  const { data } = await axios.delete(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const update = async (object: PatientFormValues, id: string) => {
  const { data } = await axios.put(`${apiBaseUrl}/patients/${id}`, object);

  return data;
};

export default {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
