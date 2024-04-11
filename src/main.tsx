import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import { ElectricalProvider } from "./context"
import { initElectric, electricSqlLoader } from "electric-query"
import { Electric, schema } from "./generated/client"
import sqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm?asset"
import { authToken, dummyUserId } from "./auth"

import Index from "./routes/index"

// Start example routes
import Root from "./routes/root"
import Contact from "./routes/contact"
import EditContact from "./routes/edit"
// End example routes

const shapes = ({ db }) => [
  {
    shape: db.contacts.sync(),
    isReady: async () =>
      !!(await db.raw({ sql: `select id from contacts limit 1` })),
  },
  {
    shape: db.favorite_contacts.sync({
      include: {
        contacts: true,
      },
    }),
    isReady: async () =>
      !!(await db.raw({ sql: `select id from favorite_contacts limit 1` })),
  },
]
const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: `contacts/:contactId`,
        element: <Contact />,
        loader: async (props) => {
          const url = new URL(props.request.url)
          const key = url.pathname + url.search
          if (props.params.contactId) {
            await electricSqlLoader<Electric>({
              key,
              shapes,
              queries: ({ db }) =>
                Contact.queries({
                  db,
                  id: props.params.contactId,
                  dummyUserId,
                }),
            })
          }

          return null
        },
      },
      {
        path: `contacts/:contactId/edit`,
        element: <EditContact />,
        loader: async (props) => {
          const url = new URL(props.request.url)
          const key = url.pathname + url.search
          if (props.params.contactId) {
            await electricSqlLoader<Electric>({
              key,
              shapes,
              queries: ({ db }) =>
                EditContact.queries({
                  db,
                  id: props.params.contactId,
                  dummyUserId,
                }),
            })
          }

          return null
        },
      },
    ],
  },
])

async function render() {
  const electric = await initElectric({
    appName: `my-app`,
    schema,
    sqliteWasmPath: sqliteWasm,
    token: authToken(),
    config: {
      debug: false, //DEBUG_MODE,
      url: import.meta.env.VITE_ELECTRIC_URL,
    },
  })
  ReactDOM.createRoot(document.getElementById(`root`)!).render(
    <React.StrictMode>
      <ElectricalProvider db={electric}>
        <RouterProvider router={router} />
      </ElectricalProvider>
    </React.StrictMode>
  )
}

render()
