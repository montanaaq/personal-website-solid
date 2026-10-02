# Montana's personal website

A portfolio built with SolidJS, TypeScript and Vite.

## Development

```bash
git clone https://github.com/montanaaq/personal-website-solid.git
cd personal-website-solid
bun install --frozen-lockfile
bun run dev
```

The development server is available at [http://localhost:5173](http://localhost:5173).

## Quality checks

```bash
bun run check
bun run build
```

Lefthook formats staged files and runs linting and TypeScript checks before a commit.

## Production

Netlify builds the site with `bun run build` and serves the generated `dist` directory.
