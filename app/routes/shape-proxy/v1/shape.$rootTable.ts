import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  // console.log({ params, request, url })
  const { table } = params
  const originUrl = new URL(`http://localhost:3000/v1/shape/${table}`)
  url.searchParams.forEach((param) => {
    console.log({ param })
  })
  // originUrl.searchParams = url.searchParams
  // const res = fetch(
  return json(
    [
      {
        headers: [{ control: `up-to-date` }],
      },
    ],
    404
  )
}
