# Nuxt Commands Guide (White Decor Web)

Commands for running, building, and type-checking the Nuxt 4 web application.

---

## 1. Run Nuxt Locally (Development Server)

Start the local development server with hot-module replacement (HMR):

```bash
npm run dev
```

*Alternative with Nuxt CLI directly:*
```bash
npx nuxt dev
```

### Options:
- **Specify port (e.g. port 3000):**
  ```bash
  npm run dev -- --port 3000
  ```
- **Open browser automatically:**
  ```bash
  npm run dev -- --open
  ```
- **Expose to local network (LAN):**
  ```bash
  npm run dev -- --host 0.0.0.0
  ```

---

## 2. Check TypeScript Errors (Typecheck)

Run the full TypeScript and Vue SFC compiler check without building:

```bash
npm run typecheck
```

*Alternative with Nuxt CLI directly:*
```bash
npx nuxt typecheck
```

*Alternative using vue-tsc directly:*
```bash
npx vue-tsc -b
```

---

## 3. Build Nuxt for Production

### Full Production Build & Distribution Sync:
Builds the Nuxt application and synchronizes output to `../whitedecor-build/`:

```bash
npm run build
```

### Nuxt Build Only (without running sync script):
```bash
npm run build:nuxt
```
*(or `npx nuxt build`)*

### Preview Production Build Locally:
Test the compiled production bundle on your local machine before deploying:

```bash
npm run preview
```
*(or `npx nuxt preview`)*

---

## 4. Summary Cheat Sheet

| Task | Command |
| :--- | :--- |
| **Run locally (Dev)** | `npm run dev` |
| **Check Type Errors** | `npm run typecheck` |
| **Full Build + Sync** | `npm run build` |
| **Nuxt Build Only** | `npm run build:nuxt` |
| **Preview Build** | `npm run preview` |
| **Regenerate .nuxt types** | `npx nuxt prepare` |

