import { initTRPC, TRPCError } from "@trpc/server"
import { z } from "zod"
import Database from "better-sqlite3"
const { electrify } = require(`electric-sql/node`)
const { authToken } = require(`../auth`)
const { schema } = require(`../generated/client`)
import { adapter } from "trpc-electric-sql/adapter"

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  ping: publicProcedure.mutation(async () => {
    console.log(`got pinged.`)
    return `pong`
  }),
})

export type AppRouter = typeof appRouter

async function setupTRPC() {
  const config = {
    auth: {
      token: authToken(),
    },
    // debug: true,
    // url: ELECTRIC_URL,
  }

  // Create the better-sqlite3 database connection.
  const conn = new Database(`local-data.db`)
  conn.pragma(`journal_mode = WAL`)

  // Instantiate your electric client.
  console.time(`initial sync from electric-sql.`)
  const electric = await electrify(conn, schema, config)
  const { db } = electric
  const [shape] = await Promise.all([db.trpc_calls.sync()])
  await Promise.all([shape.synced])
  console.timeEnd(`initial sync from electric-sql.`)

  adapter({
    context: { electric, instanceName: `server` },
    appRouter,
  })

  console.log(`trpc server is now listening`)
}

setupTRPC()
