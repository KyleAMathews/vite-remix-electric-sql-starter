import { useParams, useNavigate } from "react-router-dom"
import {
  useContact,
  deleteContact,
  unfavoriteContact,
  favoriteContact,
} from "../daos/contacts"
import { useElectric } from "../context"

export default function Contact() {
  const { db } = useElectric()!
  const { contactId } = useParams()
  const navigate = useNavigate()
  const contact = useContact(contactId)

  if (contact === undefined) {
    return null
  }

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}
          {` `}
          <Favorite db={db} contact={contact} />
        </h1>

        {contact.website && (
          <p>
            <a target="_blank" href={contact.website}>
              {contact.website}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <form
            action="edit"
            onClick={() => {
              navigate(`/contacts/${contactId}/edit`)
            }}
          >
            <button type="submit">Edit</button>
          </form>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              if (confirm(`Please confirm you want to delete this record.`)) {
                const result = await deleteContact({ db, id: contactId })
                navigate(`/`)
              }
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  )
}

function Favorite({ contact, db }) {
  // yes, this is a `let` for later
  const favorite = !!contact.is_favorited
  return (
    <form method="post">
      <button
        name="favorite"
        value={favorite ? `false` : `true`}
        aria-label={favorite ? `Remove from favorites` : `Add to favorites`}
        onClick={async (e) => {
          e.preventDefault()
          if (favorite) {
            await unfavoriteContact({ db, id: contact.id })
          } else {
            favoriteContact({ db, id: contact.id })
          }
        }}
      >
        {favorite ? `★` : `☆`}
      </button>
    </form>
  )
}
