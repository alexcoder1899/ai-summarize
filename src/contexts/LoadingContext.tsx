import { createContext } from "react";

interface ILoadingContext {
  isLoading: boolean;
  setLoading(loading: boolean): void;
}

export const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  setLoading: () => {}
});
