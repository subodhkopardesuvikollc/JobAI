"use client";
import React, { createContext, useEffect } from "react";

interface JdContextProps {
  jdFileName: string;
  setJdFileName: (jdBlobName: string) => void;
}
const JdContext = createContext<JdContextProps | null>(null);
export const JdProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: string;
}) => {
  const [jdContextProps, setJdContextProps] = React.useState<JdContextProps>(
    {} as JdContextProps
  );
  useEffect(() => {
    if (value) {
      setJdContextProps({ ...jdContextProps, jdFileName: value });
    }
  }, [value]);
  return (
    <JdContext.Provider
      value={{
        jdFileName: jdContextProps.jdFileName,
        setJdFileName: jdContextProps.setJdFileName,
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
