import { ElectricDatabase, electrify } from "electric-sql/wa-sqlite"
import { uniqueTabId } from "electric-sql/util"
import { authToken } from "./auth"
import sqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm?asset"
import { Electric, schema } from "./generated/client"

declare const ELECTRIC_URL: string
const electricUrl =
  typeof ELECTRIC_URL === `undefined`
    ? `ws://localhost:5133`
    : `wss://${ELECTRIC_URL}`

async function syncTables(electric) {
  try {
    const [contactsShape, favoritesShape] = await Promise.all([
      electric.db.contacts.sync(),
      electric.db.favorite_contacts.sync({
        include: {
          contacts: true,
        },
      }),
    ])
    await Promise.all([contactsShape.synced, favoritesShape.synced])

    console.timeEnd(`sync`)
  } catch (error) {
    console.log(`initial electric sync failed`, error)
  }
}

export default async function initElectric() {
  const token = authToken()
  const config = {
    auth: {
      token: token,
    },
    debug: false, //DEBUG_MODE,
    url: electricUrl,
  }

  console.time(`sync`)
  const { tabId } = uniqueTabId()
  const tabScopedDbName = `electric-${tabId}.db`

  const conn = await ElectricDatabase.init(tabScopedDbName, sqliteWasm)
  const electric = await electrify(conn, schema, config)
  let isTable = false
  // Try querying to see if the table we want exists already. If it does,
  // we don't need to wait for syncing to do the initial render.
  try {
    await electric.db.contacts.findMany()
    isTable = true
  } catch (e) {
    // Nothing to do
  }

  if (isTable) {
    // Start syncing but don't block rendering the app on it.
    Promise.resolve().then(() => syncTables(electric))
  } else {
    await syncTables(electric)
  }

  return electric
}
