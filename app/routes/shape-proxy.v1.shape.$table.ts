import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"

// TODO
// validate tables that are allowed
export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const { table } = params
  const originUrl = new URL(`http://localhost:3000/v1/shape/${table}`)
  url.searchParams.forEach((value, key) => {
    originUrl.searchParams.set(key, value)
  })
  console.log(`originUrl`, originUrl.toString())
  return await fetch(originUrl.toString())
}
