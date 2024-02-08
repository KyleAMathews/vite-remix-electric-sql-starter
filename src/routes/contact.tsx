import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  useDeleteContact,
  useUnfavoriteContact,
  useFavoriteContact,
  contactQuery,
} from "../daos/contacts"
import { Electric, Contacts } from "../generated/client"
import { useElectricData } from "electric-query"
import { useElectric } from "../context"

const queries = ({
  db,
  dummyUserId,
  id,
}: {
  db: Electric[`db`]
  id: string
  dummyUserId: string
}) => {
  return {
    contact: db.liveRaw(contactQuery({ id, dummyUserId })),
  }
}
Contact.queries = queries

export default function Contact() {
  // Query for contact.
  const location = useLocation()
  const { contacts }: { contacts: Contacts[] } = useElectricData(
    location.pathname + location.search
  )
  const contact = contacts[0]

  // Get navigate function and mutation function
  const navigate = useNavigate()
  const deleteContact = useDeleteContact()

  const { db } = useElectric()!
  const { contactId } = useParams()

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || ``} />
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
            onClick={(e) => {
              e.preventDefault()
              navigate(`/contacts/${contactId}/edit`)
            }}
          >
            <button type="submit">Edit</button>
          </form>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              if (confirm(`Please confirm you want to delete this record.`)) {
                await deleteContact(contactId)
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

function Favorite({ contact }: { contact: Contacts }) {
  const favoriteContact = useFavoriteContact()
  const unfavoriteContact = useUnfavoriteContact()

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
            await unfavoriteContact(contact.id)
          } else {
            favoriteContact(contact.id)
          }
        }}
      >
        {favorite ? `★` : `☆`}
      </button>
    </form>
  )
}
