import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Smartse - Leilões',
  description: 'Smartse é uma plataforma de leilões online que conecta compradores e vendedores de todo o Brasil.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
