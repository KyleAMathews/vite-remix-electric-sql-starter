export const contactsShape = (selector = (data) => data) => {
  return {
    url: `http://localhost:5173/shape-proxy/contacts`,
    selector,
  }
}
export const favoriteContactsShape = (selector = (data) => data) => {
  return {
    url: `http://localhost:5173/shape-proxy/favorite_contacts`,
    selector,
  }
}
