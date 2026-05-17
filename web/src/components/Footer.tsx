import { Box, Divider, Group, Kbd, Text, Transition, createStyles } from '@mantine/core'
import { memo, useEffect, useState } from 'react'
import { BUILD_INFO } from '../config'
import { useLoadscreenAudio, useSessionId } from '../hooks'

const TIPS = [
  'Press P to toggle the loadscreen music',
  'W and S adjust the music volume',
  'Type /strata in the server console to reprint the boot banner',
  'Type /status for live server stats',
  'Strata is built on ox_core — every resource follows the same conventions',
  'The Strata Discord rich presence broadcasts your character to your friends list',
] as const

const ROTATE_MS = 6000

const useStyles = createStyles((theme) => ({
  bar: {
    position: 'fixed',
    left: 0, right: 0, bottom: 0,
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'clamp(48px, 3.5vw, 64px)',
    padding: '0 clamp(28px, 3vw, 56px)',
    borderTop: `1px solid ${theme.colors.dark[5]}`,
    backgroundColor: theme.colors.dark[7],
  },
  caps: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    fontSize: 'clamp(10px, 0.55vw, 12px)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  centerCell: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(10px, 0.7vw, 16px)',
    maxWidth: '50vw',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  accentRule: {
    width: 24,
    height: 1,
    background: theme.colors[theme.primaryColor][6],
    opacity: 0.7,
  },
}))

export const Footer = memo(function Footer() {
  const { classes } = useStyles()
  const session = useSessionId()
  const { playing, volume } = useLoadscreenAudio()

  const [i, setI] = useState(0)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setMounted(false)
      setTimeout(() => {
        setI((p) => (p + 1) % TIPS.length)
        setMounted(true)
      }, 350)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <Box component="footer" className={classes.bar}>
      
      <Group spacing="md" align="center">
        <Text className={classes.caps} color="dark.3">Session</Text>
        <Text className={classes.caps} color="dark.0">{session}</Text>
        <Divider orientation="vertical" size="xs" color="dark.5" />
        <Text className={classes.caps} color="dark.3">Build</Text>
        <Text className={classes.caps} color="dark.0">{BUILD_INFO}</Text>
      </Group>

      
      <Box className={classes.centerCell}>
        <Text className={classes.caps} color="blue.4" weight={700}>tip</Text>
        <Box className={classes.accentRule} aria-hidden />
        <Transition mounted={mounted} transition="fade" duration={350} timingFunction="ease">
          {(styles) => (
            <Text className={classes.caps} style={styles} color="dark.1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {TIPS[i]}
            </Text>
          )}
        </Transition>
      </Box>

      
      <Group spacing="md" align="center">
        <Group spacing="xs" align="center">
          <Kbd>W</Kbd>
          <Text className={classes.caps} color="dark.3">vol +</Text>
          <Kbd>S</Kbd>
          <Text className={classes.caps} color="dark.3">vol −</Text>
          <Kbd>P</Kbd>
          <Text className={classes.caps} color="dark.3">play</Text>
        </Group>
        <Divider orientation="vertical" size="xs" color="dark.5" />
        <Text className={classes.caps} color={playing ? 'blue.4' : 'dark.3'}>
          {playing ? 'playing' : 'paused'}
        </Text>
        <Text className={classes.caps} color="dark.0" sx={{ fontVariantNumeric: 'tabular-nums', minWidth: 38 }}>
          {Math.round(volume * 100)}%
        </Text>
      </Group>
    </Box>
  )
})
