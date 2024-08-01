import { useState } from "react"
import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  NavLink,
  useSearchParams,
  Outlet,
  Form,
  redirect,
} from "@remix-run/react"
import { Theme } from "@radix-ui/themes"
import { useShape, preloadShape, getShapeStream } from "@electric-sql/react"
import { contactsShape, favoriteContactsShape } from "./shapes-defs"
import { TextField, Flex, Heading, Text, Button, Link } from "@radix-ui/themes"
import "@fontsource/instrument-serif/latin.css"
import "@radix-ui/themes/styles.css"
import "../.cache/typography.css"
import type {
  ClientLoaderFunctionArgs,
  ClientActionFunctionArgs,
} from "@remix-run/react"
import { matchStream } from "./utils/match-stream"

export const meta: MetaFunction = () => {
  return [
    { title: `New Remix App` },
    { name: `description`, content: `Welcome to Remix!` },
  ]
}

export const clientLoader = async ({}: ClientLoaderFunctionArgs) => {
  return await preloadShape(contactsShape())
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const contactsShapeStream = getShapeStream(contactsShape())

  const formData = await request.formData()

  // Match to update stream.
  const findUpdatePromise = matchStream({
    stream: contactsShapeStream,
    operations: [`insert`],
    // This is the only place we insert so just wait for the next insert and we're
    // done.
    matchFn: () => true,
  })

  const fetchPromise = fetch(`/api/contacts`, {
    method: `POST`,
    body: formData,
  }).then((res) => {
    if (!res.ok) {
      throw new Response(`Response status: ${res.status}`, {
        status: res.status,
      })
    }

    return res
  })

  await Promise.all([findUpdatePromise, fetchPromise])

  const res = await fetchPromise
  const body = await res.json()
  return redirect(`/contacts/${body.id}`)
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const url = new URL(window.location.href)
  const qUrl = url.searchParams.get(`q`)
  const [_, setSearchParams] = useSearchParams()
  const [q, setQ] = useState(qUrl)
  console.log({ qUrl, q })
  const { data: contacts, isUpToDate } = useShape(
    contactsShape((res) => {
      const copy = { ...res }
      // Filter down list by search query.
      copy.data = copy.data.filter((c) => {
        return `${c.first_name} ${c.last_name}`
          .toLowerCase()
          .includes(q === null ? `` : q.toLowerCase())
      })

      return copy
    })
  )
  const { data: favoritedContacts } = useShape(favoriteContactsShape())

  if (!isUpToDate) {
    return `loading`
  }

  return (
    <Theme>
      <Flex style={{ height: `100vh`, width: `100%` }}>
        <Flex
          direction="column"
          gap="5"
          p="5"
          style={{ background: `#f7f7f7` }}
        >
          <Heading weight="medium">ElectricSQL Contacts</Heading>
          <Flex direction="column" gap="2">
            <form id="search-form" role="search">
              <TextField.Root
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                value={q || ``}
                onChange={(event) => {
                  const formData = new FormData(event.currentTarget.form)
                  const updates = Object.fromEntries(formData)
                  setSearchParams({ q: updates.q }, { replace: true })
                  setQ(updates.q)
                }}
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <div className="sr-only" aria-live="polite"></div>
            </form>
            <Form method="post">
              <button type="submit" name="intent" value="new-contact">
                New
              </button>
            </Form>
          </Flex>
          <Flex asChild direction="column" gap="3">
            <nav>
              <Heading size="5">Contacts ({contacts?.length || 0})</Heading>
              {contacts?.length ? (
                <Flex asChild gap="2" direction="column">
                  <ul style={{ listStyle: `none`, padding: 0, margin: 0 }}>
                    {contacts.map((contact) => (
                      <li key={contact.id as string}>
                        <Link asChild>
                          <NavLink
                            to={`contacts/${contact.id}`}
                            style={({ isActive }) => {
                              return {
                                fontWeight: isActive ? `bold` : `inherit`,
                              }
                            }}
                          >
                            {contact.first_name || contact.last_name ? (
                              <>
                                {contact.first_name} {contact.last_name}
                              </>
                            ) : (
                              <i>No Name</i>
                            )}
                            {` `}
                            {favoritedContacts.some(
                              (favorite) => favorite.contact_id === contact.id
                            ) && <span>★</span>}
                          </NavLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Flex>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
            </nav>
          </Flex>
        </Flex>
        <Flex direction="column" gap="5" p="5">
          <Outlet />
        </Flex>
      </Flex>
    </Theme>
  )
}
