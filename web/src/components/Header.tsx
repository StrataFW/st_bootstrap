import { Box, Divider, Group, Indicator, Text, createStyles } from '@mantine/core'
import { memo } from 'react'
import { SERVER_NAME, TAGLINE, VERSION } from '../config'
import { useClock } from '../hooks'

const useStyles = createStyles((theme) => ({
  bar: {
    position: 'fixed',
    left: 0, right: 0, top: 0,
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'clamp(48px, 3.5vw, 64px)',
    padding: '0 clamp(28px, 3vw, 56px)',
    borderBottom: `1px solid ${theme.colors.dark[5]}`,
    backgroundColor: theme.colors.dark[7],
  },
  caps: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: 'clamp(10px, 0.55vw, 12px)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  brandName: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(0.85rem, 0.95vw, 1rem)',
    letterSpacing: '0.18em',
    color: theme.white,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: theme.colors[theme.primaryColor][6],
  },
}))

export const Header = memo(function Header() {
  const { classes } = useStyles()
  const time = useClock()
  return (
    <Box component="header" className={classes.bar}>
      <Group spacing="md" align="center">
        <Box aria-hidden className={classes.dot} />
        <Text className={classes.brandName}>{SERVER_NAME}</Text>
        <Divider orientation="vertical" size="xs" color="dark.5" />
        <Text className={classes.caps} color="dark.3">{TAGLINE.toLowerCase()}</Text>
      </Group>

      <Group spacing="md" align="center">
        <Indicator processing color="blue" size={6} offset={0} position="middle-start" inline>
          <Text className={classes.caps} color="blue.4" sx={{ paddingLeft: 12 }}>live</Text>
        </Indicator>
        <Divider orientation="vertical" size="xs" color="dark.5" />
        <Text className={classes.caps} color="dark.0" sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {time}
        </Text>
        <Divider orientation="vertical" size="xs" color="dark.5" />
        <Text className={classes.caps} color="dark.3">{VERSION}</Text>
      </Group>
    </Box>
  )
})
