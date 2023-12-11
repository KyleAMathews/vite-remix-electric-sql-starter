import type * as Party from "partykit/server"
declare const ELECTRIC_ORIGIN: string
console.log({ ELECTRIC_ORIGIN })

export default class WSProxy {
  static onFetch() {
    try {
      // const ws = new WebSocket(`ws://${ELECTRIC_ORIGIN}ws`)
      // @ts-expect-error it's a cloudflare thing
      const [client, server] = Object.values(new WebSocketPair())

      // ws.addEventListener(`message`, (evt) => {
      // pair[1].send(evt.data)
      // })

      // pair[1].addEventListener(`message`, (evt) => {
      // ws.send(evt.data)
      // })

      // ws.addEventListener(`close`, () => {
      // pair[1].close()
      // })

      // pair[1].addEventListener(`close`, () => {
      // ws.close()
      // })

      // ws.addEventListener(`error`, () => {
      // pair[1].close()
      // })

      // pair[1].addEventListener(`error`, () => {
      // ws.close()
      // })

      server.accept()

      // @ts-expect-error it's a cloudflare thing
      return new Response(null, { status: 101, webSocket: client })
    } catch (e) {
      console.log(e)
    }
  }
}
