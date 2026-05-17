import { Box, createStyles } from '@mantine/core'
import { memo } from 'react'

const useStyles = createStyles((theme) => ({
  root: { position: 'absolute', inset: 0, zIndex: -10 },
  glow: {
    position: 'absolute',
    inset: 0,
    background:
      `radial-gradient(60% 50% at 50% 40%, ${theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.10)}, transparent 65%), ${theme.colors.dark[8]}`,
  },
  grid: {
    position: 'absolute',
    inset: 0,
    opacity: 0.03,
    backgroundImage:
      `linear-gradient(to right, ${theme.colors.dark[3]} 1px, transparent 1px),` +
      `linear-gradient(to bottom, ${theme.colors.dark[3]} 1px, transparent 1px)`,
    backgroundSize: '64px 64px',
  },
}))

export const Background = memo(function Background() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root} aria-hidden>
      <Box className={classes.glow} />
      <Box className={classes.grid} />
    </Box>
  )
})
