export const generateUniqueId = () => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(16))
  const id = Array.from(randomBytes).map(b => b.toString(16).padStart(2, "0")).join("")
  return id
}
