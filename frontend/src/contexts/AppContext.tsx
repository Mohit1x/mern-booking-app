import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type AppContextType = {
  isLoggedIn: boolean;
  stripePromise?: Promise<Stripe | null>;
};

type Props = { children: ReactNode };

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
});

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }: Props) => {
  const { isError } = useQuery({
    queryFn: apiClient.validateToken,
    queryKey: ["validateToken"],
    retry: false,
  });

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError, stripePromise }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
