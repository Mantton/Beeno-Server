import { Rarity } from "@prisma/client";

export interface IEra {
  id: number;
  title: string;
  startDate: Date | null;
  group: GroupExcerpt | null;
  artist: ArtistExcerpt | null;

  imageUrl: string;
  sets: SetExcerpt[];
  cards: CardExcerpt[];
}

interface SetExcerpt {
  id: number;
  title: string;
}
export interface ArtistExcerpt {
  id: number;
  name: string;
  imageUrl: string;
}

export interface GroupExcerpt {
  id: number;
  name: string;
  logoImageUrl: string;
  bannerImageUrl: string | null;
  members: ArtistExcerpt[];
}

export interface CardExcerpt {
  id: number;
  imageUrl: string;
  artists: ArtistExcerpt[];
  rarity: Rarity;
  favorites: number;
  created: Date;
  items: {
    total: number;
    onTradeHub: number;
    inTreasury: number;
    owned: number;
  };
}
