import { useEffect, useRef } from 'react'

export default function useOnClickOutside<ElType extends HTMLElement>(
  callback: () => void,
  deps?: React.DependencyList,
  elementRef?: React.RefObject<ElType>,
) {
  const createdRef = useRef<ElType>(null)
  const ref = elementRef ?? createdRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Element &&
        !ref.current.contains(event.target)
      ) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, ...(deps || [])])

  return ref
}
