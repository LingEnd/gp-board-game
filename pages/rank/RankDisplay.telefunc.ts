import { prisma } from "../../database/prisma";

export { onQueryRank };

async function onQueryRank() {
  // select user.name,user.rank,user.credits from user sort by user.credits desc
  const users = await prisma.user.findMany({
    select: {
      name: true,
      rank: true,
      credits: true,
      image: true,
    },
    orderBy: {
      credits: "desc",
    },
  });
  return users;
}
