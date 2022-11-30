<p align="center">
  <img src="./public/img/logo.png" width="200" />
</p>

<p align="center">
  <a href="https://manga.glhf.vn/">Website</a> |
  <a href="mailto:konnichiwa@glhf.vn">Contact</a>
</p>

## Getting started

**As current state, the project has been moved from using Google Calendar (and Sheets) to Supabase Database for future scalability**

Clone it first, then create an environment variable file contain two of these values: `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

Also, remember to install the packages first:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing

There're plenty of ways to start customizing, but first start with `src/data/`

```tree
data
├── bookTypes.json
├── publishers.json
├── database.types.ts
├── indexFilterStyles.ts
├── next-seo.ts
└── selectStyles.ts
```

## Side notes

Database schema can be found on types file, in `src/data/database.types.ts`

This project is built to be deployed on [Vercel](https://vercel.com/).
