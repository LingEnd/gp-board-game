export { guard };

import { render } from "vike/abort";
import type { GuardAsync } from "vike/types";
import { prisma } from "../../database/prisma";

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  const { user } = pageContext;
  // for client routing
  // for server routing
  if (pageContext.session) {
    prisma.session
      .findUnique({
        where: { sessionToken: pageContext.session },
        select: {
          user: {
            select: { role: true },
          },
        },
      })
      .then((role) => {
        if (role?.user?.role === "admin") {
          return;
        }
        throw render(401, "This page is only for admin.");
      });
  }
};
