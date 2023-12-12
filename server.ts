import type * as Party from "partykit/server"

// You can add API calls here.
export default class WSProxy {
  static onFetch(req) {
    try {
      const url = new URL(req.url)
      switch (url.pathname) {
        default:
          return new Response(`Not found`, { status: 404 })
      }
    } catch (err) {
      return new Response(err.toString())
    }
  }
}
