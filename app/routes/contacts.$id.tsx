import { useParams } from "@remix-run/react"
import { useShape, preloadShape } from "@electric-sql/react"
import type { ClientLoaderFunctionArgs } from "@remix-run/react"
import { contactsShape } from "../shapes-defs"

export const clientLoader = async ({
  request,
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  return await preloadShape(contactsShape())
}

export default function Contact() {
  const params = useParams()
  console.log({ id: params.id })
  const { data: contact, isUpToDate } = useShape(
    contactsShape((res) => {
      console.log(res.data)
      const copy = { ...res }
      copy.data = copy.data.find((c) => {
        return c.id === params.id
      })

      return copy
    })
  )

  if (!contact) {
    return 404
  }

  if (!isUpToDate) {
    return `loading`
  }

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
          <Favorite contact={contact} />
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
