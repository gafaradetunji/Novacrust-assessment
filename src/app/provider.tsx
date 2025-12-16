'use client';
import { config } from '@/common/lib'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner';
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
            position="top-right"
            richColors
            toastOptions={{
            duration: 3000,
            className: 'custom-toast',
            style: {
                padding: '12px 16px',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            },
            }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  )
}