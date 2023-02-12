import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider, CHAIN } from '@arcana/auth'
import { ProvideAuth } from '@arcana/auth-react'

const appAddress = '48c31b59874588631f4557b580c026fc15c76c20'
const provider = new AuthProvider(`${appAddress}`, { 
  network: 'testnet', 
  alwaysVisible: true, 
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET, 
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/' // 'https://polygon-rpc.com', 
  },
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth provider={provider}>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}
