import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type AppContextType = {
  isLoggedIn: boolean;
};

type Props = { children: ReactNode };

const AppContext = createContext<AppContextType>({ isLoggedIn: false });

export const AppContextProvider = ({ children }: Props) => {
  const { isError } = useQuery({
    queryFn: apiClient.validateToken,
    queryKey: ["validateToken"],
    retry: false,
  });

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
