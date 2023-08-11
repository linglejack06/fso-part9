import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import axios from "axios";

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data;
}

export default {
  getAllDiagnoses,
}