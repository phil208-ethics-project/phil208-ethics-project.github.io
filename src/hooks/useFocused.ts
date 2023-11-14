import { useCallback, useState } from 'react'

export default function useFocused() {
  const [isFocused, setIsFocused] = useState(false)
  const onBlur = useCallback(() => setIsFocused(false), [setIsFocused])
  const onFocus = useCallback(() => setIsFocused(true), [setIsFocused])

  const props = {
    onBlur,
    onFocus,
  }
  return { props, isFocused }
}
