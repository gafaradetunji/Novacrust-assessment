import * as React from 'react'
import { Connector, useConnect, useConnectors } from 'wagmi'

export function WalletOptions() {
  const { connect } = useConnect()
  const connectors = useConnectors()

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ))
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <li>
      <button
        onClick={onClick}
        disabled={!ready}
        className={`
          w-full flex items-center gap-3 px-4 py-3 text-left
          hover:bg-gray-100
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {connector.icon && (
          <img
            src={connector.icon}
            alt={connector.name}
            className="w-6 h-6"
          />
        )}
        <span className="font-medium">{connector.name}</span>

        {!connector.ready && (
          <span className="ml-auto text-xs text-gray-400">
            Not installed
          </span>
        )}
      </button>
    </li>
  )
}