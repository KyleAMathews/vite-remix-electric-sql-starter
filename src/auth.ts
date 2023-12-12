import { insecureAuthToken } from "electric-sql/auth"
import { genUUID } from "electric-sql/util"

function getOrCreateUUID() {
  // Check if a UUID is already stored in localStorage
  const existingUUID = localStorage.getItem(`uuid`)

  // If a UUID exists, return it
  if (existingUUID) {
    return existingUUID
  }

  // Generate a new UUID using your genUUID function
  const newUUID = genUUID()

  // Store the new UUID in localStorage
  localStorage.setItem(`uuid`, newUUID)

  // Return the new UUID
  return newUUID
}

export const dummyUserId = getOrCreateUUID()

// Generate an insecure authentication JWT.
// See https://electric-sql.com/docs/usage/auth for more details.
export const authToken = () => {
  const claims = { user_id: dummyUserId }

  return insecureAuthToken(claims)
}
