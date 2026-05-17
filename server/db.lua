---@class st_bootstrap.DB
DB = {}

---@return string|nil
function DB.serverVersion()
    return MySQL.scalar.await('SELECT VERSION()')
end

---@return integer|nil
function DB.userCount()
    return MySQL.scalar.await('SELECT COUNT(*) FROM users')
end

---@return integer|nil
function DB.liveCharacterCount()
    return MySQL.scalar.await('SELECT COUNT(*) FROM characters WHERE deleted IS NULL')
end
