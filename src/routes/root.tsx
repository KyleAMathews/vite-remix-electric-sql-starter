import { useState } from "react"
import { Outlet, useSearchParams, useNavigate, NavLink } from "react-router-dom"
import { useElectric } from "../context"
import { useContacts, useCreateContact } from "../daos/contacts"

export default function Root() {
  const url = new URL(window.location.href)
  const qUrl = url.searchParams.get(`q`)
  const [searchParams, setSearchParams] = useSearchParams()
  const [q, setQ] = useState(qUrl)
  const contacts = useContacts(q)
  const { db } = useElectric()!
  const navigate = useNavigate()
  const createContact = useCreateContact()

  if (contacts === undefined) {
    return null
  }
  return (
    <>
      <div id="sidebar">
        <h1>ElectricSQL Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
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
          <form
            method="post"
            onSubmit={async (event) => {
              event.preventDefault()
              const newContact = await createContact()
              navigate(`/contacts/${newContact.id}/edit`)
            }}
          >
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <h2>Contacts ({contacts?.length || 0})</h2>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? `active` : isPending ? `pending` : ``
                    }
                  >
                    {contact.first_name || contact.last_name ? (
                      <>
                        {contact.first_name} {contact.last_name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {` `}
                    {!!contact.is_favorited && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}
