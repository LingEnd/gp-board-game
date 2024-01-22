export { onBeforeRender };

import type { OnBeforeRenderAsync } from "vike/types";
import { prisma } from "../database/prisma";
import { createHash } from "crypto";

const onBeforeRender: OnBeforeRenderAsync = async (
  pageContext
): ReturnType<OnBeforeRenderAsync> => {
  if (!pageContext.session) {
    return;
  }

  const res = await prisma.session.findUnique({
    where: { sessionToken: pageContext.session },
    select: { user: true },
  });
  if (!res) {
    return;
  }
  if (!res.user.image) {
    if (res.user.email) {
      const emailHash = createHash("sha256")
        .update(res.user.email)
        .digest("hex");
      const userImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
      const user = await prisma.user.update({
        where: { id: res.user.id },
        data: {
          image: userImage,
        },
      });
      return {
        pageContext: {
          user,
        },
      };
    }
  }
  return {
    pageContext: {
      user: res.user,
    },
  };
};
