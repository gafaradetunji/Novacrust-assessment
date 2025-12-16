import { useConnection, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Connection() {
  const { address, connector } = useConnection()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })
  const shortAddress = address && `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <div className="flex items-center justify-between w-80 px-4 py-3 border rounded-xl bg-white">
      {/* Left: Wallet info */}
      <div className="flex items-center gap-3">
        {/* Wallet / ENS Avatar */}
        {ensAvatar ? (
          <img
            src={ensAvatar}
            alt="ENS Avatar"
            className="w-8 h-8 rounded-full"
          />
        ) : connector?.icon ? (
          <img
            src={connector.icon}
            alt={connector.name}
            className="w-8 h-8"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        )}

        {/* Name + address */}
        <div className="flex flex-col text-sm">
          <span className="font-medium">
            {ensName ?? connector?.name}
          </span>
          <span className="text-gray-500">{shortAddress}</span>
        </div>
      </div>

      {/* Right: Connected indicator + disconnect */}
      <div className="flex items-center gap-3">
        {/* Green connected dot */}
        <span className="w-3 h-3 rounded-full bg-green-500" />

        {/* Disconnect */}
        <button
          onClick={() => disconnect()}
          className="text-xs text-red-500 hover:underline"
        >
          Disconnect
        </button>
      </div>
    </div>
  )
}
