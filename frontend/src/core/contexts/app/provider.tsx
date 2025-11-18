import { useState, type ReactNode } from 'react';
import { AppContext } from './context';
import type { AppContextValue } from './types';

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const value: AppContextValue = {
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
