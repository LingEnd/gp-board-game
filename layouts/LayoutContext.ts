import { createContext } from "react";

export const LayoutContext = createContext<{
  handleLoginOpen?: () => void;
}>({});
