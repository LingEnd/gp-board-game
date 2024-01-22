import { User } from "@prisma/client";

declare global {
  namespace Vike {
    interface PageContext {
      session?: string;
      user?: User;
      csrfToken?: string;
      // Define type of pageContext.pageProps
      pageProps?: PageProps;
      // Refine type of pageContext.Page (it's `unknown` by default)
      Page: (pageProps: any) => JSX.Element;
    }
  }
}
type PageProps = {};

// Tell TypeScript this file isn't an ambient module
export {};
