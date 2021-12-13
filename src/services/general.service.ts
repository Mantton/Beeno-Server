import { Group, Company, Era } from "@prisma/client";
import database from "../helpers/prisma";

export const createCompany = async (name: string): Promise<Company> => {
  const company = await database.company.create({ data: { name } });
  return company;
};

export const createGroup = async (
  name: string,
  companyId: number
): Promise<Group> => {
  return await database.group.create({ data: { name, companyId } });
};

export const createEra = async (
  title: string,
  groupId: string,
  startDate: Date | null = null
): Promise<Era> => {
  return await database.era.create({ data: { title, groupId, startDate } });
};
