import { useState } from "react";
import { LoadingContext } from "../contexts";

export const LoadingProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
