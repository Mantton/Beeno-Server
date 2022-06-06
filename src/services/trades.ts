import { database } from "../helpers";

export const declineOffer = async (id: number) => {
  //
  // Mark As Declined
  await database.tradeOffer.update({
    where: {
      id,
    },
    data: {
      tradeStatus: 2,
    },
  });
};
export const acceptOffer = async (id: number) => {
  // Mark As Accepted
  await database.tradeOffer.update({
    where: {
      id,
    },
    data: {
      tradeStatus: 1,
    },
  });
};

export const counterOffer = (id: number) => {
  //
};

export const transferCards = async (
  acc1: { id: number; cardIds: number[] },
  acc2: { id: number; cardIds: number[] }
) => {
  //

  await database.$transaction(async (database) => {
    // Move Acc 1 Cards to Acc 2
    database.cardItem.updateMany({
      where: {
        id: {
          in: acc1.cardIds,
        },
      },
      data: {
        ownerId: acc2.id,
      },
    });

    // Move Acc 2 Cards to Acc 1
    database.cardItem.updateMany({
      where: {
        id: {
          in: acc2.cardIds,
        },
      },
      data: {
        ownerId: acc1.id,
      },
    });
  });
};

export const makeOffer = async (
  initiatorId: number,
  recipientId: number,
  givingCards: number[],
  receivingCards: number[],
  lgc: number[],
  lrc: number[],
  nonNegotiable: boolean
) => {
  await database.tradeOffer.create({
    data: {
      initiatorId,
      recipientId,
      isLocked: nonNegotiable,
      tradeStatus: 5, // Active
      tradeType: 1, // Initial
      pieces: {
        createMany: {
          data: [
            ...givingCards.map((id) => ({
              cardId: id,
              accountId: initiatorId,
              isLocked: lgc.includes(id),
            })),
            ...receivingCards.map((id) => ({
              cardId: id,
              isLocked: lrc.includes(id),
              accountId: recipientId,
            })),
          ],
        },
      },
    },
    include: {
      pieces: true,
    },
  });
};
