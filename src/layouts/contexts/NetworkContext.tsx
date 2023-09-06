import { getEnvironment, NetworkConnection } from "@contexts/Environment";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext } from "react";
import {
  Network as NetworkObject,
  getNetwork,
} from "@defichain/jellyfish-network";

/**
 * What connection is Meta Scan connected to.
 * This is different from NetworkName, and should not be used as NetworkName.
 */

export type NetworkName = NetworkObject["name"];

export interface NetworkContextObject extends NetworkObject {
  connection: NetworkConnection;
}

export const NetworkContext = createContext<NetworkContextObject>(
  undefined as any
);

export function useNetwork(): NetworkContextObject {
  return useContext(NetworkContext);
}

export function NetworkProvider({
  children,
}: PropsWithChildren<any>): JSX.Element | null {
  const router = useRouter();
  const env = getEnvironment();
  const connection = env.resolveConnection(router.query.network);

  return (
    <NetworkContext.Provider value={mapNetworkObject(connection)}>
      {children}
    </NetworkContext.Provider>
  );
}

function mapNetworkObject(connection: NetworkConnection): NetworkContextObject {
  switch (connection) {
    case NetworkConnection.MainNet:
      return { connection, ...getNetwork("mainnet") };
    case NetworkConnection.TestNet:
      return { connection, ...getNetwork("testnet") };
    case NetworkConnection.Changi:
      return { connection, ...getNetwork("changi") };
    default:
      throw new Error(`${connection as string} network not found`);
  }
}
