// import { Prisma } from "@prisma/client";

import { Prisma } from "@prisma/client";

// Prisma.ImageSelect
export const IMAGE_SELECT = {
  base: true,
};

// Artist
// Prisma.ArtistSelect
export const ARTIST_SELECT = {
  name: true,
  id: true,
  image: {
    select: IMAGE_SELECT,
  },
};

// Prisma.GroupArtistSelect
export const GROUP_ARTIST_SELECT = {
  artist: {
    select: ARTIST_SELECT,
  },
};

// Prisma.GroupSelect
export const GROUP_SELECT = {
  id: true,
  name: true,
  members: {
    select: GROUP_ARTIST_SELECT,
  },
  bannerImage: {
    select: IMAGE_SELECT,
  },
  logoImage: {
    select: IMAGE_SELECT,
  },
};

// Company
// Prisma.CompanySelect
export const COMPANY_SELECT = {
  id: true,
  name: true,
  image: {
    select: IMAGE_SELECT,
  },
  groups: {
    select: GROUP_SELECT,
  },
};

// Prisma.CardSetArtistSelect
export const CARD_SELECT_ARTIST_SELECT = {
  artist: {
    select: ARTIST_SELECT,
  },
};

// Prisma.CardSetSelect
export const CARD_SET_SELECT = {
  id: true,
  created: true,
  artists: {
    select: CARD_SELECT_ARTIST_SELECT,
  },
  image: {
    select: IMAGE_SELECT,
  },
  rarity: true, // Every field in the rarity object is used
  collectionId: true,
};

// Prisma.CollectionSelect
export const COLLECTION_SELECT = {
  id: true,
  title: true,
  sets: {
    select: CARD_SET_SELECT,
  },
};

// Prisma.EraSelect
export const ERA_SELECT = {
  id: true,
  title: true,
  image: {
    select: IMAGE_SELECT,
  },
  group: {
    select: GROUP_SELECT,
  },

  collections: {
    select: COLLECTION_SELECT,
  },
};
