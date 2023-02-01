<p align="center">
  <img src="./public/img/logo.png" width="120" />
</p>

<p align="center">
  <a href="https://manga.glhf.vn/">Website</a> |
  <a href="mailto:konnichiwa@glhf.vn">Contact</a>
</p>

## Getting started

Clone the repository, then create an environment variable file consists two of these values: `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

Also, remember to install the packages first:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing

There're plenty of ways to start customizing, but first start with `src/data/`

```tree
src/data
├── api.types.ts
├── config.ts -- Start with this
├── database.types.ts
├── index.types.ts
├── licensed.types.ts
└── public.types.ts
```

## Side notes

Database schema can be found on types file, in `src/data/database.types.ts`

This project is built to be deployed on [Vercel](https://vercel.com/).
