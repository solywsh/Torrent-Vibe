export const initializeDevTools = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_REACT_SCAN === '1') {
    const { start } = await import('react-scan')
    start()
  }
}
