fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'st_bootstrap'
author 'Strata Framework'
description 'Strata loading screen — minimal, on-brand boot UI for FiveM.'
version '1.0.0'
repository 'https://github.com/StrataFW/st_bootstrap'

loadscreen 'web/dist/index.html'
loadscreen_manual_shutdown 'yes'

shared_scripts {
    'shared/types.lua',
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    '@st_log/lib/init.lua',
    'server/db.lua',
    'server/main.lua',
}

files {
    'web/dist/**/*',
}
