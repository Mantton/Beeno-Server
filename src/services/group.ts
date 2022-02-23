import { getGroupRecord } from "../database";
import { imageUrl } from "../utils/image";

export const parseBaseGroupArtist = (data: {
  artist: {
    id: number;
    name: string;
    image: {
      base: string;
    } | null;
  };
}) => {
  return {
    id: data.artist.id,
    name: data.artist.name,
    imageUrl: imageUrl(data.artist.image),
  };
};

export const parseBaseEra = (data: {
  id: number;
  title: string;
  image: {
    base: string;
  } | null;
}) => {
  return {
    id: data.id,
    title: data.title,
    imageUrl: imageUrl(data.image),
  };
};

export async function getGroup(id: number) {
  const group = await getGroupRecord(id);

  if (!group) return null;

  // Format Data

  return {
    id: group.id,
    imageUrl: imageUrl(group.image),
    name: group.name,

    company: {
      id: group.company.id,
      name: group.company.name,
      imageUrl: imageUrl(group.company.image),
    },
    members: group.members.map((v) => parseBaseGroupArtist(v)),
    eras: group.eras.map((v) => parseBaseEra(v)),
  };
}
