import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function useOnNavigate(callback: React.EffectCallback) {
  const location = useLocation()

  useEffect(callback, [location])
}
