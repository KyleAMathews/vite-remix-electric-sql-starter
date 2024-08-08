import {
  useParams,
  useLocation,
  useNavigate,
  Form,
  redirect,
} from "@remix-run/react"
import { useShape, preloadShape, getShapeStream } from "@electric-sql/react"
import { contactsShape } from "../shapes-defs"
import type {
  ClientLoaderFunctionArgs,
  ClientActionFunctionArgs,
} from "@remix-run/react"
import { matchStream } from "../utils/match-stream"

export const clientLoader = async ({}: ClientLoaderFunctionArgs) => {
  return await preloadShape(contactsShape())
}

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const contactsShapeStream = getShapeStream(contactsShape())

  const formData = await request.formData()

  // Match to update stream.
  const findUpdatePromise = matchStream({
    stream: contactsShapeStream,
    operations: [`update`],
    matchFn: ({ message }) => message.value.id === formData.get(`id`),
  })

  const fetchPromise = fetch(`/api/contacts`, {
    method: `PUT`,
    body: formData,
  }).then((res) => {
    if (!res.ok) {
      throw new Response(`Response status: ${res.status}`, {
        status: res.status,
      })
    }

    return res
  })

  await Promise.all([findUpdatePromise, fetchPromise])

  return redirect(`/contacts/${formData.get(`id`)}`)
}

export default function EditContact() {
  const { id } = useParams()
  const { data: contact } = useShape(
    contactsShape((res) => {
      const copy = { ...res }
      copy.data = copy.data.find((c) => {
        return c.id === id
      })

      return copy
    })
  )

  const navigate = useNavigate()

  return (
    <Form method="post" id="contact-form">
      <input type="hidden" name="id" value={id} />
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
    </Form>
  )
}
