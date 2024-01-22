import { User } from "@prisma/client";
import { prisma } from "../../../../database/prisma";

export { onQueryUser, onUpdateUser, onDeleteUser };

async function onQueryUser() {
  // select all users
  const users = await prisma.user.findMany();
  return users;
}

async function onUpdateUser(user: User) {
  // update a user
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: user,
  });
  return updatedUser;
}

async function onDeleteUser(id: string) {
  // delete a user
  const deletedUser = await prisma.user.delete({ where: { id } });
}
