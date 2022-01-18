-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "handle" VARCHAR(18) NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privileges" (
    "privilege" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "imageId" INTEGER,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "imageId" INTEGER,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER,
    "companyId" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "imageId" INTEGER,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eras" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "startDate" TIMESTAMP(3),
    "groupId" INTEGER,
    "artistId" INTEGER,

    CONSTRAINT "eras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER,
    "iteration" INTEGER NOT NULL,
    "setId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardsets" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "minted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eraId" INTEGER NOT NULL,
    "rarityId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "cardsets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardset_artists" (
    "setId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "cardset_artists_pkey" PRIMARY KEY ("setId","artistId")
);

-- CreateTable
CREATE TABLE "rarity" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(18) NOT NULL,
    "points" INTEGER NOT NULL,
    "hex" VARCHAR(6) NOT NULL,

    CONSTRAINT "rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trade_offers" (
    "id" SERIAL NOT NULL,
    "initiatorId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "initationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "convocationTimestamp" TIMESTAMP(3) NOT NULL,
    "initialTradeId" INTEGER,
    "type" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "trade_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trade_pieces" (
    "cardId" INTEGER NOT NULL,
    "tradeOfferId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "trade_pieces_pkey" PRIMARY KEY ("cardId","tradeOfferId","accountId")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "base" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_firebaseId_key" ON "accounts"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_handle_key" ON "accounts"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "privileges_accountId_privilege_key" ON "privileges"("accountId", "privilege");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_key" ON "groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "artists_name_groupId_key" ON "artists"("name", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "eras_title_groupId_key" ON "eras"("title", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "cards_setId_iteration_key" ON "cards"("setId", "iteration");

-- CreateIndex
CREATE UNIQUE INDEX "cardset_artists_setId_artistId_key" ON "cardset_artists"("setId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "rarity_id_key" ON "rarity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rarity_label_key" ON "rarity"("label");

-- CreateIndex
CREATE UNIQUE INDEX "rarity_points_key" ON "rarity"("points");

-- CreateIndex
CREATE UNIQUE INDEX "trade_offers_id_key" ON "trade_offers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trade_pieces_cardId_tradeOfferId_accountId_key" ON "trade_pieces"("cardId", "tradeOfferId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eras" ADD CONSTRAINT "eras_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eras" ADD CONSTRAINT "eras_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_setId_fkey" FOREIGN KEY ("setId") REFERENCES "cardsets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardsets" ADD CONSTRAINT "cardsets_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "eras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardsets" ADD CONSTRAINT "cardsets_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardsets" ADD CONSTRAINT "cardsets_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardset_artists" ADD CONSTRAINT "cardset_artists_setId_fkey" FOREIGN KEY ("setId") REFERENCES "cardsets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardset_artists" ADD CONSTRAINT "cardset_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_offers" ADD CONSTRAINT "trade_offers_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_offers" ADD CONSTRAINT "trade_offers_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_offers" ADD CONSTRAINT "trade_offers_initialTradeId_fkey" FOREIGN KEY ("initialTradeId") REFERENCES "trade_offers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_pieces" ADD CONSTRAINT "trade_pieces_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_pieces" ADD CONSTRAINT "trade_pieces_tradeOfferId_fkey" FOREIGN KEY ("tradeOfferId") REFERENCES "trade_offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_pieces" ADD CONSTRAINT "trade_pieces_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
