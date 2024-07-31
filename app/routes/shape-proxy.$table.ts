import nodePkg from "@remix-run/node"
const { Request, json, LoaderArgs, installGlobals } = nodePkg
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Client } from "undici"
import http from "http"

installGlobals({ nativeFetch: true })

const client = new Client(`http://localhost:3000`)
// TODO
// validate tables that are allowed
export async function loader({
  params,
  request,
  response,
}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const { table } = params
  const originUrl = new URL(`http://localhost:3000/v1/shape/${table}`)
  url.searchParams.forEach((value, key) => {
    originUrl.searchParams.set(key, value)
  })

  // When proxying long-polling requests, content-encoding & content-length are added
  // erroneously (saying the body is gzipped when it's not) so we'll just remove
  // them to avoid content decoding errors in the browser.
  //
  // Similar-ish problem to https://github.com/wintercg/fetch/issues/23
  let resp = await fetch(originUrl.toString())
  if (resp.headers.get(`content-encoding`)) {
    const headers = new Headers(resp.headers)
    headers.delete(`content-encoding`)
    headers.delete(`content-length`)
    resp = new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
    })
  }
  return resp
}
