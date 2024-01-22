export { onChangeUserName };

import { Abort } from "telefunc";
import { prisma } from "../../database/prisma";

// Telefunction arguments are automatically validated
// at runtime: `text` is guaranteed to be a string.
async function onChangeUserName(id: string, name: string) {
  // With an ORM
  try {
    await prisma.user.update({
      where: { id },
      data: { name },
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}
