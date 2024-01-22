export { guard };

import { render } from "vike/abort";
import type { GuardAsync } from "vike/types";

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  const { user } = pageContext;
  // for client routing
  if (user) {
    return;
  }
  // for server routing
  if (pageContext.session) {
    return;
  }

  throw render(401, "This page is only for logged in users.");
};
