import { useElectric } from "../context"
import { useLiveQuery } from "electric-sql/react"
import { genUUID } from "electric-sql/util"
import { Electric, schema } from "../generated/client"
import { dummyUserId } from "../auth"

export function useContacts(q?: string) {
  const { db } = useElectric()!

  let contacts = []
  if (q) {
    const queryStr = `%${q}%`
    const { results: contactsResults } = useLiveQuery(
      db.liveRaw({
        sql: `SELECT *
        FROM contacts
        WHERE first_name LIKE ?
        OR last_name LIKE ?
        ORDER BY last_name asc;`,
        args: [queryStr, queryStr],
      })
    )
    contacts = contactsResults || []
  } else {
    const { results: contactsResults } = useLiveQuery(
      db.liveRaw({
        sql: `SELECT 
    contacts.*,
    CASE WHEN favorite_contacts.contact_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_favorited
FROM 
    contacts
LEFT JOIN 
    favorite_contacts ON contacts.id = favorite_contacts.contact_id
    AND favorite_contacts.user_id = ? 
    ORDER BY contacts.last_name asc;
      `,
        args: [dummyUserId],
      })
    )
    contacts = contactsResults || []
  }

  return contacts
}

export function useContact(id: string) {
  const { db } = useElectric()!

  const { results: contactResult } = useLiveQuery(
    db.liveRaw({
      sql: `SELECT 
    contacts.*,
    CASE WHEN favorite_contacts.contact_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_favorited
FROM 
    contacts
LEFT JOIN 
    favorite_contacts ON contacts.id = favorite_contacts.contact_id
    AND favorite_contacts.user_id = ?
WHERE contacts.id = ?

      `,
      args: [dummyUserId, id],
    })
  )

  const contact = contactResult?.slice(0, 1)[0] || {}

  return contact
}

export async function createContact(db) {
  return db.contacts.create({
    data: {
      id: genUUID(),
      first_name: ``,
      last_name: ``,
      website: ``,
      avatar: ``,
      notes: ``,
    },
  })
}

export function updateContact({ db, id, updates }) {
  const result = db.contacts.update({
    data: {
      ...updates,
    },
    where: {
      id,
    },
  })
  return result
}

export async function deleteContact({ db, id }) {
  await db.favorite_contacts.deleteMany({
    where: {
      contact_id: id,
    },
  })
  const result = await db.contacts.delete({
    where: {
      id,
    },
  })
  return result
}

export function favoriteContact({ db, id }) {
  return db.favorite_contacts.create({
    data: {
      id: genUUID(),
      user_id: dummyUserId,
      contact_id: id,
    },
  })
}

export function unfavoriteContact({ db, id }) {
  return db.favorite_contacts.deleteMany({
    where: {
      user_id: dummyUserId,
      contact_id: id,
    },
  })
}
