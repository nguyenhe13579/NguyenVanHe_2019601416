import { useState } from 'react'

function useLocalStorage<T>(key: string, init: T | null) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return init

    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : init
  })

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value

    setStoredValue(valueToStore)
    if (typeof window !== 'undefined')
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue] as const
}

export default useLocalStorage
