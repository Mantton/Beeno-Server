import { TradeStatus, TradeType } from "@prisma/client";
import { database } from "../helpers";
import { logger } from "../utils";

export async function setTradeStatusAndTypes() {
  // Types

  const types: TradeType[] = [
    {
      id: 1,
      label: "Initial",
    },
    { id: 2, label: "Counter" },
  ];

  const statuses: TradeStatus[] = [
    { id: 1, label: "Accepted" },
    { id: 2, label: "Denied" },
    { id: 3, label: "Countered" },
    { id: 4, label: "Stale" }, // i.e The Target Card has already been transferred
    { id: 5, label: "Active" },
  ];

  database.$transaction(async (database) => {
    const promises: any[] = types.map((type) => {
      return database.tradeType.upsert({
        where: {
          id: type.id,
        },
        update: type,
        create: type,
      });
    });

    promises.push(
      ...statuses.map((status) => {
        return database.tradeStatus.upsert({
          where: {
            id: status.id,
          },
          update: status,
          create: status,
        });
      })
    );

    await Promise.all(promises);
    logger.info("Trade Types And Statuses Updated");
  });
}
