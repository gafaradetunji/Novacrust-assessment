import React from "react"

export const SelectSearchContext = React.createContext<{
  query: string
  setQuery: (v: string) => void
} | null>(null)
