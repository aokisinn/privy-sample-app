'use client'

import { PrivyProvider as PrivyProviderComponent } from '@privy-io/react-auth'
import React from 'react'

export default function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProviderComponent
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID as string}
      config={{
        externalWallets: {
          walletConnect: {
            enabled: false,
          },
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'off',
          },
        },
      }}
    >
      {children}
    </PrivyProviderComponent>
  )
}
