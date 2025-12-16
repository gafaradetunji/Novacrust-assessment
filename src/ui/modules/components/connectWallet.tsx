import { useConnection } from "wagmi"
import { Connection } from "./connection"
import { WalletOptions } from "./walletConnect"

export function ConnectWallet() {
    const { isConnected } = useConnection()
    if (isConnected) return <Connection />
    return <WalletOptions />
}
