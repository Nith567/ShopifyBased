import Nav from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'shopifyBased',
  description: 'Integrate Shopify onchainRewards directly in to frames',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
      <Nav />
      <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}
