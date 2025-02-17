"use client";

import React, {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";

type SettingsContextType = {
  isLoading: boolean;
  error: Error | null;
  reloadSettings: () => Promise<void>;
  settings: Record<string, number> | null;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [settings, setSettings] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // const reloadSettings = async () => {
  //   const res = await fetch("/api/settings", { cache: "no-store" });
  //   const data = await res.json();
  //   setSettings(data);
  // };
  const reloadSettings = async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch settings");
      }
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ settings, isLoading, error, reloadSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
