import { useParams, useNavigate } from "react-router-dom"
import { useContact, useUpdateContact } from "../daos/contacts"
import { useElectric } from "../context"

export default function EditContact() {
  const { contactId } = useParams()
  const { db } = useElectric()
  const contact = useContact(contactId)
  const navigate = useNavigate()
  const updateContact = useUpdateContact()

  if (contact === undefined) {
    return null
  }

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
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </form>
  )
}
