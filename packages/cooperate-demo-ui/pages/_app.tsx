import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celoAlfajores, celo } from '@wagmi/chains'
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { SessionProvider } from 'next-auth/react'

const { chains, publicClient } = configureChains(
  [celoAlfajores, celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const projectId = "f77e8ad2f0aebeeaea345d11ab6c52ab";

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      }
    }),
    new MetaMaskConnector({ chains })
  ],
  publicClient: publicClient,
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <WagmiConfig config={wagmiConfig}>
        <Component {...pageProps} />
      </WagmiConfig>
    </SessionProvider>
  )
}

export default MyApp
