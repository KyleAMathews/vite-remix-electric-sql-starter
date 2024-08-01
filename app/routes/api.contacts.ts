import nodePkg from "@remix-run/node"
const { Request, json, LoaderArgs, installGlobals } = nodePkg
import type { ActionFunctionArgs } from "@remix-run/node"
import { db } from "../utils/db"

export async function action({ params, request }: ActionFunctionArgs) {
  console.log({ params })
  if (request.method === `POST`) {
    const result = await db.query(
      `INSERT INTO contacts (id, first_name, last_name, website, avatar, notes)
         VALUES (gen_random_uuid(), '', '', '', '', '') RETURNING id;`
    )
    console.log(`result`, result)
    return json({ id: result.rows[0].id })
  }
  if (request.method === `PUT`) {
    const formData = await request.formData()
    console.log({ formData })
    const updatedData = Object.fromEntries(formData)
    const values = [
      updatedData.first_name,
      updatedData.last_name,
      updatedData.website,
      updatedData.avatar,
      updatedData.notes,
      updatedData.id,
    ]
    await db.query(
      `UPDATE contacts
        SET
         first_name = $1,
         last_name = $2,
         website = $3,
         avatar = $4,
         notes = $5
       WHERE id = $6;`,
      values
    )

    return `ok`
  }
}
