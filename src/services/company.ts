import { getCompanyRecord, getCompanyRecords } from "../database";
import { imageUrl } from "../utils/image";

export function parseGroupArtist(entry: {
  artist: {
    id: number;
    name: string;
    image: {
      base: string;
    } | null;
  };
}) {
  return {
    id: entry.artist.id,
    imageUrl: imageUrl(entry.artist.image),
    name: entry.artist.name,
  };
}

export async function getCompanies(page: number, sort: number) {
  const companies = await getCompanyRecords(page, sort);

  return {
    lastPage: companies.lastPage,
    companies: companies.companies.map((c) => ({
      id: c.id,
      imageUrl: imageUrl(c.image),
      name: c.name,
    })),
  };
}
export async function getCompany(id: number) {
  const company = await getCompanyRecord(id);

  if (!company) return null;

  return {
    id: company.id,
    name: company.name,
    imageUrl: imageUrl(company.image),
    groups: company.groups.map((group) => ({
      id: group.id,
      name: group.name,
      bannerImageUrl: imageUrl(group.bannerImage),
      logoImageUrl: imageUrl(group.logoImage),
      members: group.members.map((entry) => parseGroupArtist(entry)),
    })),
  };
}
