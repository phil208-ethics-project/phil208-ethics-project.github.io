import { useEffect, useRef, useState } from 'react'

export default function useDebounce<T>(value: T, time: number) {
  const [state, setState] = useState(value)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => setState(value), time)
  }, [value, time])

  return state
}
