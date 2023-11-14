import { useEffect, useState } from 'react'

export default function useDelayedValue<T>(value: T) {
  const [delayedValue, setDelayedValue] = useState<T>(value)

  useEffect(() => setDelayedValue(value), [value])

  return delayedValue
}
