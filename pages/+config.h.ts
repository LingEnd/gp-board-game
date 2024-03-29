import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault";
import Head from "../layouts/HeadDefault";
import logoUrl from "../assets/logo.svg";
import vikeReact from "vike-react";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "Peach Board Game",
  // <meta name="description">
  description: "Demo showcasing Vike",
  // <link rel="icon" href="${favicon}" />
  favicon: logoUrl,
  extends: vikeReact,
  passToClient: ["user", "$$typeof", "csrfToken", "urlOriginal"],
} satisfies Config;
