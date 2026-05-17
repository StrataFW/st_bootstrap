import { Box } from '@mantine/core'
import { memo } from 'react'
import { ENABLE_LOGO, LOGO_FILE } from '../config'

export const Logo = memo(function Logo() {
  if (!ENABLE_LOGO) return null
  return (
    <Box sx={{ position: 'relative', height: 96, width: 96 }}>
      <Box
        aria-hidden
        sx={(theme) => ({
          position: 'absolute',
          inset: -20,
          zIndex: -10,
          background: `radial-gradient(50% 50% at 50% 50%, ${theme.fn.rgba(theme.colors.blue[5], 0.45)}, ${theme.fn.rgba(theme.colors.blue[6], 0.10)} 45%, transparent 75%)`,
          filter: 'blur(22px)',
        })}
      />
      <Box
        sx={(theme) => ({
          height: '100%',
          width: '100%',
          backgroundImage: `url(${LOGO_FILE})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          filter: `drop-shadow(0 0 24px ${theme.fn.rgba(theme.colors.blue[6], 0.35)})`,
        })}
      />
    </Box>
  )
})
