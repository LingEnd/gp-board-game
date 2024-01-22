import { prisma } from "../../../../../database/prisma";

export { onSubmit };

async function onSubmit(title: string, content: string, userId: string) {
  const announcement = await prisma.announcement.create({
    data: {
      title,
      content,
      userId,
    },
  });
}
