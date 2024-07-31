import { useParams, useFetcher } from "@remix-run/react"
import { useShape, getShapeStream, preloadShape } from "@electric-sql/react"
import type {
  ClientLoaderFunctionArgs,
  ClientActionFunctionArgs,
} from "@remix-run/react"
import type { ActionFunctionArgs } from "@remix-run/node"
import { contactsShape, favoriteContactsShape } from "../shapes-defs"

export const clientLoader = async ({
  request,
  params,
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  return await preloadShape(contactsShape())
}

export default function Contact() {
  const params = useParams()
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

  console.log({ favorite })

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
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              if (confirm(`Please confirm you want to delete this record.`)) {
                await deleteContact(contact.id)
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

function formDataToObject(formData) {
  const object = {}
  formData.forEach((value, key) => {
    if (!object[key]) {
      object[key] = []
    }
    object[key].push(value)
  })
  return object
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  async function findUpdate({ id, contact_id }) {
    console.log(`finding the update`)
    const favoriteContactsShapeStream = getShapeStream(favoriteContactsShape())
    return new Promise((resolve) => {
      const unsubscribe = favoriteContactsShapeStream.subscribe((messages) => {
        console.log({ messages })
        if (
          messages.some((message) => {
            if (
              message.headers.action &&
              message.key?.includes(`favorite_contacts`)
            ) {
              console.log({ message })
              return (
                message.value?.id === id ||
                message.value?.contact_id === contact_id
              )
            } else {
              return false
            }
          })
        ) {
          unsubscribe()
          resolve(null)
        }
      })
    })
  }

  console.log(`start form submit`, performance.now())
  const body = await request.formData()
  const findUpdatePromise = findUpdate({
    id: body.get(`favorite_id`),
    contact_id: body.get(`contact_id`),
  })
  console.time(`post form`)
  const fetchPromise = fetch(`/favorite`, {
    method: `POST`,
    body,
  }).then((res) => {
    console.timeEnd(`post form`)
    return res
  })

  // TODO
  // - implement
  // - how to handle errors? Abort listening?
  // - perhaps a default timeout that throws error?
  // - and/or function returns promise + unsubscribe function?
  // let updatePromise
  // if (body.get(`favorite`) === `true`) {
  // updatePromise = stream.awaitInsert(
  // (message) => message.value.contact_id === body.get(`id`)
  // )
  // } else {
  // updatePromise = stream.awaitDelete(
  // (message) => message.value.contact_id === body.get(`id`)
  // )
  // }
  await Promise.all([findUpdatePromise, fetchPromise])

  console.log(`leaving`)
  return fetchPromise
}

function Favorite({
  favorite,
  contact_id,
}: {
  favorite: Record<string, any> | null
  contact_id: string
}) {
  const fetcher = useFetcher()
  const isFavorited = fetcher.formData
    ? fetcher.formData.get(`favorite`) === `true`
    : !!favorite
  console.log(`fetcher state`, fetcher.state, performance.now())
  console.log(
    `shape & form in sync`,
    {
      form: fetcher?.formData?.get(`favorite`),
      isFavorited,
      favorite,
    },
    performance.now()
  )

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
