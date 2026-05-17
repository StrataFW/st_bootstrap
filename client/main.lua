local hasShutdown = false
local manualShutdown <const> = GetConvarInt('st_bootstrap:manualShutdown', 0) == 1

local function shutdown()
    if hasShutdown then return end
    hasShutdown = true
    local ok, err = pcall(ShutdownLoadingScreenNui, true)
    if not ok then print(('[st_bootstrap] shutdown failed: %s'):format(err)) end
end

if not manualShutdown then
    AddEventHandler('playerSpawned', shutdown)
    RegisterNetEvent('ox:startCharacterSelect', shutdown)
end

exports('shutdown', shutdown)

CreateThread(function()
    while not hasShutdown do
        BusyspinnerOff()
        Wait(0)
    end
end)
