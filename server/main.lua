local STRATA_VERSION <const> = '1.0.0'
local START_TIME     <const> = GetGameTimer()
local BANNER_DELAY_MS <const> = 3500
local PAD            <const> = '   '
local LABEL_WIDTH    <const> = 14
local RULE_LEN       <const> = 64

-- ─── ansi palette ────────────────────────────────────────────────────────

local function rgb(r, g, b) return ('\27[38;2;%d;%d;%dm'):format(r, g, b) end
local RESET, BOLD, DIM = '\27[0m', '\27[1m', '\27[2m'

local GRAD <const> = {
    rgb( 28, 126, 214),
    rgb( 34, 139, 230),
    rgb( 51, 154, 240),
    rgb( 77, 171, 247),
    rgb(116, 192, 252),
}

local INK    <const> = rgb(232, 232, 232)
local MUTED  <const> = rgb(140, 140, 140)
local ACCENT <const> = rgb( 34, 139, 230)
local OK     <const> = rgb( 95, 215, 135)
local WARN   <const> = rgb(245, 200,  90)

local LOGO <const> = {
    '████████ ████████ ████████   ████████  ████████ ████████',
    '██          ██    ██     ██  ██    ██     ██    ██     ██',
    '████████    ██    ████████   ████████     ██    ████████ ',
    '      ██    ██    ██   ██    ██    ██     ██    ██    ██ ',
    '████████    ██    ██    ██   ██    ██     ██    ██    ██ ',
}

-- ─── printing helpers ────────────────────────────────────────────────────

---@param s string?
local function line(s) print(PAD .. (s or '')) end

---@param color string?
local function rule(color)
    line((color or DIM) .. ('─'):rep(RULE_LEN) .. RESET)
end

---@param label string
---@param value string
---@param valColor string?
local function row(label, value, valColor)
    local pad = (' '):rep(math.max(0, LABEL_WIDTH - #label))
    line(MUTED .. label .. pad .. RESET .. (valColor or INK) .. value .. RESET)
end

-- ─── data helpers ────────────────────────────────────────────────────────

---@param name string
---@param default string
---@return string
local function cv(name, default)
    local v = GetConvar(name, '')
    if v == nil or v == '' then return default end
    return v
end

---@return string
local function dbName()
    local s = cv('mysql_connection_string', '')
    if s == '' then return 'unknown' end
    return s:match('/([^/?]+)%?') or s:match('/([^/?]+)$') or s:match('database=([^;]+)') or 'unknown'
end

---@return integer
local function resourceCount()
    local n, i = 0, 0
    while true do
        local r = GetResourceByFindIndex(i)
        if not r then break end
        if GetResourceState(r) == 'started' then n = n + 1 end
        i = i + 1
    end
    return n
end

---@param name string
---@return string
local function resourceVersion(name)
    if GetResourceState(name) ~= 'started' then return '?' end
    return GetResourceMetadata(name, 'version', 0) or '?'
end

---@return st_bootstrap.DbStats
local function dbStats()
    local stats = { version = '?', users = '?', characters = '?' }
    local ok, err = pcall(function()
        stats.version    = DB.serverVersion()      or '?'
        stats.users      = DB.userCount()          or 0
        stats.characters = DB.liveCharacterCount() or 0
    end)
    if not ok then stats.error = err end
    return stats
end

---@param n integer|string
---@return string
local function commas(n)
    local s = tostring(n)
    return (s:reverse():gsub('(%d%d%d)', '%1,'):reverse():gsub('^,', ''))
end

-- ─── banner ──────────────────────────────────────────────────────────────

local function printLogo()
    print('')
    rule(rgb(60, 60, 60))
    print('')

    for i = 1, #LOGO do line(GRAD[i] .. LOGO[i] .. RESET) end
    print('')

    line(BOLD .. INK .. 'STRATA FRAMEWORK' .. RESET
        .. DIM .. '   ·   v' .. STRATA_VERSION
        .. '   ·   built on ox_core' .. RESET)
    print('')
end

local function printRows()
    local ready   = (GetGameTimer() - START_TIME) / 1000.0
    local port    = cv('endpoint_add_tcp', ''):match(':(%d+)') or '30120'
    local maxC    = cv('sv_maxclients', '?')
    local build   = cv('sv_enforceGameBuild', 'latest')
    local onesync = cv('onesync', 'off')
    local locale  = cv('ox:locale', 'en')
    local env     = cv('st:env', 'development')
    local oxVer   = resourceVersion('ox_core')
    local liveDb  = dbStats()
    local logFile = GetConvar('st:log:file', '1') == '1' and 'on' or 'off'
    local logDbg  = GetConvar('st:debug', '0') == '1' and 'on' or 'off'

    row('server',      'Strata ' .. STRATA_VERSION .. DIM .. '  ·  ox_core ' .. oxVer .. RESET)
    row('environment', env)
    row('endpoint',    '0.0.0.0:' .. port .. DIM .. '  ·  ' .. maxC .. ' slots' .. RESET)
    row('game build',  build .. DIM .. '  ·  onesync ' .. onesync .. RESET)
    row('locale',      locale)

    if liveDb.error then
        row('database', dbName() .. DIM .. '  ·  ' .. RESET .. WARN .. 'unreachable' .. RESET)
    else
        row('database',   dbName() .. DIM .. '  ·  ' .. liveDb.version .. RESET, OK)
        row('population', commas(liveDb.users) .. ' users' .. DIM .. '  ·  ' .. RESET .. commas(liveDb.characters) .. ' characters')
    end

    row('resources', tostring(resourceCount()) .. ' started', OK)
    row('logging',   'file ' .. logFile .. DIM .. '  ·  debug ' .. logDbg .. RESET)
    row('boot',      ('%.2fs'):format(ready), ACCENT)
    print('')
end

local function printFooter()
    rule(rgb(60, 60, 60))
    line(MUTED .. 'ready  ·  ' .. RESET
        .. ACCENT .. 'strata' .. RESET
        .. MUTED .. ' to reprint  ·  ' .. RESET
        .. ACCENT .. 'status' .. RESET
        .. MUTED .. ' to refresh' .. RESET)
    print('')
end

local function printBanner()
    printLogo()
    printRows()
    printFooter()
end

local function flushDeferredLogs()
    pcall(function() exports.st_log:flushDeferred() end)
end

-- ─── commands ────────────────────────────────────────────────────────────

RegisterCommand('comment', function() end, true)

RegisterCommand('strata', function(source)
    if source ~= 0 then return end
    printBanner()
end, true)

RegisterCommand('status', function(source)
    if source ~= 0 then return end

    print('')
    line(BOLD .. INK .. 'STRATA' .. RESET .. DIM .. '  ·  status' .. RESET)
    print('')

    local up = (GetGameTimer() - START_TIME) / 1000.0
    local upStr = up < 60   and ('%.1fs'):format(up)
        or up    < 3600 and ('%.1fm'):format(up / 60)
        or                  ('%.1fh'):format(up / 3600)

    row('uptime',    upStr, ACCENT)
    row('players',   tostring(GetNumPlayerIndices()) .. ' / ' .. cv('sv_maxclients', '?'))
    row('resources', tostring(resourceCount()) .. ' started', OK)

    local liveDb = dbStats()
    if not liveDb.error then
        row('population', commas(liveDb.users) .. ' users' .. DIM .. '  ·  ' .. RESET .. commas(liveDb.characters) .. ' characters')
    end
    print('')
end, true)

-- ─── boot ────────────────────────────────────────────────────────────────

CreateThread(function()
    Wait(BANNER_DELAY_MS)
    printBanner()
    flushDeferredLogs()
end)
