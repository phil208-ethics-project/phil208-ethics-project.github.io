import { createContext, useState } from 'react'

type ContextType = {
  session: number | undefined
  setSession: React.Dispatch<React.SetStateAction<number | undefined>>
}
export const SessionContext = createContext<ContextType>({} as ContextType)

interface SessionContextProps {
  children: React.ReactNode
}

export function SessionContextProvider({ children }: SessionContextProps) {
  const [session, setSession] = useState<number | undefined>(2)

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}
