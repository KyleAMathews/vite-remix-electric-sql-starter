import nodePkg from "@remix-run/node"
const { Request, json, LoaderArgs, installGlobals } = nodePkg
import type { ActionFunctionArgs } from "@remix-run/node"
import { db } from "../utils/db"

export async function action({ params, request }: ActionFunctionArgs) {
  const body = await request.formData()
  const favorite = body.get(`favorite`)
  const contact_id = body.get(`contact_id`)
  console.log({ time: new Date().toJSON(), favorite, contact_id })
  const user_id = `32d1f1e5-7e5f-43f8-bff2-bb52dd48ab58`
  // Add favorite
  if (favorite === `true`) {
    return db.query(
      `INSERT INTO favorite_contacts (id, user_id, contact_id)
           VALUES (gen_random_uuid(), $1, $2);`,
      [user_id, contact_id]
    )
  } else {
    // Delete
    return db.query(
      `DELETE FROM favorite_contacts
           WHERE user_id = $1 AND contact_id = $2;`,
      [user_id, contact_id]
    )
  }
}
