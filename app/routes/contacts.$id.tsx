import {
  useParams,
  redirect,
  useFetcher,
  useNavigate,
  Form,
} from "@remix-run/react"
import { useShape, getShapeStream, preloadShape } from "@electric-sql/react"
import type {
  ClientLoaderFunctionArgs,
  ClientActionFunctionArgs,
} from "@remix-run/react"
import { contactsShape, favoriteContactsShape } from "../shapes-defs"
import { matchStream } from "../utils/match-stream"

export const clientLoader = async ({
  request,
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  return await preloadShape(contactsShape())
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const body = await request.formData()

  if (body.get(`intent`) === `delete`) {
    const contactsShapeStream = getShapeStream(contactsShape())
    // Match the delete
    const findUpdatePromise = matchStream({
      stream: contactsShapeStream,
      operations: [`delete`],
      matchFn: ({ message }) => message.value.id === body.get(`id`),
    })

    let fetchPromise
    if (confirm(`Please confirm you want to delete this record.`)) {
      fetchPromise = fetch(`/api/contacts/${body.get(`id`)}`, {
        method: `DELETE`,
        body,
      })
    }

    await Promise.all([findUpdatePromise, fetchPromise])
    return redirect(`/`)
  } else {
    const favoriteContactsShapeStream = getShapeStream(favoriteContactsShape())
    // Match to update stream.
    const findUpdatePromise = matchStream({
      stream: favoriteContactsShapeStream,
      operations: [`insert`, `delete`],
      matchFn: ({ operationType, message }) => {
        if (operationType === `insert`) {
          return message.value.contact_id === body.get(`contact_id`)
        } else if (operationType === `delete`) {
          return message.value.id === body.get(`favorite_id`)
        } else {
          return false
        }
      },
    })

    const fetchPromise = fetch(`/api/favorites`, {
      method: `POST`,
      body,
    }).then((res) => {
      if (!res.ok) {
        throw new Response(`Response status: ${res.status}`, {
          status: res.status,
        })
      }

      return res
    })

    await Promise.all([findUpdatePromise, fetchPromise])

    return fetchPromise
  }
}

export default function Contact() {
  const params = useParams()
  const navigate = useNavigate()
  const { data: contact, isUpToDate: isContactsReady } = useShape(
    contactsShape((res) => {
      const copy = { ...res }
      copy.data = copy.data.find((c) => {
        return c.id === params.id
      })

      return copy
    })
  )
  const { data: favorite, isUpToDate: isFavoritesReady } = useShape(
    favoriteContactsShape((res) => {
      const copy = { ...res }
      copy.data = copy.data.find(
        (favorite) => favorite.contact_id === params.id
      )
      return copy
    })
  )

  if (!contact) {
    return 404
  }

  if (!isFavoritesReady || !isContactsReady) {
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
          <Favorite favorite={favorite} contact_id={contact.id} />
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
              navigate(`/contacts/${contact.id}/edit`)
            }}
          >
            <button type="submit">Edit</button>
          </form>
          <Form method="DELETE">
            <input type="hidden" name="id" value={contact.id} />
            <button name="intent" value="delete" type="submit">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite({
  favorite,
  contact_id,
}: {
  favorite: Record<string, any> | null
  contact_id: string
}) {
  const fetcher = useFetcher({ key: `favorite-star` })
  const isFavorited = fetcher.formData
    ? fetcher.formData.get(`favorite`) === `true`
    : !!favorite

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="favorite_id" value={favorite?.id} />
      <input type="hidden" name="contact_id" value={contact_id} />
      <button
        name="favorite"
        value={isFavorited ? `false` : `true`}
        aria-label={isFavorited ? `Remove from favorites` : `Add to favorites`}
      >
        {isFavorited ? `★` : `☆`}
      </button>
    </fetcher.Form>
  )
}
