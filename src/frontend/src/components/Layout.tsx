import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type * as React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="top"
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
