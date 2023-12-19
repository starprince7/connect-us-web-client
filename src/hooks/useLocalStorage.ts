import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const storedValue: T = JSON.parse(localStorage.getItem(key)!) || initialValue

  const [value, setValue] = useState<T>(storedValue)

  // Update local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
