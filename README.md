# Montana's personal website

A bilingual portfolio built with SolidJS, TypeScript and Vite.

## Requirements

- Node.js 24.14.0
- Bun 1.2.4

The expected versions are recorded in `.node-version`, `.bun-version` and `package.json`.

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
