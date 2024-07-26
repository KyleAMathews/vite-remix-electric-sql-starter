export const contactsShape = (selector = (data) => data) => {
  return {
    shape: { table: `contacts` },
    baseUrl: `http://localhost:5173/shape-proxy`,
    selector,
  }
}
