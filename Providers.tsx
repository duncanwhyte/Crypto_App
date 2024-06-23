"use client";
import StoreProvider from "@/app/StoreProvider";
import { ThemeProvider } from "next-themes";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
}
