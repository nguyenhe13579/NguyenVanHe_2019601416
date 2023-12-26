import { useState } from 'react'

function useSessionStorage<T>(key: string, init: T | null) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return init

    const item = window.sessionStorage.getItem(key)
    return item ? JSON.parse(item) : init
  })

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value

    setStoredValue(valueToStore)
    if (typeof window !== 'undefined')
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue] as const
}

export default useSessionStorage