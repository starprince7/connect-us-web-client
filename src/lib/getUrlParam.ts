// utils.ts

export const getFromUrl = (value: string): string | null => {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(value)
}
