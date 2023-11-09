import { useState } from 'react'

export default function useFocused() {
  const [isFocused, setIsFocused] = useState(false)

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }
  const props = {
    onBlur,
    onFocus,
  }
  return { props, isFocused }
}
