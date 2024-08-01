import { useParams, useFetcher } from "@remix-run/react"
import { useShape, getShapeStream, preloadShape } from "@electric-sql/react"
import type {
  ClientLoaderFunctionArgs,
  ClientActionFunctionArgs,
} from "@remix-run/react"
import type { ActionFunctionArgs } from "@remix-run/node"
import { contactsShape, favoriteContactsShape } from "../shapes-defs"
import { ShapeStream, ChangeMessage } from "@electric-sql/next"

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

async function matchStream({
  stream,
  operations,
  matchFn,
  timeout = 5000,
}: {
  stream: ShapeStream
  operations: Array<`insert` | `update` | `delete`>
  matchFn: (operationType: string, message: ChangeMessage<any>) => boolean
  timeout?: number
}): Promise<ChangeMessage<any>> {
  console.log(`matchStream`, { operations })
  return new Promise((resolve, reject) => {
    const unsubscribe = stream.subscribe((messages) => {
      console.log(`matchStream`, { messages })
      messages.forEach((message) => {
        if (
          `key` in message &&
          operations.includes(message.headers.action as OperationTypes)
        ) {
          if (matchFn(message.headers.action, message)) {
            finish(message)
          }
        }
      })
    })

    const timeoutId = setTimeout(() => {
      console.error(`matchStream timed out after ${timeout}ms`)
      reject(`matchStream timed out after ${timeout}ms`)
    }, timeout)

    function finish(message: ChangeMessage<any>) {
      console.log(`finish`, message)
      clearTimeout(timeoutId)
      unsubscribe()
      return resolve(message)
    }
  })
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const favoriteContactsShapeStream = getShapeStream(favoriteContactsShape())

  console.log(`start form submit`, performance.now())
  const body = await request.formData()

  // Match to update stream.
  const findUpdatePromise = matchStream({
    stream: favoriteContactsShapeStream,
    operations: [`insert`, `delete`],
    matchFn: (operationType, message) => {
      if (operationType === `insert`) {
        return message.value.contact_id === body.get(`contact_id`)
      } else if (operationType === `delete`) {
        return message.value.id === body.get(`favorite_id`)
      } else {
        return false
      }
    },
  })

  const fetchPromise = fetch(`/favorite`, {
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
