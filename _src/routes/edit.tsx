import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useUpdateContact, contactQuery } from "../daos/contacts"
import { Electric, Contacts } from "../generated/client"
import { useElectricData } from "electric-query"

const queries = ({
  db,
  dummyUserId,
  id,
}: {
  db: Electric[`db`]
  dummyUserId: string
  id: string
}) => {
  return {
    contacts: db.liveRaw(contactQuery({ id, dummyUserId })),
  }
}
EditContact.queries = queries

export default function EditContact() {
  // Query for contact.
  const location = useLocation()
  const { contacts }: { contacts: Contacts[] } = useElectricData(
    location.pathname + location.search
  )
  const contact = contacts[0]

  // Get contactId & navigate function for navigating after submitting form.
  const { contactId } = useParams()
  const navigate = useNavigate()

  // Mutation function.
  const updateContact = useUpdateContact()

  return (
    <form
      method="post"
      id="contact-form"
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const updates = Object.fromEntries(formData)
        updateContact({ id: contactId, updates })
        navigate(`/contacts/${contactId}`)
      }}
    >
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first_name"
          defaultValue={contact.first_name}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last_name"
          defaultValue={contact.last_name}
        />
      </p>
      <label>
        <span>Website</span>
        <input
          type="text"
          name="website"
          placeholder="https://example.com"
          defaultValue={contact.website}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </form>
  )
}
