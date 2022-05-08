import { fetchEraRecord } from "../database/era";
import { IEra } from "../types/serialized/era";

export const getEra = async (id: number): Promise<IEra | null> => {
  return fetchEraRecord(id);
};
