"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import React from "react";
import { config } from "@/utils/wagmi";

export function Providers(props: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</WagmiProvider>
	);
}