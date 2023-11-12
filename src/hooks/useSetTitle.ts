import { useEffect } from 'react'

export default function useSetTitle(title: string) {
  useEffect(() => {
    const oldTitle = document.title
    document.title = title
    return () => {
      document.title = oldTitle
    }
  }, [title])
}
