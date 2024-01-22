export { onChangeEmail };

import { prisma } from "../../database/prisma";

// Telefunction arguments are automatically validated
// at runtime: `text` is guaranteed to be a string.
async function onChangeEmail(id: string, email: string) {
  // With an ORM
  try {
    await prisma.user.update({
      where: { id },
      data: { email },
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}
