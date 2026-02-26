"use client";

import { createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ProgressBarContextType {
  maxValue: number;
}
interface ProgressProps {
  children: ReactNode;
  maxValue: number;
}
interface BarProps {
  value: number;
  maxValue?: number;
  className?: string;
}

const ProgressBarContext = createContext<ProgressBarContextType>({
  maxValue: 200,
});

function useProgressBarContext() {
  const context = useContext(ProgressBarContext);
  return context;
}

export function Progress({ children, maxValue }: ProgressProps) {
  return (
    <ProgressBarContext.Provider value={{ maxValue }}>
      {children}
    </ProgressBarContext.Provider>
  );
}

export function Bar({ value, className }: BarProps) {
  const { maxValue } = useProgressBarContext();
  const percentage = (value / maxValue) * 100;

  return (
    <div className={cn("w-full h-2 bg-zinc-200 rounded-full", className)}>
      <div
        className="h-full bg-red-700 rounded-full group-hover:ring ring-offset-2 ring-red-700 transition-all duration-200"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
