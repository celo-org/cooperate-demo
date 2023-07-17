import { FC, useCallback, useState, useEffect } from 'react'
import { Button } from "components/button"
import { useAccount, useConnect } from 'wagmi'
import { useSession } from 'next-auth/react'

export const ClaimNFTButton: FC = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const [claiming, setClaiming] = useState<boolean>(false)
  const [authenticating, setAuthenticating] = useState<boolean>(false)
  const [authWindow, setAuthWindow] = useState<Window | null>(null)
  const { data: session } = useSession()
  const authenticated = !!session?.user

  useEffect(() => {
    if (!authenticating) return
    if (authenticated && authenticating) {
      authWindow?.close()
    }
  }, [authWindow, authenticating, authenticated])

  const initiateAuth = useCallback(async () => {
    setAuthenticating(true)
    const authWindow = popupAuth()
    setAuthWindow(authWindow)
  }, [])

  console.log(address)
  const claimSteps = () => {
    if (!isConnected) {
      return (
        <>
          {connectors.map((connector, index) => (
            <Button
              disabled={!connector.ready}
              key={index}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </Button>

          ))}
        </>
      )
    }
    if (!authenticated) {
      return (
        <Button onClick={initiateAuth}>Connect to Github</Button>
      )
    }
    return (
      <div>Connected & Authenticated</div>
    )
  }

  return (
    <div>
      {claiming && claimSteps()}
      {!claiming && (
        <Button disabled={claiming} onClick={() => setClaiming(true)}>
          stuff
        </Button>
      )}
    </div>
  )
}

function popupAuth() {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;
  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    '/social-sign-in',
    'Connect your social account',
    `width=${500 / systemZoom},height=${550 / systemZoom
    },top=${top},left=${left},popup=true`
  );

  newWindow?.focus();
  return newWindow
}
