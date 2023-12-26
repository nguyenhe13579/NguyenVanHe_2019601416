export const is_server = (): boolean => {
  return !(typeof window !== 'undefined' && window.document)
}
