import { useCallback, useEffect } from 'react'

export default function useKeyPressed(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  deps?: React.DependencyList,
) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (keys.includes(event.key)) callback(event)
    },
    [callback, ...(deps || [])],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [callback, ...(deps || [])])
}

export function useEscPressed(
  callback: (event: KeyboardEvent) => void,
  deps?: React.DependencyList,
) {
  return useKeyPressed(['Escape'], callback, deps)
}
