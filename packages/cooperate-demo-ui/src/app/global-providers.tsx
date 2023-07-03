'use client'

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { Alfajores, Celo, Cannoli } from "@celo/rainbowkit-celo/chains";

const { chains, publicClient } = configureChains(
  [Alfajores, Celo, Cannoli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const projectId = "f77e8ad2f0aebeeaea345d11ab6c52ab";

const connectors = celoGroups({
  chains,
  projectId,
  appName: "Cooperate Demo UI",
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

export function GlobalProviders({ children }: { children: React.ReactNode}) {

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
