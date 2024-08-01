# vite-remix-electric-sql-starter

A starter for building [local-first apps](https://bricolage.io/some-notes-on-local-first-development/) with [ElectricSQL](https://electric-sql.com/)

Built with:
- [Vite](https://vitejs.dev/)
- [Remix]([https://reactrouter.com/en/main](https://remix.run/))
- [ElectricSQL](https://github.com/electric-sql/electric-next)

### Demo
https://github.com/KyleAMathews/vite-react-router-electric-sql-starter/assets/71047/f91196c1-a04c-4e36-8477-e9d1ae977d8c

## Install
- `npx git-scaffold@latest KyleAMathews/vite-react-router-electric-sql-starter#main new-electric-app`

## Usage

The starter includes some sample tables & code. You can either leave it to play with a simple example app or remove it to start from scratch.

To clean up the example code, run `npm run cleanup-example-code` and then make the following edits:
- `src/main.tsx` to remove the example route components

You're now ready to start adding tables and routes.

### Setup instructions
You need Docker/Docker Compose installed.

Run Postgres/ElectricSQL:

`npm run backend:start`

Start the dev server

`npm run dev`

Contributions welome!
