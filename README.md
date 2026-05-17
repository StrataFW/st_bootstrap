# st_bootstrap

Strata Framework loading screen — minimal, on-brand boot UI for FiveM.
Mantine v5, dark + blue + Montserrat, with the same `clamp()`-driven
sizing as the rest of the framework's NUIs. Also prints an in-console
boot banner (and a `/status` snapshot) on the server side.

**What you get:**

- Branded Mantine loading screen with rotating background art, animated
  logo, region/version eyebrow, progress bar, and ambient music
- Boot-banner printed in the FXServer console at startup — Strata
  wordmark + DB / endpoint / resources / population / boot-time table
- `/strata` reprints the banner on demand; `/status` prints a live
  uptime + counts snapshot
- After the banner, automatically calls `exports.st_log:flushDeferred()`
  so st_log's queued boot lines print as the tail of the same block
- Manual shutdown convar (`st_bootstrap:manualShutdown 1`) for resources
  that want to control dismissal themselves

## Setup

1. Drop the resource into `resources/[strata]/st_bootstrap/`.
2. Build the UI (see below).
3. In `server.cfg`:
   ```
   ensure st_bootstrap
   ```
   Start it early — `fxmanifest.lua` declares the page as the
   `loadscreen` target, so FiveM picks it up from the moment the resource
   starts.

## Build the UI

```sh
cd web
bun install
bun run dev    # http://localhost:5500 — browser preview
bun run build  # → ./dist  (committed assets served by FiveM)
```

## Configuration

Brand text / version / region / tasks all live in `web/src/config.ts`.
Logo file: `web/public/logo/logo.png`. Music: `web/public/music/music.mp3`.
Rotate backgrounds by replacing `web/public/backgrounds/{1..4}.jpg`.

## Convars

| Convar                          | Default | Effect                                                       |
|---------------------------------|---------|--------------------------------------------------------------|
| `st_bootstrap:manualShutdown`   | `0`     | When `1`, the screen will not auto-dismiss on `playerSpawned` or `ox:startCharacterSelect` — callers must invoke the `shutdown` export themselves. |

## Console commands

All console-only (`source == 0`).

| Command   | Action                                                  |
|-----------|---------------------------------------------------------|
| `strata`  | reprint the boot banner                                 |
| `status`  | print a live uptime + players + resources + DB snapshot |
| `comment` | no-op — lets `# comment lines` in console scripts parse |

## Exports

| Export     | Use                                                                 |
|------------|---------------------------------------------------------------------|
| `shutdown` | client-side — dismiss the loading screen (idempotent, safe to call once auto-dismiss has fired). |

## Layout

```
st_bootstrap/
├── fxmanifest.lua
├── shared/
│   └── types.lua          ---@meta DbStats
├── client/
│   └── main.lua           shutdown export + BusyspinnerOff hold
├── server/
│   ├── db.lua             DB.* — server version, user/character counts
│   └── main.lua           banner + /strata + /status + flushDeferred handoff
└── web/                   Vite + React 18 + Mantine v5
    ├── src/               App, components, hooks, config, vendored nui-kit
    ├── dist/              built bundle (loadscreen target)
    ├── public/            backgrounds, logo, music
    ├── package.json
    └── vite.config.ts
```

## Dependencies

- `oxmysql` — direct scalar reads for the DB row in the banner
- `st_log` — `flushDeferred` export called after the banner prints so
  queued boot logs land as the tail of the banner block

## License

MIT — see [`LICENSE`](./LICENSE).
