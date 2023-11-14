# vite-react-router-electric-sql-starter

A starter for building [local-first apps](https://bricolage.io/some-notes-on-local-first-development/) with [ElectricSQL](https://electric-sql.com/)

Built with:
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/en/main)
- [trpc-electric-sql](https://github.com/KyleAMathews/trpc-crdt).

### Demo
https://github.com/KyleAMathews/vite-react-router-electric-sql-starter/assets/71047/f91196c1-a04c-4e36-8477-e9d1ae977d8c

## Install
- `npx degit KyleAMathews/vite-react-router-electric-sql-starter#main new-app`
- `cd new-app`
- `npm install`

## Usage

The starter includes some sample tables & code. You can either leave it to play with a simple example app or remove it to start from scratch.

To clean up the example code, run `npm run cleanup-example-code` and then edit `src/main.tsx` to remove the example route components. You're now ready to start adding tables and routes.

### Setup instructions
You need Docker/Docker Compose installed.

To run Postgres/ElectricSQL:

`npm run backend:start`

Then run migrations to create your tables:

`npm run db:migrate`

Then create the client for running queries in the browser:

`npm run client:generate`

Finally start the dev server (it starts concurrently both vite for serving to the browser as well as the backend tRPC server).

`npm run dev`

### TODOs
- [ ] Add production build script
- [ ] Add auth of some sort
