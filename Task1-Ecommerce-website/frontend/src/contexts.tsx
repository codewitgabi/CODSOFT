import { createContext } from "react";
import "./types";

interface IContext {
  cart: Array<string | number>;
  user: User | null;
  products: Product[];
}

export const AppContext = createContext<IContext>({
  user: null,
  cart: [],
  products: [],
});
