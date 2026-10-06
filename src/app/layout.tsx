import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marés Automóveis",
  description: "Seminovos com procedência, confiança e condições claras."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
