import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { createWalletClient, custom } from 'viem'
export const config = createConfig({
  chains:[base],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "SHOPIFY BASED",
      preference:"smartWalletOnly"
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http()
    // [base.id]: http("https://base-pokt.nodies.app")
  },
});

export const walletClient = createWalletClient({
  chain: base,
  transport:http()
})


declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}