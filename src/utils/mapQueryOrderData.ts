import { QueryOrder } from "@mikro-orm/core";

export const mapQueryOrderData = (orderBy?: string) => {
  if (orderBy === "ASC" || orderBy === "DESC") {
    return { createdAt: QueryOrder[orderBy] };
  }

  return {};
};
