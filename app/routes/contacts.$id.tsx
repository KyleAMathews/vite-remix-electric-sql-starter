import { useParams, useFetcher } from "@remix-run/react"
import { useShape, preloadShape } from "@electric-sql/react"
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
  console.log({ id: params.id })
  const { data: contact, isUpToDate: isContactsReady } = useShape(
    contactsShape((res) => {
      console.log(res.data)
      const copy = { ...res }
      copy.data = copy.data.find((c) => {
        return c.id === params.id
      })

      return copy
    })
  )
  const { data: isFavorited, isUpToDate: isFavoritesRady } = useShape(
    favoriteContactsShape((res) => {
      const copy = { ...res }
      copy.data = copy.data.some(
        (favorite) => favorite.contact_id === params.id
      )
      return copy
    })
  )

  console.log({ isFavorited })

  if (!contact) {
    return 404
  }

  if (!isFavoritesRady || !isContactsReady) {
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
          <Favorite isFavorited={isFavorited} id={contact.id} />
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

export const clientAction = async ({
  request,
  params,
  serverAction,
}: ClientActionFunctionArgs) => {
  const body = await request.formData()
  console.log({ body: formDataToObject(body) })
  console.log(`start form submit`, performance.now())
  const fetchPromise = fetch(`/favorite`, {
    method: `POST`,
    body,
  })
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
  // await Promise.all([updatePromise, fetchPromise])

  return fetchPromise
}

function Favorite({ isFavorited, id }: { isFavorited: boolean; id: string }) {
  const fetcher = useFetcher()
  const favorite = fetcher.formData
    ? fetcher.formData.get(`favorite`) === `true`
    : isFavorited
  console.log({
    fetcher,
    formData: fetcher?.formData?.get(`favorite`),
    favorite,
  })
  console.log(`fetcher state`, fetcher.state, performance.now())
  console.log(
    `shape & form in sync`,
    {
      form: fetcher?.formData?.get(`favorite`),
      isFavorited,
    },
    performance.now()
  )

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="contact_id" value={id} />
      <button
        name="favorite"
        value={favorite ? `false` : `true`}
        aria-label={favorite ? `Remove from favorites` : `Add to favorites`}
      >
        {favorite ? `★` : `☆`}
      </button>
    </fetcher.Form>
  )
}
