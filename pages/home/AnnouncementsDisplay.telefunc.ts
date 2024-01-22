import { User } from "@prisma/client";
import { prisma } from "../../database/prisma";

export { onQueryAnnouncement };

async function onQueryAnnouncement() {
  return await prisma.announcement.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

async function onCreate(title: string, content: string, userId: string) {
  return await prisma.announcement.create({
    data: {
      title,
      content,
      userId,
    },
  });
}

async function onUpdate(id: string, title: string, content: string) {
  return await prisma.announcement.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}

async function onDelete(id: string) {
  return await prisma.announcement.delete({
    where: {
      id,
    },
  });
}
