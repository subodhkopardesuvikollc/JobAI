"use client";
import { File } from "@/utils/types";
import React, { createContext, useEffect } from "react";

interface JdContextProps {
  jd: File;
  setJd: (jd: File) => void;
}
const JdContext = createContext<JdContextProps | null>(null);
export const JdProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: File;
}) => {
  const [jdContextProps, setJdContextProps] = React.useState<JdContextProps>(
    {} as JdContextProps
  );
  useEffect(() => {
    if (value) {
      setJdContextProps((prev) => ({ ...prev, jd: value as File }));
    }
  }, [value]);
  return (
    <JdContext.Provider
      value={{
        jd: jdContextProps.jd,
        setJd: jdContextProps.setJd,
      }}
    >
      {children}
    </JdContext.Provider>
  );
};
export const useJdContext = () => {
  const context = React.useContext(JdContext);
  if (!context) {
    throw new Error("useJdContext must be used within a JdProvider");
  }
  return context;
};
