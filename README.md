# Expense-Split

A Next.js project for splitting expenses.

## Quick start

From the project root:

```bash
# install dependencies (recommended: pnpm)
pnpm install

# start dev server and open browser (script added)
pnpm run dev:open

# or start dev server without auto-open
pnpm run dev
```

If you don't use `pnpm`:

```bash
npm install
npm run dev:open
```

## Useful notes

- Don't commit `node_modules/` or `.next/`; they are ignored by `.gitignore`.
- I added a convenient `dev:open` script in `package.json` that starts the dev server, waits for `http://localhost:3000`, and opens it in the browser.
- I also added a shell alias on your machine (in `~/.zshrc`) named `myproject` that runs the above script from anywhere:

```bash
alias myproject='cd /Users/sanskar/Desktop/project/Myproject && pnpm run dev:open &'
```

Run `myproject` in a terminal to start the app and open the page.

## Troubleshooting

- If port `3000` is busy, start on another port:

```bash
PORT=3001 pnpm run dev:open
```

- If push to GitHub fails due to large files, ensure `node_modules` and build outputs are not committed. Use Git LFS for large assets if needed.

## License

Your project files.
