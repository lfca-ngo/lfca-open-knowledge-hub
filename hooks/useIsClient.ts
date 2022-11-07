import { useEffect, useState } from 'react'

function useIsClient(executeOnMount?: () => void) {
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    executeOnMount?.()
    setClient(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isClient
}

export default useIsClient
